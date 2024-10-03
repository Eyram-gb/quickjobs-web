'use client'

import React from 'react'
import Gig from '@/components/GigCard';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from './ui/breadcrumb';
import { Button } from '@/components/ui/button';
import { getRelativeTime } from '@/lib/utils';
import { TGig, TGigDetails } from '@/lib/types';
import Image from 'next/image'
import Link from 'next/link'
import { useAuthStore } from '@/lib/store/authStore';
import { DialogTrigger, Dialog, DialogContent, DialogDescription, DialogTitle } from './ui/dialog';
import ApplyGig from './forms/ApplyGig';
import EditGig from './forms/EditGig';

const GigDetails = ({ gig }: { gig: TGigDetails }) => {
    const { client_profile, user, employer_profile } = useAuthStore()
    const isGigCreator = user?.id === gig.user_id;
    return (
        <>
            <div className='p-24'>
                {/* <div className='sticky top-[100px] w-1/4'>
                <StickyComponent />
            </div> */}
                <div className='flex justify-between'>
                    <BreadcrumbNavigation />
                    <p className='text-sm'>{getRelativeTime(gig.created_at)}</p>
                </div>
                <div className='grid grid-cols-10 gap-10 mt-8'>
                    <div className='col-span-7'>
                        <div className='space-y-5'>
                            <div className='flex justify-between items-center'>
                                <h2 className='text-2xl font-semibold'>{gig.title}</h2>
                                <div className='flex gap-2 flex-wrap'>
                                    <div className='bg-purple-100 text-purple-800 rounded-md text-xs w-fit p-1 font-semibold'>{gig.experience}</div>
                                    <div className='bg-emerald-100 text-emerald-800 rounded-md text-xs w-fit p-1 font-semibold'>{gig.schedule}</div>
                                    {gig.remote && <div className='bg-amber-100 text-amber-800 rounded-md text-xs w-fit p-1 font-semibold'>Remote</div>}
                                </div>
                            </div>
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
                                <ul className='list-disc list-inside'>
                                    {gig?.requirements ? (
                                        gig.requirements.map((item, index) => (
                                            <li className='text-sm' key={index}>
                                                {item}
                                            </li>
                                        ))
                                    ) : (
                                        <p className='text-sm'>No requirements available.</p>
                                    )}
                                </ul>
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
                                <Dialog>
                                    <DialogTrigger>
                                        <>
                                            {user?.user_type === 'client' && <Button size='lg' className='w-64 mx-auto'>Apply</Button>}
                                            {isGigCreator && <Button size='lg' className='w-64 mx-auto'>Edit gig</Button>}
                                        </>
                                    </DialogTrigger>
                                    <DialogContent>
                                        <DialogTitle>Are you absolutely sure?</DialogTitle>
                                        <div>
                                            {!isGigCreator ? <ApplyGig
                                                gigId={gig.id}
                                                applicantId={client_profile?.id as string}
                                            />
                                                : <EditGig
                                                    employerId={employer_profile?.id as string}
                                                    gig={gig}
                                                    userId={user?.id as string}
                                                />
                                            }
                                        </div>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                    </div>
                    <div className='shadow border col-span-3 rounded-lg p-4 h-fit sticky top-24'>
                        <div className='flex items-center gap-2'>
                            <div className='w-12 h-12 relative rounded-md overflow-hidden'>
                                <Image
                                    src={gig.company_logo}
                                    alt='logo'
                                    fill
                                    className='object-cover bg-gray-100'
                                />
                            </div>
                            <h2 className='font-semibold text-sm'>{gig.company_name}</h2>
                        </div>
                        <div className='border-b pb-4'>
                            <div className='mt-4'>
                                <h2 className='text-xs font-semibold'>Website</h2>
                                <Link href='https:website.com' target='_blank' rel='noreferrer' className='text-xs text-cyan-400 hover:underline'>{gig.website}</Link>
                            </div>
                            <div className=''>
                                <h2 className='text-xs font-semibold'>Location</h2>
                                <p className='text-xs'>Johannesburg, SA</p>
                            </div>

                        </div>
                        <div className='mt-5'>
                            <h2 className='text-xs font-semibold'>About</h2>
                            <p className='text-xs text-gray-400'>{gig.company_bio}</p>
                        </div>
                    </div>
                </div>
                <div className='mt-10 space-y-3'>
                    <h2 className='text-3xl font-bold'>Related Gigs</h2>
                    {/* <div className='flex gap-5 flex-wrap'>
                        <Gig gig={gig} />
                        <Gig gig={gig} />
                        <Gig gig={gig} />
                    </div> */}
                </div>
            </div></>
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