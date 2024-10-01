'use client'

import React from 'react'
import NavBar from './NavBar'
import { ClientNavBar } from './ClientNavBar';
import { EmployerNavBar } from './EmployerNavBar';
import { useAuthStore } from '@/lib/store/authStore';

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
            <footer></footer>
        </>
    )
}

export default MainLayout