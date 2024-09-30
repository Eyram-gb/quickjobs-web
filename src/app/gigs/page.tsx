import GigCard from '@/components/GigCard';
import { Input } from '@/components/ui/input';
import { getGigs } from '@/lib/queries';
import { Search } from 'lucide-react';
import React from 'react'

const Gigs = async () => {
  const gigs = await getGigs();
  return (
    <div>
      <div className='w-full my-8'>
        {gigs && gigs?.length > 0 &&
          <div className='max-w-xl relative mx-auto'>
            <Input className='rounded-full py-4' />
            <Search className='absolute top-2.5 right-3' size={18} />
          </div>
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

export default Gigs