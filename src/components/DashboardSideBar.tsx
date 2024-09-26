'use client'
import { getTabRoutes } from '@/lib/tabRoutes';
import React from 'react'
import SideTabs from './SideTabs';
import { useAuthStore } from '@/lib/store/authStore';

const DashboardSideBar = ({
    id,
}: {
    id: string;
}) => {
    const { employerSideTabs, clientSideTabs } = getTabRoutes(id);
    const { user } = useAuthStore();
    return (
        <>
            <SideTabs tabs={user?.user_type !== 'client' ? employerSideTabs : clientSideTabs} />
        </>
    )
}

export default DashboardSideBar