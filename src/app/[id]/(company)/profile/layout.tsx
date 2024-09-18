import EmployerNavBar from '@/components/layout/EmployerNavBar'
import { employerSideTabs } from '@/components/EmployerProfile'
import SideTabs from '@/components/SideTabs'
import React from 'react'

const layout = ({ children }: { children: React.ReactNode }) => {
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

export default layout