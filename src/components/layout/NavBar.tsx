'use client'
import { useAuthStore } from '@/lib/store/authStore'
import React from 'react'
import { Button } from '../ui/button';
import Link from 'next/link';
import { EmployerNavProfile } from './EmployerNavBar';
import { ClientNavProfile } from './ClientNavBar';

const NavBar = () => {
  const { isAuthenticated, user } = useAuthStore();
  return (
    <nav className='flex justify-between px-12 py-4'>
      <h2 className='text-4xl font-bold'>Quickjobs</h2>
      <ul className='flex gap-x-4 items-center'>
        <li>Home</li>
        <li>
          <Link href='/gigs'>Gigs</Link>
        </li>
        <li>Services</li>
      </ul>
      {!isAuthenticated ? <div className='flex gap-x-2'>
        <Button variant='outline'>Login</Button>
        <Button className=''>
          <Link href='/register'>Register</Link>
        </Button>
      </div> :
        <div>
          {
            user?.user_type !== 'client' ? <EmployerNavProfile /> : <ClientNavProfile />
          }
        </div>
      }

    </nav>
  )
}

export default NavBar