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
            <div className='w-64 rounded-lg border transition duration-300 hover:shadow-lg p-4 h-64 flex flex-col'>
                <h3 className='text-[10px] font-black text-gray-500 ml-auto'>{getRelativeTime(gig.created_at)}</h3>
                <div className='flex gap-1.5 items-center'>
                    <div className='relative h-12 w-12'>
                        <Image alt='logo' src={gig.company_logo} fill className='object-cover rounded-full' />
                    </div>
                    <h3 className='font-semibold text-sm'>{gig.company_name}</h3>
                </div>
                <div className='mt-6'>
                    <h2 className='text-lg font-bold leading-none'>
                        {gig.title}
                    </h2>
                    <p className='text-xs mt-1.5'>
                        {gig.description.slice(0, 100)}
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