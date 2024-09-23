// import { employerSideTabs } from '@/components/EmployerProfile'
import { getTabRoutes } from '@/lib/tabRoutes';
import ClientNavBar from '@/components/layout/ClientNavBar'
import SideTabs from '@/components/SideTabs'
// import useTabRoutes from '@/app/tabRoutes';
import React, { ReactNode } from 'react'

const Layout = ({ children, params: { id } }: { children: ReactNode, params: { id: string }; }) => {
    const { clientSideTabs } = getTabRoutes(id);
    return (
        <div>
            <ClientNavBar />
            <div className='grid grid-cols-8'>
                <SideTabs tabs={clientSideTabs} />
                <div className='col-start-3 col-span-full '>
                    {children}
                </div>
            </div>
            <footer></footer>
        </div>
    )
}

export default Layout