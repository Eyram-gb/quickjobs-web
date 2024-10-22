'use client'

import React, { useEffect, useState } from 'react'
import GigCard from './GigCard'
import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '@/lib/constants'
import axios from 'axios'
import { TGig } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import { SearchFilter } from './SearchFilter'
import { fetchGigs } from '@/lib/queries'
import GigsLoadingComponent from './GigsLoadingComponent'

const Gigs = () => {
    const params = useSearchParams();
    const [filters, setFilters] = useState<{ jobTypes: string[]; experienceLevels: string[]; searchInput: string }>({ jobTypes: [], experienceLevels: [], searchInput: '' });

    useEffect(() => {
        const jobTypes = params.getAll('jobTypes');
        const experienceLevels = params.getAll('experienceLevels');
        const searchInput = params.get('searchInput') || '';

        setFilters({ jobTypes, experienceLevels, searchInput }); // Update filters from URL params
    }, [params]);

    const { data, isPending, error } = useQuery({
        queryKey: ['gigs', filters], // Include filters in the query key
        queryFn: () => fetchGigs(`?jobTypes=${filters.jobTypes.join(',')}&experienceLevels=${filters.experienceLevels.join(',')}&searchInput=${filters.searchInput}`), // Pass filters to the API call
        enabled: true // Always enabled since we want to fetch gigs based on filters
    });

    if (error) return <div>{error.message}</div>;
    if (isPending) return <div><GigsLoadingComponent />.</div>;
console.log(data)
    return (
        <div>
            <div className='my-8'>
                {/* <SearchFilter /> */}
            </div>
            <div className='flex gap-8 flex-wrap'>
                {data?.map((item, index) => (
                    <GigCard gig={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Gigs;
