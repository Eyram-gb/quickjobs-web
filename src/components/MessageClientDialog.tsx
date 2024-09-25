'use client'
import React, { useState, useEffect } from 'react'
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from '@/components/ui/button';
import { EllipsisVertical, SendHorizontal } from 'lucide-react'
// import { chats, messages } from './ChatsUI';
import { DialogContent } from './ui/dialog';
import { useWebSocket } from '@/lib/hooks/useWebSocket';
import { useAuthStore } from '@/lib/store/authStore';
import { socketConfig } from '@/lib/socketConfig';
import { getTime } from '@/lib/utils';

interface Chat {
    id: number;
    name: string;
    message: string;
    time: string;
}

interface Message {
    id: number;
    sender: string;
    text: string;
    time: string;
}

const MessageClientDialog = ({ recipient_id }: { recipient_id: string }) => {
    const { user } = useAuthStore()
    const { messages, sendMessage } = useWebSocket({ 
        senderId: user?.id as string, 
        recipientId: recipient_id 
    });
    const [text, setText] = useState('')

    useEffect(() => {
        console.log('Current messages:', messages);
    }, [messages]);

    function handleSendMessage() {
        if (text.trim()) {
            console.log('Sending message:', text);
            sendMessage(text);
            setText('');
        }
    }

    return (
        <div>
            <DialogContent>
                <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                    <div>
                        <div className="font-bold">Mensah Bruwaa</div>
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
                        <div key={message.id} className={`flex mb-4 ${message.sender_id === 'You' ? 'justify-end' : ''}`}>
                            {message.sender_id !== user?.id && <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>}
                            <div className={`p-2 rounded-lg max-w-xs ${message.sender_id === user?.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                {/* {message.sender !== 'You' && <div className="font-bold">{message.sender}</div>} */}
                                <div className='text-xs'>{message.message_text}</div>
                                <div className="text-gray-500 text-[10px] mt-2 flex justify-end leading-none">{getTime(message.created_at as Date)}</div>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="p-4 border-t border-gray-300 flex">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder="Your message"
                        className="flex-1 p-2 border border-gray-300 rounded mr-4"
                    />
                    <Button onClick={handleSendMessage} className=""><SendHorizontal /></Button>
                </div>
            </DialogContent>
        </div>
    )
}

export default MessageClientDialog