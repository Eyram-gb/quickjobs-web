import Gig from '@/components/Gig';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getGigById } from '@/lib/queries';
import { getRelativeTime } from '@/lib/utils';
import React from 'react';

const GigDetails = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const gig = await getGigById(id)
    if (!gig) return <h1>Gig Not found</h1>
    return (
        <div className='p-24'>
            {/* <div className='sticky top-[100px] w-1/4'>
                <StickyComponent />
            </div> */}
            <div className='flex justify-between'>
                <BreadcrumbNavigation />
                <p className='text-sm'>{getRelativeTime(gig.created_at)}</p>
            </div>
                    <h1 className='text-center text-5xl font-bold'>Gig Details</h1>
            <div>
                <div>
                    <div className='space-y-5'>
                        <h2 className='text-2xl font-semibold'>{gig.title}</h2>
                        <div>
                            <h2 className='text-lg font-semibold'>Description</h2>
                            <p className='text-sm'>{gig.description}</p>
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold'>Budget</h2>
                            <p className='text-sm'>{gig.budget_range}
                            </p>
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold'>Requirements</h2>
                            <p className='text-sm'>{gig.requirements}
                            </p>
                        </div>
                        <div>
                            <h2 className='text-lg font-semibold'>Tags</h2>
                            <div>
                                <div className='flex gap-2 flex-wrap mt-1.5'>
                                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>Remote</p>
                                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>In-Person</p>
                                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>Flexible Schedule</p>
                                </div>
                            </div>
                        </div>
                        <div className='flex'>
                            <Button size='lg' className='w-64 mx-auto'>Apply</Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10 space-y-3'>
                <h2 className='text-3xl font-bold'>Related Gigs</h2>
                <div className='flex gap-5 flex-wrap'>
                    <Gig gig={gig} />
                    <Gig gig={gig} />
                    <Gig gig={gig} />
                </div>
            </div>
        </div>
    )
}

export default GigDetails

function BreadcrumbNavigation() {
    return (
        <Breadcrumb>
            <BreadcrumbList className='text-xs'>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/gigs">Gigs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className='font-semibold'>Gig Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}

const StickyComponent = () => {
    return (
        <div className="w-16 h-44 bg-blue-500 rounded-full flex items-center justify-center text-white cursor-pointer hover:bg-blue-600 transition-colors">
            <span className="transform -rotate-90 whitespace-nowrap">Quick Action</span>
        </div>
    );
};