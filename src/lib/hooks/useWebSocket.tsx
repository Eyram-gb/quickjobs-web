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

export const useWebSocket = ({senderId, recipientId}:{senderId:string, recipientId:string}) => {
    const { user } = useAuthStore()
    const [messages, setMessages] = useState<Message[]>([])
    const socketRef = useRef<Socket | null>(null);

    const addMessage = useCallback((newMessage: Message) => {
        console.log('Adding new message:', newMessage);
        setMessages(prevMessages => [newMessage, ...prevMessages]);
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

        socket.emit('getChatHistory', {userId1: senderId, userId2: recipientId}, (response: SocketResponse<{chatHistory: Message[]}>) => {
            console.log('Received chat history:', response);
            if (response.status === 'OK' && response.data) {
                setMessages(response.data.chatHistory);
            }
        });

        return () => {
            console.log('Cleaning up socket listeners');
            socket.off('connect');
            socket.off('receiveMessage');
        };
    }, [senderId, recipientId, addMessage]);

    const sendMessage = useCallback((message: string) => {
        console.log('Sending message:', message);
        if (!user || !socketRef.current) return;

        socketRef.current.emit('sendMessage', { message, senderId: user.id, recipientId }, (response: SocketResponse<{message: Message}>) => {
            if (response.status === 'OK' && response.data) {
                console.log('Message sent successfully:', response.data.message);
            } else {
                console.error('Failed to send message:', response.error);
            }
        });
    }, [user, recipientId]);

    return {
        messages,
        sendMessage
    }
}