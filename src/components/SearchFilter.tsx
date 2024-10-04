'use client'
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from '@/components/ui/input';
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
import { motion } from 'framer-motion';
import { useSearchParams } from 'next/navigation'



export function SearchFilter() {
    const [searchInput, setSearchInput] = useState('');
    const [jobTypes, setJobTypes] = useState({
        fullTime: false,
        partTime: false,
        internship: false,
        projectWork: false,
        volunteering: false,
    })
    const [experienceLevel, setExperienceLevel] = useState({
        entry: false,
        intermediate: false,
        expert: false,
    })
    const [animateButton, setAnimateButton] = useState(false); // State for animation
    const searchParams = useSearchParams()

    const search = searchParams.get('search')
    const handleJobTypeChange = (type: keyof typeof jobTypes) => {
        setJobTypes(prev => ({ ...prev, [type]: !prev[type] }))
    }

    const handleExperienceLevelChange = (level: keyof typeof experienceLevel) => {
        setExperienceLevel(prev => ({ ...prev, [level]: !prev[level] }))
    }

    const handleApplyFilters = () => {
        // const selectedJobTypes = Object.entries(jobTypes)
        //     .filter(([_, checked]) => checked)
        //     .map(([key]) => key)
        //     .join(',');

        // const selectedExperienceLevels = Object.entries(experienceLevel)
        //     .filter(([_, checked]) => checked)
        //     .map(([key]) => key)
        //     .join(',');

        // const params = new URLSearchParams();
        // if (selectedJobTypes) params.set('jobTypes', selectedJobTypes);
        // if (selectedExperienceLevels) params.set('experienceLevels', selectedExperienceLevels);
        // if (searchInput) params.set('search', searchInput);

        // Update the URL with the new search parameters
        // window.history.pushState({}, '', `?${params.toString()}`);

        console.log("Applying filters:", { jobTypes, experienceLevel });
    }

    const handleInputClick = () => {
        setAnimateButton(true); // Trigger animation on input click
    }

    return (
        <div className='flex gap-5 items-center justify-center'>
            <div className='max-w-xl relative flex-1'>
                <Input
                    value={searchInput}
                    onChange={((e) => setSearchInput(e.target.value))}
                    onClick={handleInputClick} // Add click handler
                    className='rounded-full py-4'
                />
                <motion.button
                    className='absolute right-1 rounded-full bg-teal-500 h-8 px-4 text-white text-sm font-semibold top-0 bottom-0 my-auto'
                    initial={{ x: -100, opacity: 0 }} // Start position and opacity
                    animate={{ x: animateButton ? 0 : -100, opacity: animateButton ? 1 : 0 }} // Animate position and opacity
                    transition={{ type: 'spring', stiffness: 300 }} // Animation properties
                >
                    Search
                </motion.button>
                {/* <Search className='absolute top-2.5 right-3' size={18} /> */}
            </div>
            Search: {search}
            <DropdownMenu>
                <DropdownMenuTrigger className='py-2 px-4 rounded-md border flex gap-2 items-center font-medium text-sm'>Filter <SlidersHorizontal size={16} /></DropdownMenuTrigger>
                <DropdownMenuContent className="w-[300px] p-4">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <Label className="font-semibold">Job Type</Label>
                            {Object.entries(jobTypes).map(([key, checked]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={key}
                                        checked={checked}
                                        onCheckedChange={() => handleJobTypeChange(key as keyof typeof jobTypes)}
                                    />
                                    <Label htmlFor={key} className="text-sm capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <DropdownMenuSeparator />
                        <div className="space-y-2">
                            <Label className="font-semibold">Experience Level</Label>
                            {Object.entries(experienceLevel).map(([key, checked]) => (
                                <div key={key} className="flex items-center space-x-2">
                                    <Checkbox
                                        id={key}
                                        checked={checked}
                                        onCheckedChange={() => handleExperienceLevelChange(key as keyof typeof experienceLevel)}
                                    />
                                    <Label htmlFor={key} className="text-sm capitalize flex-1">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </Label>
                                </div>
                            ))}
                        </div>
                        <Button className="w-full" onClick={handleApplyFilters}>
                            Apply Filters
                        </Button>
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}