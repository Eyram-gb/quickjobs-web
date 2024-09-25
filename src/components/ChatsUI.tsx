'use client'
import React, { useState } from 'react';
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
import { EllipsisVertical, SendHorizontal } from 'lucide-react'

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
    const [selectedChat, setSelectedChat] = useState<number | null>(null);

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
                    {/* Chat Tab */}
                    {chats.map(chat => (
                        <div
                            key={chat.id}
                            className={`flex items-center p-4 border-b border-gray-300 cursor-pointer ${selectedChat === chat.id ? 'bg-gray-200' : ''}`}
                            onClick={() => setSelectedChat(chat.id)}
                        >
                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold">{chat.name}</div>
                                <div className="text-gray-600 text-xs truncate">{chat.message}</div>
                            </div>
                            <div className="text-gray-500 text-xs self-start mt-1">{chat.time}</div>
                        </div>
                    ))}
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                {/* Select Chat Tab Item */}
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                            <div>
                                <div className="font-bold">{chats.find(chat => chat.id === selectedChat)?.name}</div>
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
                                <div key={message.id} className={`flex mb-4 ${message.sender === 'You' ? 'justify-end' : ''}`}>
                                    {message.sender !== 'You' && <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>}
                                    <div className={`p-2 rounded-lg max-w-xs ${message.sender === 'You' ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        {/* {message.sender !== 'You' && <div className="font-bold">{message.sender}</div>} */}
                                        <div className='text-xs'>{message.text}</div>
                                        <div className="text-gray-500 text-[10px] mt-2 flex justify-end leading-none">{message.time}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <div className="p-4 border-t border-gray-300 flex">
                            <input
                                type="text"
                                placeholder="Your message"
                                className="flex-1 p-2 border border-gray-300 rounded mr-4"
                            />
                            <Button className=""><SendHorizontal /></Button>
                        </div>
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