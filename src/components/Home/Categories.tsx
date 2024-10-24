import React from 'react'
import { BriefcaseBusiness, Clapperboard, GraduationCap, HandCoins, Hospital, Landmark, Leaf, Megaphone } from 'lucide-react'
import { getIndustryGigsCount } from '@/lib/queries'
import Link from 'next/link';


function getIndustryIcon(industry_name: string) {
    switch (industry_name) {
        case 'Marketing and Communications':
            return <Megaphone size='26' strokeWidth={1.5} className='text-teal-800' />;
        case 'Banking and Finance':
            return <HandCoins size='26' strokeWidth={1.5} className='text-teal-800' />;
        case 'Healthcare and Life Sciences':
            return <Hospital size='26' strokeWidth={1.5} className='text-teal-800' />;
        case 'Education and Research':
            return <GraduationCap size='26' strokeWidth={1.5} className='text-teal-800' />;
        case 'Entertainment and Media':
            return <Clapperboard size='26' strokeWidth={1.5} className='text-teal-800' />;
        case 'Environment and Sustainability':
            return <Hospital />;
        case 'Government and Non-Profit':
            return <Landmark size='26' strokeWidth={1.5} className='text-teal-800' />;
        case 'Professional Services':
            return <BriefcaseBusiness size='26' strokeWidth={1.5} className='text-teal-800' />;
        default:
            return <Leaf size='26' strokeWidth={1.5} className='text-teal-800' />;
    }

}

const Categories = async () => {
    const data = await getIndustryGigsCount();

    return (
        <section className='px-16 py-20 bg-gray-50 h-screen'>
            <h4 className='text-center bg-purple-200 px-5 py-2 rounded-full w-fit text-sm font-medium mx-auto'>CATEGORIES</h4>

            <div className="bg-[url('/chaos_1.svg')] bg-no-repeat bg-center space-y-10 h-full">
                <h2 className='font-semibold text-4xl text-center pt-8'>Browse by categories</h2>
                <div className='flex gap-6 flex-wrap justify-center'>
                    {data?.map((item, idx) =>
                        <Link href={`/gigs?industryId=${item.industry_id}`} key={idx} className='flex gap-3 items-center px-4 flex-col justify-cemter w-80 border py-5 rounded-lg bg-white/10 backdrop-blur-sm'>
                            {/* ICON */}
                            {getIndustryIcon(item.industry_name)}
                            <div>
                                <p className='font-semibold text-lg leading-none text-center'>{item.industry_name}</p>
                                <p className='text-sm text-green-500 font-medium text-center'>{item.gig_count} job{Number(item.gig_count) <= 1 ? '' : 's'} available</p>
                            </div>
                        </Link>
                    )
                    }
                </div>
            </div>
        </section>
    )
}

export default Categories