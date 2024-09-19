'use client'
import { API_BASE_URL } from '@/lib/constants'
import { useAuthStore } from '@/lib/store/authStore'
import { TGigDetails } from '@/lib/types'
import { useQuery } from '@tanstack/react-query'
import React from 'react'
import { Card } from './ui/card'

const EmployerGigs = () => {
    const { employer_profile } = useAuthStore()

    const { isPending, isError, data, error } = useQuery<TGigDetails[]>({
        queryKey: ['employerGigs'], queryFn: () =>
            fetch(`${API_BASE_URL}/gigs/${employer_profile?.id}/employer`).then(
                (res) => res.json()
            )
    })
    console.log(data)

    if (isPending) return <div>Loading...</div>
    if (isError) return <div>Error: {error.message}</div>
  return (
    <div className='p-10'>
        {
            data.map((item)=>(
                <Card key={item.id} className='w-80 p-4'>
                    <p>{item.title}</p>
                    <p>{item.description}</p>
                </Card>
            ))
        }
        gigs
    </div>
  )
}

export default EmployerGigs