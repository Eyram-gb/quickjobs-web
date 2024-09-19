'use client'
import EmployerNavBar from '@/components/layout/EmployerNavBar'
import { getTabRoutes } from '@/app/tabRoutes';
import SideTabs from '@/components/SideTabs'
import React from 'react'

const Layout = ({ children, params: { id } }: { children: React.ReactNode, params: { id: string }; }) => {
    const { employerSideTabs } = getTabRoutes(id);

    return (
        <div>
            <EmployerNavBar />
            <div className='grid grid-cols-8'>
                <SideTabs tabs={employerSideTabs} />
                <div className='col-start-3 col-span-full'>
                    {children}
                </div>
            </div>
            <footer></footer>
        </div>
    )
}

export default Layout