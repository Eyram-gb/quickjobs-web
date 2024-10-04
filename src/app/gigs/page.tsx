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

const Gigs = async () => {
  const gigs = await getGigs();
  return (
    <div>
      <div className='w-full my-8'>
        {gigs && gigs?.length > 0 &&          
            <SearchFilter />
        }
      </div>
      <div className='flex gap-5 flex-wrap p-12'>
        {gigs && gigs?.length > 0 ? gigs?.map((item, index) => (
          <GigCard gig={item} key={index} />
        )) : <p className='text-center font-bold mx-auto text-4xl'>No Gigs</p>
        }
      </div>
    </div>
  )
}

export default Gigs;