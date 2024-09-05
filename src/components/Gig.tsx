import { TGig } from '@/lib/types'
import Image from 'next/image'
import React from 'react'
import { Button } from './ui/button'
import Link from 'next/link'
import { getRelativeTime } from '@/lib/utils'

const Gig = ({ gig }: { gig: TGig }) => {
    console.log(gig)
    return (
        <Link href={`/gigs/${gig.id}`}>
            <div className='w-64 rounded-lg border transition duration-300 hover:shadow-lg p-4 h-80 flex flex-col'>
                <div className='flex justify-between items-center'>
                    <div className='relative h-12 w-12'>
                        <Image alt='logo' src='https://images.unsplash.com/photo-1521058001910-55b77aba2203?q=80&w=2067&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' fill className='object-cover rounded-full' />
                    </div>
                    <div className='flex gap-x-1 items-center'>
                        <h3 className='font-semibold'>Amazon</h3>
                        <h3 className='text-xs text-gray-500'>{getRelativeTime(gig.created_at)}</h3>
                    </div>
                </div>
                <div className='mt-6'>
                    <h2 className='text-xl font-bold'>
                        {gig.title}
                    </h2>
                    <p className='text-xs mt-1.5'>
                        {gig.description.slice(0, 100)}
                    </p>
                </div>
                <div className='flex gap-2 flex-wrap mt-1.5'>
                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>Remote</p>
                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>In-Person</p>
                    <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>Flexible Schedule</p>
                </div>
                <div className='flex justify-between items-end mt-auto border-t pt-3'>
                    <h3 className='text-xs text-gray-500'>Kigali, RW</h3>
                    <Button type='button' size={'sm'} className='text-xs'>
                        Apply Now
                    </Button>
                </div>
            </div>
        </Link>
    )
}

export default Gig