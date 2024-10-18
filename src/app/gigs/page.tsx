import React from 'react'
import { SearchFilter } from '@/components/SearchFilter';
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import { TGig } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants';
import axios from 'axios';
import { getQueryClient } from '@/lib/queryclient';
import Gigs from '@/components/Gigs';

const retrieveGigs = async () => {
  console.log('fetching giiggggggsssss 11111')
  const response = await axios.get(`${API_BASE_URL}/gigs`,
  );
  console.log('fetcheeedd giiggggggsssss 11111')
  return response.data as TGig[];
};

async function GigsPage () {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['gigs'],
    queryFn: async () => {
      const gigs = await retrieveGigs()
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
          <Gigs />
        </HydrationBoundary>
        {/* {data && data?.length > 0 ? data?.map((item, index) => (
          <GigCard gig={item} key={index} />
        )) : <p className='text-center font-bold mx-auto text-4xl'>No Gigs</p>
        } */}
    </div>
  )
}

export default GigsPage;