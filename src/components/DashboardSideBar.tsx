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
    const { user, employer_profile } = useAuthStore();
    const { employerSideTabs, clientSideTabs } = getTabRoutes(id, employer_profile?.id);
    return (
        <>
            <SideTabs tabs={user?.user_type !== 'client' ? employerSideTabs : clientSideTabs} />
        </>
    )
}

export default DashboardSideBar