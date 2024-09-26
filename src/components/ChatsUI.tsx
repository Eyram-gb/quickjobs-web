'use client'
import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EllipsisVertical, SendHorizontal } from 'lucide-react';
import { useWebSocket } from '@/lib/hooks/useWebSocket';
import { useAuthStore } from '@/lib/store/authStore';

export interface Chat {
    id: number;
    name: string;
    message: string;
    time: string;
}

export interface Message {
    id: number;
    sender: string;
    text: string;
    time: string;
}

export const chats: Chat[] = [
    { id: 1, name: 'TechPulse Company', message: 'Reminder that we have a project meeting...', time: '13:02' },
    { id: 2, name: 'Michelle Davis', message: 'Just finished a workout and feeling energized!', time: '13:02' },
    { id: 3, name: 'Joseph King', message: 'Please prepare a presentation on the recent...', time: '13:02' },
    // Add more chat items here
];

export const messages: Message[] = [
    { id: 1, sender: 'Virginia Jordan', text: 'Hi, I\'ve just finished my report.', time: '12:38' },
    { id: 2, sender: 'You', text: 'Great job! How long did it take you?', time: '12:42' },
    { id: 3, sender: 'Virginia Jordan', text: 'About two hours. I had to check some data and make sure everything was accurate.', time: '12:49' },
    // Add more messages here
];

const ChatsUI: React.FC = () => {
    const { user } = useAuthStore();
    const [selectedChat, setSelectedChat] = useState<string | null>(null);
    const { messages, userChats, sendMessage, getUserChats } = useWebSocket({
        senderId: user?.id || '',
        recipientId: selectedChat || '',
    });

    useEffect(() => {
        if (user) {
            getUserChats();
        }
    }, [user, getUserChats]);

    const handleChatSelect = (chatUserId: string) => {
        setSelectedChat(chatUserId);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const messageInput = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
        if (messageInput.value.trim() && selectedChat) {
            sendMessage(messageInput.value.trim());
            messageInput.value = '';
        }
    };

    return (
        <div className="flex h-screen">
            <div className="w-1/3 border-r border-gray-300 flex flex-col">
                <div className="p-3 border-b border-gray-300">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="rounded-full -mb-[1.3px]"
                    />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {userChats.map(chat => (
                        <div
                            key={chat.chatUser}
                            className={`flex items-center p-4 border-b border-gray-300 cursor-pointer ${selectedChat === chat.chatUser ? 'bg-gray-200' : ''}`}
                            onClick={() => handleChatSelect(chat.chatUser)}
                        >
                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold">{chat.chatUser}</div>
                                {/* You might want to add a preview of the last message here */}
                            </div>
                            <div className="text-gray-500 text-xs self-start mt-1">7:24pm</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                            <div>
                                <div className="font-bold">{selectedChat}</div>
                            </div>
                            <div>
                                <DropdownMenu>
                                    <DropdownMenuTrigger>
                                        <EllipsisVertical />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent className='mr-4'>
                                        <DropdownMenuItem>Delete Chat</DropdownMenuItem>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuItem>Archive Chat</DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>
                        <div className="flex-1 p-4 overflow-y-auto">
                            {messages.map(message => (
                                <div key={message.id} className={`flex mb-4 ${message.sender_id === user?.id ? 'justify-end' : ''}`}>
                                    {message.sender_id !== user?.id && <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>}
                                    <div className={`p-2 rounded-lg max-w-xs ${message.sender_id === user?.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        <div className='text-xs'>{message.message_text}</div>
                                        <div className="text-gray-500 text-[10px] mt-2 flex justify-end leading-none">
                                            {new Date(message.created_at!).toLocaleTimeString()}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <form onSubmit={handleSendMessage} className="p-4 border-t border-gray-300 flex">
                            <input
                                type="text"
                                name="message"
                                placeholder="Your message"
                                className="flex-1 p-2 border border-gray-300 rounded mr-4"
                            />
                            <Button type="submit"><SendHorizontal /></Button>
                        </form>
                    </>
                ) : (
                    <div className="flex-1 flex items-center justify-center">
                        <div className="text-gray-500">Select a chat to view details</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ChatsUI;