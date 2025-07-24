'use client'
import React, { useEffect, useRef, useState, useCallback } from 'react'
import { Socket } from 'socket.io-client';
import { socketConfig } from '../socketConfig';
import { useAuthStore } from '../store/authStore';
// import {  Message } from '@/components/ChatsUI';


export type SocketResponse<T> = {
    status: 'OK' | 'ERROR';
    data?: T;
    error?: Error;
};
export interface Message {
    id?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    sender_id?: string | null;
    recipient_id?: string | null;
    message_text: string;
    status?: 'pending' | 'sent' | 'failed';
    tempId?: string; // For tracking pending messages
}

export interface UserChat {
    chatUser: string;
    userId: string;
}
export interface TNotification {
    type: "chats" | "application_status";
    id: number;
    user_id: string | null;
    created_at: Date | null;
    updated_at: Date | null;
    message: string;
    read: boolean;
}
export const useWebSocket = ({ senderId, recipientId, userId }: { senderId?: string, recipientId?: string, userId?: string }) => {
    const { user } = useAuthStore()
    const [messages, setMessages] = useState<Message[]>([])
    const [unreadNotifications, setUnreadNotifications] = useState<TNotification[]>([])
    const [userChats, setUserChats] = useState<UserChat[]>([])
    const socketRef = useRef<Socket | null>(null);

    const addMessage = useCallback((newMessage: Message) => {
        console.log('Adding new message:', newMessage);
        setMessages(prevMessages => {
            // If this is a server-confirmed message and matches a pending message by tempId, replace it
            if (newMessage.id && newMessage.tempId) {
                return prevMessages.map(msg =>
                    msg.tempId === newMessage.tempId
                        ? { ...newMessage, status: 'sent' as const }
                        : msg
                );
            }

            // If message with this id already exists, skip
            if (newMessage.id && prevMessages.some(msg => msg.id === newMessage.id)) {
                console.log('Message already exists with ID:', newMessage.id);
                return prevMessages;
            }

            // For messages without ID, check for duplicates by content and sender (within 5s window)
            const existingMessage = prevMessages.find(msg =>
                !msg.tempId &&
                msg.sender_id === newMessage.sender_id &&
                msg.message_text === newMessage.message_text &&
                msg.created_at && newMessage.created_at &&
                Math.abs(new Date(msg.created_at).getTime() - new Date(newMessage.created_at).getTime()) < 5000
            );
            if (existingMessage) {
                console.log('Duplicate message detected, skipping');
                return prevMessages;
            }

            return [...prevMessages, { ...newMessage, status: 'sent' }];
        });
    }, []);

    useEffect(() => {
        console.log('Setting up socket connection');
        if (!socketRef.current) {
            socketRef.current = socketConfig;
            socketRef.current.connect();
        }

        const socket = socketRef.current;

        socket.on('connect', () => {
            console.log('Socket connected');
            socket.emit('join', senderId);
        });

        socket.on('disconnect', (reason) => {
            console.warn('Socket disconnected:', reason);
            // Attempt to reconnect after a short delay
            setTimeout(() => {
                if (socket && !socket.connected) {
                    console.log('Attempting to reconnect socket...');
                    socket.connect();
                }
            }, 1000);
        });

        socket.on('receiveMessage', (newMessage: Message) => {
            console.log('Received new message:', newMessage);
            addMessage(newMessage);
        });
        // socket.on('notifications', ()=>{
        //     console.log('listening to notifications')
        // })
        socket.on('receivedNotification', (newNotification) => {
            console.log('Received new notification:', newNotification);
            // Handle the new notification (e.g., update state, show alert, etc.)
        });

        socket.emit('getNotifications', { userId }, (response: SocketResponse<{
            notifications_data: {
                id: number;
                created_at: Date | null;
                updated_at: Date | null;
                user_id: string | null;
                message: string;
                type: "application_status" | "chats";
                read: boolean;
            }[]
        }>) => {
            console.log('-----getting notiications-----', response);
            if (response.status === 'OK' && response.data) {
                setUnreadNotifications(response.data.notifications_data);
            }
        });
        socket.emit('getChatHistory', { senderId, recipientId }, (response: SocketResponse<{ chatHistory: Message[] }>) => {
            console.log('Received chat history:', response);
            if (response.status === 'OK' && response.data) {
                setMessages(response.data.chatHistory);
            }
        });

        socket.emit('getUserChats', { userId: senderId, user_type: user?.user_type }, (response: SocketResponse<{ userChats: UserChat[] }>) => {
            console.log('Received user chats:', response);
            if (response.status === 'OK' && response.data) {
                setUserChats(response.data.userChats);
            }
        });

        return () => {
            console.log('Cleaning up socket listeners');
            socket.off('connect');
            socket.off('disconnect');
            socket.off('receiveMessage');
            socket.off('notifications');
            socket.off('receivedNotification');
            socket.off('getNotifications');
        };
    }, [senderId, recipientId, addMessage, user?.user_type, userId]);

    useEffect(() => {
        if (socketRef.current && senderId) {
            socketRef.current.emit('join', senderId);
        }
    }, [senderId]);

    const sendMessage = useCallback((message: string) => {
        console.log('Sending message:', message);
        if (!user || !socketRef.current) return;

        // Generate a temporary ID for the pending message
        const tempId = `temp_${Date.now()}_${Math.random()}`;

        // Immediately add the message with pending status
        const pendingMessage: Message = {
            tempId,
            sender_id: user.id,
            recipient_id: recipientId,
            message_text: message,
            status: 'pending',
            created_at: new Date()
        };

        setMessages(prevMessages => [...prevMessages, pendingMessage]);

        socketRef.current.emit('sendMessage', { message, senderId: user.id, recipientId }, (response: SocketResponse<{ message: Message }>) => {
            if (response.status === 'OK' && response.data) {
                console.log('Message sent successfully:', response.data.message);
                // Update the pending message with the server response
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.tempId === tempId
                            ? { ...response.data!.message, status: 'sent' as const }
                            : msg
                    )
                );
            } else {
                console.error('Failed to send message:', response.error);
                // Mark the message as failed
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.tempId === tempId
                            ? { ...msg, status: 'failed' as const }
                            : msg
                    )
                );
            }
        });
    }, [user, recipientId]);

    const createNotification = useCallback((notificationType: string, userId: string, message: string) => {
        if (!socketRef.current) return;
        console.log(notificationType);
        console.log(userId);
        console.log(message);

        socketRef.current.emit('notifications', { type: notificationType, user_id: userId, message }, (response: SocketResponse<{ data: TNotification }>) => {
            if (response.status === 'OK') {
                console.log('Notification created successfully:', response.data);
                // Update unread notifications state when a new notification is created
                setUnreadNotifications(prev => [...prev, response.data?.data as TNotification]);
            } else {
                console.error('Failed to create notification:', response.error);
            }
        });
    }, []);

    const getUserChats = useCallback(() => {
        if (!user || !socketRef.current) return;

        socketRef.current.emit('getUserChats', user.id, (response: SocketResponse<{ userChats: UserChat[] }>) => {
            if (response.status === 'OK' && response.data) {
                console.log('Received user chats:', response.data.userChats);
                setUserChats(response.data.userChats);
            } else {
                console.error('Failed to get user chats:', response.error);
            }
        });
    }, [user]);

    const retryMessage = useCallback((failedMessage: Message) => {
        if (!failedMessage.tempId) return;

        // Update message status to pending
        setMessages(prevMessages =>
            prevMessages.map(msg =>
                msg.tempId === failedMessage.tempId
                    ? { ...msg, status: 'pending' as const }
                    : msg
            )
        );

        // Retry sending the message
        if (!user || !socketRef.current) return;

        socketRef.current.emit('sendMessage', {
            message: failedMessage.message_text,
            senderId: user.id,
            recipientId
        }, (response: SocketResponse<{ message: Message }>) => {
            if (response.status === 'OK' && response.data) {
                console.log('Message retry successful:', response.data.message);
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.tempId === failedMessage.tempId
                            ? { ...response.data!.message, status: 'sent' as const }
                            : msg
                    )
                );
            } else {
                console.error('Failed to retry message:', response.error);
                setMessages(prevMessages =>
                    prevMessages.map(msg =>
                        msg.tempId === failedMessage.tempId
                            ? { ...msg, status: 'failed' as const }
                            : msg
                    )
                );
            }
        });
    }, [user, recipientId]);

    return {
        socket: socketRef,
        messages,
        userChats,
        unreadNotifications,
        sendMessage,
        getUserChats,
        createNotification,
        retryMessage
    }
}
