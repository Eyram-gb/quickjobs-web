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
        <footer className="bg-[#112C2B] text-white min-h-[70vh] bg-[url('/oscillate.svg')] bg-cover bg-no-repeat bg-top p-6 md:p-14 w-full flex flex-col">
            <div className='flex flex-col md:flex-row gap-8 md:gap-14 w-full flex-grow'>
                <div className='w-full md:w-1/2 mb-8 md:mb-0'>
                    <h3 className='font-bold text-amber-400 text-xl md:text-2xl'>Ready to get Your Dream Job?</h3>
                    <Link href='/register' className='border-b w-fit flex gap-3 md:gap-5 text-3xl md:text-5xl items-center pb-1 mt-2 mb-6 md:mb-10'> Register Here Now <ArrowRight size={32} /></Link>
                    <div className='space-y-6 md:space-y-10'>
                        <a href="/" className="text-lg md:text-xl font-bold flex gap-2 items-center">
                            <img src="/logo.svg" alt="logo" className='w-14 md:w-20' />
                            <p className='text-3xl md:text-5xl font-bold'>Quickjobs</p>
                        </a>
                        <p className='text-xs md:text-sm text-gray-300'>Take the next bold step by creating opportunities or grabbing opportunities here on Quickjobs. Designed to simplify the job creation and job hunting for both users.</p>
                    </div>
                </div>
                <div className='w-full md:w-1/2 flex flex-col gap-8'>
                    <div className='flex flex-row md:justify-end gap-3 md:gap-4'>
                        <div className='border-2 p-2 group rounded-full w-fit hover:bg-white border-white'>
                            <Link href='https://github.com/Eyram-gb'>
                                <Github className='group-hover:text-black transition duration-300' />
                            </Link>
                        </div>
                        <div className='border-2 p-2 group rounded-full w-fit hover:bg-white border-white'>
                            <Link href='https://github.com/Eyram-gb'>
                                <Twitter className='group-hover:text-black transition duration-300' />
                            </Link>
                        </div>
                        <div className='border-2 p-2 group rounded-full w-fit hover:bg-white border-white'>
                            <a href='mailto:pistisray@gmail.com'>
                                <Mail className='group-hover:text-black transition duration-300' />
                            </a>
                        </div>
                    </div>
                    <div>
                        <h3 className='text-xl md:text-2xl font-bold mb-4 md:mb-6'>Links</h3>
                        <ul className='space-y-1 md:space-y-2'>
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
            <div className='mt-8 md:mt-auto flex justify-center text-xs text-gray-600'>
                <p>&copy; copyright Quickjobs {new Date().getFullYear()}</p>
            </div>
        </footer>
    )
}
