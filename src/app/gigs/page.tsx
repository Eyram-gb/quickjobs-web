import Gig from '@/components/Gig';
import { getGigs } from '@/lib/queries';
import React from 'react'

const Gigs = async () => {
  const gigs = await getGigs();
  return (
    <div>
      {gigs?.map((item, index) => (
        <Gig gig={item} key={index} />
      ))}
    </div>
  )
}

export default Gigs