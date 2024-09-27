import {EmployerNavBar} from '@/components/layout/EmployerNavBar'
import React from 'react'
import DashboardSideBar from '@/components/DashboardSideBar';

const Layout = ({ children, params: { id } }: { children: React.ReactNode, params: { id: string }; }) => {

    return (
        <div>
            <EmployerNavBar />
            <div className='grid grid-cols-8'>
                <DashboardSideBar id={id} />
                <div className='col-start-3 col-span-full'>
                    {children}
                </div>
            </div>
            <footer></footer>
        </div>
    )
}

export default Layout