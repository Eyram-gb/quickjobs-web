'use client'
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client';
import { socketConfig } from '../socketConfig';
import { useAuthStore } from '../store/authStore';
// import {  Message } from '@/components/ChatsUI';


export type SocketResponse<T> = {
    status: 'OK' | 'ERROR';
    data?: T;
    error?: Error;
};
interface Message {
    id?: number;
    created_at?: Date | null;
    updated_at?: Date | null;
    sender_id?: string | null;
    recipient_id?: string | null;
    message_text: string;
}

export const useWebSocket = () => {
    const { user } = useAuthStore()
    const [messages, setMessages] = useState<Message[]>([])
    const socketRef = useRef<Socket>(null);
    useEffect(() => {
        let socket = socketRef.current;
        if (!socket) {
            socket = socketConfig;
            socket.connect();
            socket.on('join', onConnect)
            socket.on('message', onMessage)
            socket.on('getChatHistory', onGetChatHistory)
            socket.on('getUserChats', onGetUserChats)
        }

        function onConnect() {
            if (process.env.NODE_ENV === 'development') {
                console.log('Connected 🔥');
            }
        }
        function onGetChatHistory(response: SocketResponse<Message>) {
            const data = response.data
            if (!data) return;
            console.log('message sent');

            setMessages((prev) => [data, ...prev.reverse()].reverse());
        }

        function onMessage(response: SocketResponse<Message>) {
            console.log('message entered');
            const data = response.data;
            if (!data) return;
            console.log('message sent');

            setMessages((prev) => [data, ...prev.reverse()].reverse());
        }

        function onGetUserChats() {
            // userChats
        }
    }, [user])

    return (
        {
            socketConfig,
            messages
        }
    )
}