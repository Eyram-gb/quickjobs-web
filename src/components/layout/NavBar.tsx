'use client'
import { useAuthStore } from '@/lib/store/authStore'
import React from 'react'
import { Button } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { LogOut, Mail,Settings, UserRound, UserCog } from 'lucide-react';

const NavBar = () => {
  const { isAuthenticated, employer_profile } = useAuthStore();
  return (
    <nav className='flex justify-between px-12 py-4'>
      <h2 className='text-4xl font-bold'>Quickjobs</h2>
      <ul className='flex gap-x-4 items-center'>
        <li>Home</li>
        <li>Gigs</li>
        <li>Services</li>
      </ul>
        {!isAuthenticated? <div className='flex gap-x-2'>
          <Button variant='outline'>Login</Button>
          <Button className=''>Register</Button>
        </div>:
        <div>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className='w-12 h-12 rounded-full border bg-gray-100 hover'>

                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent className='md:w-52 mr-4'>
                <DropdownMenuLabel>{employer_profile?.name}</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                className='flex gap-x-4'
                >
                  <UserRound size={16}/>
                  <span>Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                className='flex gap-x-4'
                >
                  <UserCog size={16}/>
                  <span>Update Profile</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                className='flex gap-x-4'
                >
                  <div className='relative'>
                <Mail size={16} />
                <div className='h-3.5 w-3.5 rounded-full text-[9px] absolute -top-2 -right-1.5 bg-rose-500 text-white flex justify-center items-center'>25</div>
                  </div>
                <span>Messages</span>
                </DropdownMenuItem>
                <DropdownMenuItem
                className='flex gap-x-4'
                >
                  <Settings size={16} />
                <span>Settings</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem
                className='flex gap-x-4'
                //  onClick={() => {
                //   localStorage.removeItem('jwt');
                //   window.location.reload();
                // }}
                >
                <LogOut size={16} className='text-rose-500' />
                <span className='font-semibold text-rose-500'>Logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
        </div>
        }

    </nav>
  )
}

export default NavBar