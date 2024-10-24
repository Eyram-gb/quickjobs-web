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
    const [unreadNotifications, setUnreadNotifications] = useState<{
        id: number;
        created_at: Date | null;
        updated_at: Date | null;
        user_id: string | null;
        message: string;
        type: "application_status" | "chats";
        read: boolean;
    }[]>([])
    const [userChats, setUserChats] = useState<UserChat[]>([])
    const socketRef = useRef<Socket | null>(null);

    const addMessage = useCallback((newMessage: Message) => {
        console.log('Adding new message:', newMessage);
        setMessages(prevMessages => [...prevMessages, newMessage]);
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

        socket.on('receiveMessage', (newMessage: Message) => {
            console.log('Received new message:', newMessage);
            addMessage(newMessage);
        });

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
            socket.off('receiveMessage');
        };
    }, [senderId, recipientId, addMessage, user?.user_type, userId]);

    const sendMessage = useCallback((message: string) => {
        console.log('Sending message:', message);
        if (!user || !socketRef.current) return;

        socketRef.current.emit('sendMessage', { message, senderId: user.id, recipientId }, (response: SocketResponse<{ message: Message }>) => {
            if (response.status === 'OK' && response.data) {
                console.log('Message sent successfully:', response.data.message);
            } else {
                console.error('Failed to send message:', response.error);
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

    return {
        messages,
        userChats,
        unreadNotifications,
        sendMessage,
        getUserChats,
        createNotification
    }
}