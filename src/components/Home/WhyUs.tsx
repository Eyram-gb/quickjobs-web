import React from 'react'
import Image from 'next/image'
import { Button } from '../ui/button'

const WhyUs = () => {
    return (
        <section className='px-16 py-20'>
            <div className='flex gap-8'>
                <div className="w-1/2 space-y-10 bg-[url('/chaos.svg')] bg-center bg-no-repeat">
                    <h4 className='text-center bg-purple-200 px-5 py-2 rounded-full w-fit text-sm font-medium'>WHY CHOOSE US</h4>
                    <div className='space-y-6'>
                        <h2 className='font-semibold text-4xl'>Your Go-To Platform for Reliable Jobs and Skilled Professionals
                        </h2>
                        <p className='text-sm text-gray-400'>We bridge the gap between job seekers and employers, ensuring quality connections in every hire. Whether you&apos;re looking to fill a position or land your next gig, our platform provides a seamless, efficient process backed by verified professionals and trusted employers. With tools to simplify every step, from posting to hiring, we make it easier to get the job done right—no matter where you are.</p>
                        <Button>Explore Opportunities</Button>
                    </div>
                </div>
                <div className='w-1/2 mt-10'>
                    <div className="w-full h-full relative bg-cover bg-center ">
                        <Image src='/community.svg' alt='hero' fill />
                    </div>
                    </div>

            </div>
        </section >
    )
}

export default WhyUs