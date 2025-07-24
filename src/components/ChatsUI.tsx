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
import { EllipsisVertical, SendHorizontal, Loader2, AlertCircle, RotateCcw, CheckCheck } from 'lucide-react';
import { UserChat, useWebSocket } from '@/lib/hooks/useWebSocket';
import { useAuthStore } from '@/lib/store/authStore';
import { getTime } from '@/lib/utils';
import toast from 'react-hot-toast';


const ChatsUI: React.FC = () => {
    const { user } = useAuthStore();
    const [selectedChat, setSelectedChat] = useState<UserChat | null>(null);
    const [searchTerm, setSearchTerm] = useState('');
    const { messages, userChats, sendMessage, getUserChats, socket, retryMessage } = useWebSocket({
        senderId: user?.id || '',
        recipientId: selectedChat?.userId || '',
    });

    useEffect(() => {
        console.log('entering effect')
        console.log(user)
        if (user) {
            getUserChats();
            console.log('entered effect')
        }
    }, [user, getUserChats]);

    const handleChatSelect = (chat: UserChat) => {
        setSelectedChat(chat);
    };

    const handleSendMessage = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if(!socket.current?.connected){
            toast.error('no socket connection')
            return;
        }
        const messageInput = e.currentTarget.elements.namedItem('message') as HTMLInputElement;
        if (messageInput.value.trim() && selectedChat) {
            sendMessage(messageInput.value.trim());
            messageInput.value = '';
        }
    };

    const filteredChats = userChats
        ? userChats.filter(chat =>
            chat.chatUser.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : [];

    console.log(userChats)

    return (
        <div className="flex h-screen">
           {userChats && userChats.length > 0 ? <>
            <div className="w-1/3 border-r border-gray-300 flex flex-col">
                <div className="p-3 border-b border-gray-300">
                    <Input
                        type="text"
                        placeholder="Search..."
                        className="rounded-full -mb-[1.3px]"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                    />
                </div>
                <div className="flex-1 overflow-y-auto">
                    {filteredChats.length > 0 ? filteredChats.map(chat => (
                        <div
                            key={chat.chatUser}
                            className={`flex items-center p-4 border-b border-gray-300 cursor-pointer ${selectedChat?.userId === chat.userId ? 'bg-gray-200' : ''}`}
                            onClick={() => handleChatSelect(chat)}
                        >
                            <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>
                            <div className="flex-1 min-w-0">
                                <div className="font-bold">{chat.chatUser}</div>
                            </div>
                            <div className="text-gray-500 text-xs self-start mt-1">7:24pm</div>
                        </div>
                    )) : <p className="p-4 text-gray-500">No chats found</p>}
                </div>
            </div>
            <div className="flex-1 flex flex-col">
                {selectedChat ? (
                    <>
                        <div className="p-4 border-b border-gray-300 flex justify-between items-center">
                            <div>
                                <div className="font-bold">{selectedChat.chatUser}</div>
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
                            {messages.map((message, index) => (
                                <div key={message.id || message.tempId || index} className={`flex mb-4 ${message.sender_id === user?.id ? 'justify-end' : ''}`}>
                                    {/* {message.sender_id !== user?.id && <div className="w-10 h-10 bg-gray-300 rounded-full mr-4"></div>} */}
                                    <div className={`p-1.5 rounded-lg max-w-xs relative ${message.sender_id === user?.id ? 'bg-blue-100' : 'bg-gray-100'}`}>
                                        <div className='text-xs mr-10'>{message.message_text}</div>
                                        <div className="text-gray-500 text-[10px] flex justify-between items-center leading-none mt-1">
                                            <div className="flex items-center gap-1">
                                                {message.status === 'pending' && (
                                                    <Loader2 className="w-3 h-3 animate-spin text-gray-400" />
                                                )}
                                                {message.status === 'sent' && (
                                                    <CheckCheck className="w-3 h-3 text-teal-300" />
                                                )}
                                                {message.status === 'failed' && (
                                                    <div className="flex items-center gap-1">
                                                        <AlertCircle className="w-3 h-3 text-red-500" />
                                                        <span className="text-red-500 text-[8px]">Failed</span>
                                                        <button
                                                            onClick={() => retryMessage(message)}
                                                            className="ml-1 p-0.5 hover:bg-gray-200 rounded"
                                                            title="Retry sending message"
                                                        >
                                                            <RotateCcw className="w-2.5 h-2.5 text-red-500" />
                                                        </button>
                                                    </div>
                                                )}
                                            </div>
                                            <div>
                                                {getTime(message?.created_at as Date)}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <div className='mb-10'/>
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
            </>: <p className='mt-32 w-2/3 mx-auto'>You have no chats as at this moment. You&apos;ll be contacted by an employer if your application is accepted🤞🏼</p>}
        </div>
    );
};

export default ChatsUI;
