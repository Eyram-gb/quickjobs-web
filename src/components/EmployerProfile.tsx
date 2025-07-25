'use client';

import NewGigForm from '@/components/forms/NewGigForm'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { useAuthStore } from '@/lib/store/authStore';
import { ArrowUpRight, BriefcaseBusiness, ChartColumnIncreasing, House } from 'lucide-react'
import Image from 'next/image'
import React from 'react'
import { SideTabsProps } from './SideTabs';
import { EditEmployerProfile } from './forms/EditEmployerProfile';


const EmployerProfile = ({ industries }: {
    industries: {
        id: number;
        name: string
    }[]
}) => {
    const { employer_profile, user } = useAuthStore();
    return (
        <>
            <div className=''>
                <div className=''>
                    {/* BANNER AND PROFILE IMAGES */}
                    <div className='relative h-56 bg-sky-50'>
                    </div>
                    <div className='px-8 mt-4 flex flex-col md:flex-row justify-between'>
                        <div className='flex gap-x-6'>
                            <div className='bg-teal-100 h-28 w-28 border-4 border-white rounded-full -mt-12 relative z-10 overflow-hidden'>
                                <Image alt='logo' src={employer_profile?.logo_url || ''} fill className='object-cover' />
                            </div>
                            <div>
                                <h2 className='text-2xl font-bold'>{employer_profile?.name}</h2>
                            </div>
                        </div>
                        <div className='flex gap-5'>
                            <NewGigForm industries={industries} />
                            <EditEmployerProfile />
                        </div>
                    </div>
                    {/* <hr className='mx-8 my-6' /> */}
                    <div className='md:grid grid-cols-6 px-8 gap-4 mt-6'>
                        <div className='col-span-4 border-r'>
                            <h2 className='font-semibold'>Bio</h2>
                            <p className='text-sm'>{employer_profile?.description}</p>
                        </div>
                        <div className='flex flex-wrap justify-between col-start-5 col-span-full max-h-28'>
                            <div className=''>
                                <h3 className='text-sm text-gray-500 font-semibold'>Website</h3>
                                <div className='flex items-center'>
                                    <a href={employer_profile?.website_url} rel='noreferrer' target='_blank' className='hover:border-b text-sm'>{employer_profile?.website_url}</a>
                                    <ArrowUpRight />
                                </div>
                            </div>
                            <div className=''>
                                <h3 className='text-sm text-gray-500 font-semibold'>Location</h3>
                                <div className='text-sm'>Sydney, AU</div>
                            </div>
                            <div className='w-1/2'>
                                <div>
                                    <h3 className='text-sm text-gray-500 font-semibold'>Email</h3>
                                    <div className='flex gap-x-2 items-center'>
                                        <a href={`mailto:${user?.email}`} rel='noreferrer' target='_blank' className='hover:border-b text-sm'>{user?.email}</a>
                                        <ArrowUpRight />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EmployerProfile