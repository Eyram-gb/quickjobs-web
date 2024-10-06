'use client'
import GigCard from '@/components/GigCard';
import { Input } from '@/components/ui/input';
import { getGigs } from '@/lib/queries';
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Search, SlidersHorizontal } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import React from 'react'
import { SearchFilter } from '@/components/SearchFilter';
import { useQuery } from '@tanstack/react-query';
import { TGig } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants';
import axios from 'axios';

const Gigs =  () => {
  const fetchJobs = async (): Promise<TGig[]> => {
    const res = await axios.get(`${API_BASE_URL}/gigs`)
    return res.data;
  }
  // const gigs = await getGigs();
  const { data, isPending, isError, error } = useQuery({
    queryKey: ['gigs'],
    queryFn: fetchJobs
  })

  if (isPending) return <p>Loading...</p>
  if (isError) return <p>{error.message}</p>
  return (
    <div>
      <div className='w-full my-8'>
        {data && data?.length > 0 &&
          <SearchFilter />
        }
      </div>
      <div className='flex gap-5 flex-wrap p-12'>
        {data && data?.length > 0 ? data?.map((item, index) => (
          <GigCard gig={item} key={index} />
        )) : <p className='text-center font-bold mx-auto text-4xl'>No Gigs</p>
        }
      </div>
    </div>
  )
}

export default Gigs;