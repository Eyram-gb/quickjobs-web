'use client'
import { useAuthStore } from '@/lib/store/authStore';
import { Button, buttonVariants } from '../ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '../ui/dropdown-menu';
import { LogOut, Mail, Settings, UserRound, UserCog, Bell } from 'lucide-react';
import Link from 'next/link';
import React from 'react'
import { useRouter } from 'next/navigation';
import { useWebSocket } from '@/lib/hooks/useWebSocket';

export const ClientNavBar = () => {
  const { isAuthenticated, client_profile, logout, user } = useAuthStore();
  const { unreadNotifications } = useWebSocket({ userId: user?.id })
  return (
    <>
      <nav className="sticky top-0 z-50 bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex-shrink-0">
              <a href="/" className="text-xl font-bold flex gap-2 items-center">
                <img src="/logo.svg" alt="logo" className='h-8' />
                <p className='text-2xl font-medium'>Quickjobs</p>
              </a>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                <a href="/dashboard" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Dashboard
                </a>
                <a href="/jobs" className="text-gray-700 hover:bg-gray-100 px-3 py-2 rounded-md text-sm font-medium">
                  Gigs
                </a>
                {!isAuthenticated ? <div className='flex gap-x-2'>
                  <Link className={buttonVariants({ variant: "outline" })} href='/login'>Login</Link>
                  <Button className=''>Register</Button>
                </div> :
                  <div className='flex gap-4 items-center'>
                    <DropdownMenu>
                      <DropdownMenuTrigger className='relative focus:outline-none'>
                        <Bell />
                        <div className='bg-rose-500 text-white text-[10px] flex justify-center items-center w-4 h-4 rounded-full absolute -top-2 -right-1'>{unreadNotifications.length}</div>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className='max-w-sm'>
                        <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                        {
                          unreadNotifications.map((item) => {
                            return (
                              <>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>{item.message}</DropdownMenuItem>
                              </>
                            )
                          })
                        }
                      </DropdownMenuContent>
                    </DropdownMenu>

                    <ClientNavProfile />
                  </div>
                }
              </div>
            </div>
          </div>
        </div>
      </nav>
    </>
  )
}

export const ClientNavProfile = () => {
  const { client_profile, logout, user } = useAuthStore();
  const router = useRouter();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className='outline-none'>
        <div className='w-12 h-12 rounded-full border bg-gray-100 hover'>

        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent className='md:w-52 mr-4'>
        <DropdownMenuLabel>{client_profile?.first_name} </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuItem
        >
          <Link className='flex gap-x-4' href={`/${user?.id}/${user?.user_type === 'client' ? 'client-profile' : 'profile'}`}>
            <UserRound size={16} />
            <span>Profile</span>
          </Link>
        </DropdownMenuItem>
        <DropdownMenuItem
          className='flex gap-x-4'
        >
          <UserCog size={16} />
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
          onClick={() => {
            router.push('/');
            logout()
          }}
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
  )
}