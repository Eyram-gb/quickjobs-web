import Gig from '@/components/Gig';
import { Input } from '@/components/ui/input';
import { getGigs } from '@/lib/queries';
import { Search } from 'lucide-react';
import React from 'react'

const Gigs = async () => {
  const gigs = await getGigs();
  return (
    <div>
      <div className='w-full my-8'>
        <div className='max-w-xl relative mx-auto'>
        <Input className='rounded-full py-4'/>
        <Search className='absolute top-2.5 right-3' size={18} />
        </div>
      </div>    
      {gigs?.map((item, index) => (
        <Gig gig={item} key={index} />
      ))}
    </div>
  )
}

export default Gigs