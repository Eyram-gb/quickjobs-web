
import GigDetails from '@/components/GigDetails';
import MainLayout from '@/components/layout/MainLayout';
import { getGigById } from '@/lib/queries';
import React from 'react';

const GigByID = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const gig = await getGigById(id)
    if (!gig) return <h1>Gig Not found</h1>
    return (
        <MainLayout>
            <GigDetails gig={gig} />
        </MainLayout>
    )
}

export default GigByID

