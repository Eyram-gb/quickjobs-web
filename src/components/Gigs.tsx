'use client'

import React, { useEffect, useState } from 'react'
import GigCard from './GigCard'
import { useQuery } from '@tanstack/react-query'
import { API_BASE_URL } from '@/lib/constants'
import axios from 'axios'
import { TGig } from '@/lib/types'
import { useSearchParams } from 'next/navigation'
import { SearchFilter } from './SearchFilter'

const retrieveGigs = async (params?: string) => {
    console.log('fetching gigs with params:', params);
    const response = await axios.get(`${API_BASE_URL}/gigs${params}`);
    console.log('fetched gigs:', response.data);
    return response.data as TGig[];
};

const Gigs = () => {
    const params = useSearchParams();
    const [filters, setFilters] = useState({ jobTypes: [], experienceLevels: [], searchInput: '' });

    useEffect(() => {
        const jobTypes = params.getAll('jobTypes');
        const experienceLevels = params.getAll('experienceLevels');
        const searchInput = params.get('searchInput') || '';

        setFilters({ jobTypes, experienceLevels, searchInput }); // Update filters from URL params
    }, [params]);

    const { data, isPending, error } = useQuery({
        queryKey: ['gigs', filters], // Include filters in the query key
        queryFn: () => retrieveGigs(`?jobTypes=${filters.jobTypes.join(',')}&experienceLevels=${filters.experienceLevels.join(',')}&searchInput=${filters.searchInput}`), // Pass filters to the API call
        enabled: true // Always enabled since we want to fetch gigs based on filters
    });

    if (error) return <div>{error.message}</div>;
    if (isPending) return <div>loading...</div>;

    return (
        <div>
            <div className='my-8'>
                <SearchFilter />
            </div>
            <div className='flex gap-4 flex-wrap'>
                {data?.map((item, index) => (
                    <GigCard gig={item} key={index} />
                ))}
            </div>
        </div>
    );
};

export default Gigs;
