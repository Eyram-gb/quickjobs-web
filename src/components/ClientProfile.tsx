'use client'

import { useAuthStore } from '@/lib/store/authStore'
import { BriefcaseBusiness, ChartColumnIncreasing, House } from 'lucide-react';
import Image from 'next/image';
import React from 'react'
import { EditClientProfile } from './forms/EditClientProfile';

const ClientProfile = () => {
  const { client_profile } = useAuthStore();
  console.log(client_profile)
  return (
    <div className='mb-20'>
      <div className=''>
        {/* BANNER AND PROFILE IMAGES */}
        <div className='relative h-56 bg-sky-50'>
        </div>
        <div className='px-8 mt-4 flex justify-between'>
          
          <div className='flex gap-x-6 w-full'>
            <div className='bg-teal-100 h-28 w-28 border-4 border-white rounded-full -mt-12 relative z-10 overflow-hidden'>
              <Image alt='logo' src={client_profile?.profile_url || ''} fill className='object-cover' />
            </div>
            <div className='flex flex-col md:flex-row justify-between gap-4 items-center flex-1'>
              <h2 className='text-2xl font-bold'>{`${client_profile?.first_name} ${client_profile?.last_name}`}</h2>
              <EditClientProfile />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClientProfile