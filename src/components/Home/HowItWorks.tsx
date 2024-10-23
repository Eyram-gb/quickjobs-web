import { ArrowUpRight, BriefcaseBusiness, Handshake, UserRoundSearch  } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const HowItWorks = () => {
  const jobItems = [
    {
      title: 'Post a job',
      description: 'The trusted platform for hiring skilled workers and landing reliable jobs—anywhere, anytime.',
      icon: <BriefcaseBusiness size={30}/>,
    },
    {
        title: 'Apply for a job',
        description: 'Whether you’re looking for temporary or long-term work, opportunities are just a click away.',
        icon: <UserRoundSearch size={30}/>,
    },
    {
        title: 'Hire professional',
        description: 'Review applications, and hire the perfect candidate for the job.',
        icon: <Handshake size={30}/>,
    },
  ];

  return (
    <section className="w-full px-12 py-10 bg-gray-50 relative bg-[url('/chaos_1.svg')] bg-top bg-no-repeat">
        <img src="/gridlines.svg" alt="grid" className='absolute top-8 left-8 w-20' />
        <img src="/gridlines.svg" alt="grid" className='absolute -bottom-12 right-8 w-20' />
        <h4 className='text-center bg-purple-200 px-5 py-2 rounded-full w-fit text-sm font-medium mx-auto'>HOW IT WORKS</h4>
        <div className='mt-5'>
          <h2 className='text-center font-semibold text-4xl w-[60vw] mx-auto'>The simple path to creating and finding opportunities</h2>
<p className='text-sm text-gray-400 text-center'>The trusted platform for hiring skilled workers and landing reliable jobs—anywhere, anytime.</p>
        </div>
        <div className='flex justify-center gap-6 flex-wrap mt-32'>
            {jobItems.map((item, index) => (
                <div key={index} className='w-72 h-72 border bg-white hover:shadow-xl transition duration-300 rounded-xl p-4'>
                    <div className='w-20 h-20 rounded-full flex justify-center items-center bg-teal-100 -mt-14 mx-auto mb-8'>
                        {item.icon}
                    </div>
                    <div className='text-center space-y-6'>
                        <h4 className='text-2xl font-medium'>{item.title}</h4>
                        <p className='text-gray-400 text-sm'>{item.description}</p>
                        <Link href='/' className='text-green-400 w-fit mx-auto border-b border-green-400 flex gap-2'>Browse Jobs <ArrowUpRight/></Link>
                    </div>
                </div>
            ))}
        </div>
    </section>
  )
}

export default HowItWorks
