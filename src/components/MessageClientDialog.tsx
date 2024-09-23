'use client'
import React, {useEffect} from 'react'
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
import { chats, messages } from './ChatsUI';
import { DialogContent } from './ui/dialog';

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

const MessageClientDialog = () => {
    useEffect(() => {
        const fetchChats = async () => {
            const response = await fetch('/api/chats');
            const data = await response.json();
        };
        fetchChats();
    }, []);
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
          </DialogContent>
    </div>
  )
}

export default MessageClientDialog