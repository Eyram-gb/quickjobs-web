import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'
import { ShinyButton, ShimmerButton } from '../ui/StyledButton'

const Hero = () => {
    return (
        <section className='px-12 py-10 h-[90vh]'>
            <div className='flex gap-x-6 justify-center items-center w-full h-full'>
                <div className='w-1/2'>
                    <h1 className='text-6xl font-bold'> The easiest way to <span className='text-amber-500'>hire</span>         or  <span className='text-teal-900'>get hired</span> as a professional from anywhere.
                    </h1>
                    <div className='pt-6 flex gap-5'>
                        <ShinyButton  className='rounded-full text-black py-5 text-base font-bold'>Start Hiring Professionals</ShinyButton>
                        <ShimmerButton className='bg-rose-500 font-semibold'>Find Your Next Opportunity</ShimmerButton>

                    </div>
                </div>
                <div className="w-1/2 h-full relative bg-[url('/lines.svg')] bg-cover bg-center ">
                    <Image src='/hero.svg' alt='hero' fill />
                </div>
            </div>
        </section>
    )
}

export default Hero