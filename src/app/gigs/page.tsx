import React from 'react'
import { SearchFilter } from '@/components/SearchFilter';
import { dehydrate, HydrationBoundary, QueryClient, useQuery } from '@tanstack/react-query';
import { TGig } from '@/lib/types';
import { API_BASE_URL } from '@/lib/constants';
import axios from 'axios';
import { getQueryClient } from '@/lib/queryclient';
import AllGigs from '@/components/AllGigs';
import { fetchGigs } from '@/lib/queries';

export const dynamic = "force-dynamic";
// export const fetchCache = "force-no-store";

async function GigsPage({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = getQueryClient()
  await queryClient.prefetchQuery({
    queryKey: ['gigs'],
    queryFn: async () => {
      const jobTypes = Array.isArray(searchParams?.jobTypes) ? searchParams.jobTypes.join(',') : '';
      const experienceLevels = Array.isArray(searchParams?.experienceLevels) ? searchParams.experienceLevels.join(',') : '';
      const searchInput = searchParams?.searchInput || '';
      const industryId = searchParams?.industryId || ''; // Extract industryId

      const paramsString = `?jobTypes=${jobTypes}&experienceLevels=${experienceLevels}&searchInput=${searchInput}&industryId=${industryId}`; // Include industryId
      const gigs = await fetchGigs(paramsString); // Pass the formatted query string
      return gigs;
    },
  })

  return (
    <div>
      <div className='w-full my-8'>
        {/* {data && data?.length > 0 &&
          <SearchFilter />
        } */}
      </div>
            <SearchFilter />
        <HydrationBoundary state={dehydrate(queryClient)}>
            <div className='px-10'>
          <AllGigs />
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
