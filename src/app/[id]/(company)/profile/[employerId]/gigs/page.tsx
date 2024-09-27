import { API_BASE_URL } from '@/lib/constants'
import { useAuthStore } from '@/lib/store/authStore'
import { TGigDetails } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'

const Gigs = async ( {
    params: { employerId, id }
}:
    {
      params: { employerId: string, id:string };
    }) => {
    const res = await fetch(`${API_BASE_URL}/gigs/${employerId}/employer`);
    const data: TGigDetails[] = await res.json();

    console.log(data);
    return (
        <div className='p-10'>
            {
                data.map((item) => (
                    <Card key={item.id} className='w-80 p-4'>
                        <div className='flex justify-between items-center'>
                            <p className='font-semibold'>{item.title}</p>
                            <div className="flex items-center space-x-2">
                                <label
                                    htmlFor="expired"
                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                >
                                    Expired
                                </label>
                                <Checkbox id="expired" className='data-[state=checked]:bg-rose-500' />
                            </div>
                        </div>
                        <p className='text-xs'>{item.description}</p>
                        <div className='flex justify-between mt-4'>
                        <Link href={`/${id}/profile/${employerId}/applications?gigId=${item.id}`} className={`${buttonVariants({ variant: "default" })} h-8`}>View Applications</Link>
<Button variant='outline' className='h-8'>Edit Gig</Button>
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}

export default Gigs;