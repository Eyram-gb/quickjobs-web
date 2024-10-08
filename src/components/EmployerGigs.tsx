'use client'
import { API_BASE_URL } from '@/lib/constants'
import { useAuthStore } from '@/lib/store/authStore'
import { TGigDetails } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Card } from './ui/card'
import { Button, buttonVariants } from './ui/button'
import { Checkbox } from './ui/checkbox'
import Link from 'next/link'

const EmployerGigs = () => {
    const { user, employer_profile } = useAuthStore()

    const { isPending, isError, data, error } = useQuery<TGigDetails[]>({
        queryKey: ['employerGigs'], queryFn: () =>
            fetch(`${API_BASE_URL}/gigs/${employer_profile?.id}/employer`).then(
                (res) => res.json()
            )
    })

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>
    console.log(data)
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
                        <Link href={`/${user?.id}/profile/${employer_profile?.id}/applications?gigId=${item.id}`} className={`${buttonVariants({ variant: "default" })} mt-4 h-8`}>View Applications</Link>
                    </Card>
                ))
            }
        </div>
    )
}

export default EmployerGigs