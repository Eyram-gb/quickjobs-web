import { API_BASE_URL } from '@/lib/constants'
import { TGigDetails } from '@/lib/types'
import React from 'react'
import { Card } from '@/components/ui/card'
import { Button, buttonVariants } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'
import EditGig from '@/components/forms/EditGig'

const Gigs = async ({
    params: { employerId, id }
}:
    {
        params: { employerId: string, id: string };
    }) => {
    const res = await fetch(`${API_BASE_URL}/gigs/${employerId}/employer`, {
      cache: "no-store",
    });
    const data: TGigDetails[] = await res.json();

    console.log(data);
    return (
        <div className='p-10 flex gap-4 flex-wrap'>
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
                        <p className='text-xs'>{item.description.length >135 ? `${item.description.slice(0,135)}...`: item.description}</p>
                        <div className='flex justify-between mt-4'>
                            <Link
                                href={`/${id}/profile/${employerId}/applications?gigId=${item.id}`}
                                className={`${buttonVariants({ variant: "default" })} h-8`}
                            >
                                View Applications
                            </Link>
                            <EditGig employerId={employerId} userId={id} gig={item} />
                        </div>
                    </Card>
                ))
            }
        </div>
    )
}

export default Gigs;