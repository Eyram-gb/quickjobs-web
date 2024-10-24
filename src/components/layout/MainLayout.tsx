'use client'

import React from 'react'
import NavBar from './NavBar'
import { ClientNavBar } from './ClientNavBar';
import { EmployerNavBar } from './EmployerNavBar';
import { useAuthStore } from '@/lib/store/authStore';
import { ArrowRight, Github, Twitter, Mail } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation'

const MainLayout = ({
    children,
}: {
    children: React.ReactNode;
}) => {
    const { isAuthenticated, user } = useAuthStore();
    return (
        <>
            {/* <NavBar /> */}
            {!user ? <NavBar /> : (user.user_type === 'client' ? <ClientNavBar /> : <EmployerNavBar />)}
            <div>{children}</div>
            <Footer />
        </>
    )
}

export default MainLayout

function Footer() {
    const pathname = usePathname();
    
    // Define an array of footer links
    const footerLinks = [
        { path: '/', label: 'Home' },
        { path: '/gigs', label: 'Create Jobs' },
        { path: '/gigs', label: 'Find Jobs' },
        { path: '/contact-us', label: 'Contact Us' },
    ];

    return (
        <footer className="bg-[#112C2B] text-white min-h-[70vh] bg-[url('/oscillate.svg')] bg-cover bg-no-repeat bg-top p-14 w-full flex flex-col">
            <div className='flex gap-14 w-full flex-grow'>
                <div className='w-1/2'>
                    <h3 className='font-bold text-amber-400'>Ready to get Your Dream Job?</h3>
                    <Link href='/register' className='border-b w-fit flex gap-5 text-5xl items-center pb-1 mt-2 mb-10'> Register Here Now <ArrowRight size={40} /></Link>
                    <div className=' space-y-10'>
                        <a href="/" className="text-xl font-bold flex gap-2 items-center">
                            <img src="/logo.svg" alt="logo" className='w-20' />
                            <p className='text-5xl font-bold'>Quickjobs</p>
                        </a>
                        <p className='text-sm text-gray-300'>Take the next bold step by creating opportunities or grabbing opportunities here on Quickjobs. Designed to simplify the job creation and job hunting for both users.</p>
                    </div>
                </div>
                <div className='w-1/2'>
                    <div className='flex gap-4 justify-end'>
                        <div className='border-2 p-2 group rounded-full w-fit hover:bg-white border-white'>
                            <Link href='https://github.com/Eyram-gb'>
                                <Github className=' group-hover:text-black transition duration-300' />
                            </Link>
                        </div>
                        <div className='border-2 p-2 group rounded-full w-fit hover:bg-white border-white'>
                            <Link href='https://github.com/Eyram-gb'>
                                <Twitter className=' group-hover:text-black transition duration-300' />
                            </Link>
                        </div>
                        <div className='border-2 p-2 group rounded-full w-fit hover:bg-white border-white'>
                            <a href='mailto:pistisray@gmail.com'>
                                <Mail className=' group-hover:text-black transition duration-300' />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-2xl font-bold mb-6'>Links</h3>
                        <ul className='space-y-2'>
                            {footerLinks.map(link => (
                                <li key={link.path}>
                                    <Link href={link.path} className={` ${pathname === link.path ? 'text-amber-400 font-bold underline' : 'hover:text-amber-400'}`}>
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
            <div className='mt-auto flex justify-center text-xs text-gray-600'>
                <p>&copy; copyright Quickjobs {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}
