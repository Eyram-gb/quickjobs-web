import { employerSideTabs } from '@/components/EmployerProfile'
import ClientNavBar from '@/components/layout/ClientNavBar'
import SideTabs from '@/components/SideTabs'
import React, { ReactNode } from 'react'

const Layout = ({ children }: { children: ReactNode }) => {
    return (
        <div>
            <ClientNavBar />
            <div className='grid grid-cols-8'>
                <SideTabs tabs={employerSideTabs} />
                <div className='col-start-3 col-span-full '>
                {children}
                </div>
            </div>
            <footer></footer>
        </div>
    )
}

export default Layout