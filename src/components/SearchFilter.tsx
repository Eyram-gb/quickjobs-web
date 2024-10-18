'use client'
import { useState } from "react"
import { Input } from '@/components/ui/input';
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { SlidersHorizontal } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useRouter } from 'next/navigation'; // Import useRouter to manipulate URL
import { DropdownMenuSeparator } from "@radix-ui/react-dropdown-menu";
import { Button } from '@/components/ui/button'; // Import your Button component

export function SearchFilter() {
    const router = useRouter(); // Initialize router
    const [searchInput, setSearchInput] = useState('');
    const [jobTypes, setJobTypes] = useState({
        fullTime: false,
        partTime: false,
        internship: false,
        projectWork: false,
        volunteering: false,
    });
    const [experienceLevel, setExperienceLevel] = useState({
        entry: false,
        intermediate: false,
        expert: false,
    });

    const updateURLParams = () => {
        const filters = {
            jobTypes: Object.keys(jobTypes).filter(key => jobTypes[key as keyof typeof jobTypes]),
            experienceLevels: Object.keys(experienceLevel).filter(key => experienceLevel[key as keyof typeof experienceLevel]),
            searchInput
        };

        // Update URL parameters
        const queryParams = new URLSearchParams();
        if (filters.searchInput) queryParams.append('searchInput', filters.searchInput);
        filters.jobTypes.forEach(type => queryParams.append('jobTypes', type));
        filters.experienceLevels.forEach(level => queryParams.append('experienceLevels', level));

        router.push(`/gigs?${queryParams.toString()}`); // Update the URL with new parameters
        console.log("Updating filters in URL:", filters);
    };

    const handleJobTypeChange = (type: keyof typeof jobTypes) => {
        setJobTypes(prev => ({ ...prev, [type]: !prev[type] }));
    };

    const handleExperienceLevelChange = (level: keyof typeof experienceLevel) => {
        setExperienceLevel(prev => ({ ...prev, [level]: !prev[level] }));
    };

    const handleApplyFilters = () => {
        updateURLParams(); // Call the function to update URL when the button is clicked
    };

    return (
        <div className='flex gap-5 items-center justify-center'>
            <div className='max-w-xl relative flex-1'>
                <Input
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)} // Update search input
                    className='rounded-full py-4'
                />
            </div>
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
                    </div>
                </DropdownMenuContent>
            </DropdownMenu>
            <Button onClick={handleApplyFilters}>Apply</Button> {/* Add Apply button */}
        </div>
    )
}
