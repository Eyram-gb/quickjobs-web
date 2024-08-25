import Gig from '@/components/Gig';
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb';
import { getGigById } from '@/lib/queries';
import React from 'react';

const GigDetails = async ({
    params: { id },
}: {
    params: { id: string };
}) => {
    const gig = await getGigById(id)
    if (!gig) return <h1>Gig Not found</h1>
    return (
        <div className='p-24'>
            <BreadcrumbNavigation />
            <div className=''>
                <h1 className='text-center text-5xl font-bold'>Gig Details</h1>
                <div className='space-y-5'>
                    <h2 className='text-2xl font-semibold'>Real Estate Broker</h2>
                    <div>
                        <h2 className='text-lg font-semibold'>Description</h2>
                        <p className='text-sm'>
                            Lorem ipsum dolor, sit amet consectetur adipisicing elit. Doloribus velit deleniti magnam? Vero necessitatibus enim iusto sunt qui. Sequi culpa hic, aliquam, perspiciatis a dolores odit earum amet itaque unde molestiae ullam quos minus voluptatum! Tenetur recusandae sunt amet voluptates fuga incidunt quae commodi sit praesentium labore. Neque esse eligendi aliquid corporis similique eum quae suscipit numquam. Impedit ullam, reiciendis rem ab voluptatum velit, et ea iste veniam vitae soluta quae minus, recusandae id?

                            Nam quaerat architecto, beatae laboriosam rerum consequatur quo nihil aliquid placeat nesciunt! Suscipit consequuntur reprehenderit voluptatum at tenetur illo ex ab voluptatem ratione optio voluptas excepturi, consequatur consectetur libero molestias inventore. Perspiciatis molestiae fuga distinctio labore voluptatum incidunt dolor ad doloremque reiciendis veniam repudiandae quaerat autem, libero minima ab quae consequuntur placeat! Adipisci voluptate beatae corrupti ratione distinctio dicta quibusdam, iure nihil, illum soluta ea autem fugiat saepe incidunt at magnam alias aut consectetur porro quo.
                        </p>
                    </div>
                    <div>
                        <h2 className='text-lg font-semibold'>Requirements</h2>
                        <p className='text-sm'>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestias odio nulla expedita ullam deserunt sequi.
                            <br />
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Possimus, dolores!
                        </p>
                    </div>
                    <div>
                        <h2 className='text-lg font-semibold'>Tags</h2>
                        <div>
                            <div className='flex gap-2 flex-wrap mt-1.5'>
                                <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>Remote</p>
                                <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>In-Person</p>
                                <p className='text-xs bg-gray-200 px-2 py-1 rounded-md w-max font-semibold'>Flexible Schedule</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className='mt-10 space-y-3'>
                    <h2 className='text-3xl font-bold'>Related Gigs</h2>
                    <div className='flex gap-5 flex-wrap'>
                        <Gig gig={gig} />
                        <Gig gig={gig} />
                        <Gig gig={gig} />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GigDetails

export function BreadcrumbNavigation() {
    return (
        <Breadcrumb>
            <BreadcrumbList className='text-xs'>
                <BreadcrumbItem>
                    <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbLink href="/gigs">Gigs</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator />
                <BreadcrumbItem>
                    <BreadcrumbPage className='font-semibold'>Gig Details</BreadcrumbPage>
                </BreadcrumbItem>
            </BreadcrumbList>
        </Breadcrumb>
    )
}