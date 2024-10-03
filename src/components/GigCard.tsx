import { TGig } from '@/lib/types'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { getRelativeTime } from '@/lib/utils'

const GigCard = ({ gig }: { gig: TGig }) => {
    console.log(gig)
    return (
        <Link href={`/gigs/${gig.id}`}>
            <div className='w-72 rounded-lg border transition duration-300 hover:shadow-lg p-4 h-60 flex flex-col'>
                <h3 className='text-[10px] font-black text-gray-500 ml-auto'>{getRelativeTime(gig.created_at)}</h3>
                <div className='flex gap-1.5 items-center'>
                    <div className='relative h-10 w-10'>
                        <Image alt='logo' src={gig.company_logo} fill className='object-cover rounded-full' />
                    </div>
                    <div className=''>
                        <h2 className='text-sm font-semibold leading-none mt-1'>{gig.title}</h2>
                        <div className='flex gap-0.5 items-center'>
                            <h3 className='text-xs text-gray-500 font-semibold'>{gig.company_name}</h3>
                            <p className='font-bold'>&#183;</p>
                            <h3 className='text-xs text-gray-400 font-semibold'>{gig.application_count} Applicants</h3>
                        </div>
                    </div>
                </div>
                <div className='flex gap-2 flex-wrap mt-3'>
                    <div className='bg-purple-100 text-purple-800 rounded-md text-xs w-fit p-1 font-semibold'>{gig.experience}</div>
                    <div className='bg-emerald-100 text-emerald-800 rounded-md text-xs w-fit p-1 font-semibold'>{gig.schedule}</div>
                    {gig.remote && <div className='bg-amber-100 text-amber-800 rounded-md text-xs w-fit p-1 font-semibold'>Remote</div>}
                </div>
                <div className='mt-3'>
                    {/* <h2 className='text-lg font-bold leading-none'>
                        {gig.title}
                    </h2> */}
                    <p className='text-xs mt-1.5'>
                        {gig.description.slice(0, 100)}
                        {gig.description.length > 100 ? '...' : ''}
                    </p>
                </div>
                {/* <div className='flex gap-1 flex-wrap mt-1.5'>
                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>Remote</p>
                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>In-Person</p>
                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>Flexible Schedule</p>
                </div> */}
                <div className='flex justify-between items-end mt-auto border-t pt-1.5'>
                    <h3 className='text-xs text-gray-500'>Kigali, RW</h3>
                    <Button type='button' className='text-xs h-8'>
                        Apply
                    </Button>
                </div>
            </div>
        </Link>
    )
}

export default GigCard