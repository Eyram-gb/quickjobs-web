import Image from 'next/image'
import React from 'react'
import { Button } from '../ui/button'

const Hero = () => {
    return (
        <section className='px-12 py-10 h-[90vh]'>
            <div className='flex gap-x-6 justify-center items-center w-full h-full'>
                <div className='w-1/2'>
                    <h1 className='text-6xl font-bold'> The easiest way to <span>hire</span>         or get <span>hired</span> as a professional from anywhere.
                    </h1>
                    <div className='pt-6 flex gap-5'>
                        <Button className='bg-rose-500 font-semibold'>Find Your Next Opportunity</Button>
                        <Button variant='outline' className='bg-gray-100 font-semibold'>Start Hiring Professionals</Button>

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