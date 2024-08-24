import EmployerProfile from '@/components/EmployerProfile'
import NewGigForm from '@/components/forms/NewGigForm'
import { Button } from '@/components/ui/button'
import { DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { getIndustries } from '@/lib/queries'
import { ArrowUpRight, BriefcaseBusiness, ChartColumnIncreasing, House } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const EmployerProfilePage = async () => {
    const industries = await getIndustries() as {
        id: number;
        name: string
    }[];
    

    return (
        <><EmployerProfile industries={industries} /></>

    )
}

export default EmployerProfilePage;