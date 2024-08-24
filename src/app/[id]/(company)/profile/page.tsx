import { Button } from '@/components/ui/button'
import { ArrowUpRight, BriefcaseBusiness, ChartColumnIncreasing, House } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

const EmployerProfile = () => {
    return (
        <div className='grid grid-cols-5'>
            <aside className='col-span-1 pt-24 px-4'>
                <div className='flex flex-col'>
                    <button className='flex items-center gap-x-4 bg-gray-100 rounded-lg py-2.5 px-2'>
                        <House />
                        <span className='text-sm'>Home</span>
                    </button>
                    <button className='flex items-center gap-x-4 py-2.5 px-2'>
                        <BriefcaseBusiness />
                        <span>Gigs</span>
                    </button>
                    <button className='flex items-center gap-x-4 py-2.5 px-2'>
                        <ChartColumnIncreasing />
                        <span>Dashboard</span>
                    </button>
                </div>
            </aside>
            <div className='col-start-2 col-span-full'>
                {/* BANNER AND PROFILE IMAGES */}
                <div className='relative h-56 bg-sky-50'>
                </div>
                <div className='px-8 mt-4 flex justify-between'>
                    <div className='flex gap-x-6'>
                        <div className='bg-teal-100 h-28 w-28 border-4 border-white rounded-full -mt-12 relative z-10 overflow-hidden'>
                            <Image alt='logo' src='https://images.unsplash.com/photo-1675348005313-bf4b58d8de68?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D' fill className='object-cover' />
                        </div>
                        <div>
                            <h2 className='text-2xl font-bold'>Barleys and Teals Inc.</h2>
                        </div>
                    </div>
                    <div>
                        <Button type='button'>
                            Post a gig
                        </Button>
                    </div>
                </div>
                {/* <hr className='mx-8 my-6' /> */}
                <div className='grid grid-cols-6 px-8 gap-4 mt-6'>
                    <div className='col-span-4 border-r'>
                        <h2 className='font-semibold'>Bio</h2>
                        <p className='text-sm'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Inventore dolorem dicta fuga, ducimus beatae sapiente nisi ad rerum nam quaerat eum esse in, temporibus magni placeat odio numquam, debitis modi veritatis quasi. Repudiandae voluptates aut sed totam. Aliquam mollitia, eos delectus sed corrupti sunt hic distinctio asperiores nemo eligendi! Blanditiis fuga temporibus obcaecati doloribus, quam doloremque consequatur quasi placeat natus maxime nam nisi explicabo eveniet qui nesciunt. Itaque beatae facere eveniet, soluta fugit mollitia porro?
                        </p>
                    </div>
                    <div className='flex flex-wrap justify-between col-start-5 col-span-full max-h-28'>
                        <div className=''>
                            <h3 className='text-sm text-gray-500 font-semibold'>Website</h3>
                            <div className='flex items-center'>
                                <a href="https://google.com" rel='noreferrer' target='_blank' className='hover:border-b text-sm'>barleysandtarleys.com</a>
                                <ArrowUpRight />
                            </div>
                        </div>
                        <div className=''>
                            <h3 className='text-sm text-gray-500 font-semibold'>Location</h3>
                            <div className='text-sm'>Sydney, AU</div>
                        </div>
                        <div className='w-1/2'>
                            <div>
                                <h3 className='text-sm text-gray-500 font-semibold'>Email</h3>
                                <div className='flex gap-x-2 items-center'>
                                    <a href="mailto:hello@gmail.com" rel='noreferrer' target='_blank' className='hover:border-b text-sm'>hello@gmail.com</a>
                                    <ArrowUpRight />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployerProfile