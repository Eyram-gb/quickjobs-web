import React from 'react'
import { SearchFilter } from '@/components/SearchFilter';
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import { TGig } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants';
import axios from 'axios';
import { getQueryClient } from '@/lib/queryclient';
import Gigs from '@/components/Gigs';
import { fetchGigs } from '@/lib/queries';

async function GigsPage () {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['gigs'],
    queryFn: async () => {
      const gigs = await fetchGigs()
      console.log(gigs)
      return gigs
    },
  })

  return (
    <div>
      <div className='w-full my-8'>
        {/* {data && data?.length > 0 &&
          <SearchFilter />
        } */}
      </div>
        <HydrationBoundary state={dehydrate(queryClient)}>
            <SearchFilter />
            <div className='px-10'>
          <Gigs />
            </div>
        </HydrationBoundary>
        {/* {data && data?.length > 0 ? data?.map((item, index) => (
          <GigCard gig={item} key={index} />
        )) : <p className='text-center font-bold mx-auto text-4xl'>No Gigs</p>
        } */}
    </div>
  )
}

export default GigsPage;