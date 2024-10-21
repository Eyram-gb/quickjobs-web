import React from 'react'

const GigsLoadingComponent = () => {
  return (
    <div>
        <div className='flex gap-6 flex-wrap'>
<GigCardLoading/>
<GigCardLoading/>
<GigCardLoading/>
<GigCardLoading/>
<GigCardLoading/>
<GigCardLoading/>
<GigCardLoading/>
        </div>
    </div>
  )
}

export default GigsLoadingComponent

const GigCardLoading = () => {
    return (
        <div className='w-72 rounded-lg border p-4 h-60 flex flex-col animate-pulse'>
            <div className='flex gap-1.5 items-center'>
                <div className='relative h-10 w-10 bg-gray-300 rounded-full' />
                <div className='flex flex-col flex-1'>
                    <div className='h-3 bg-gray-100 rounded-full w-3/4 mb-1' />
                    <div className='flex gap-0.5 items-center'>
                        <div className='h-2 bg-gray-100 rounded-full w-1/2' />
                        {/* <p className='font-bold'>&#183;</p> */}
                        <div className='h-2 bg-gray-200 rounded w-1/4' />
                    </div>
                </div>
            </div>
            <div className='flex gap-2 flex-wrap mt-3'>
                <div className='bg-gray-200 text-xs w-fit p-1 rounded-full' />
                <div className='bg-gray-200 text-xs w-fit p-1 rounded-full' />
                <div className='bg-gray-200 text-xs w-fit p-1 rounded-full' />
            </div>
            <div className='mt-3'>
                <div className='h-2 bg-gray-100 rounded-full w-full mb-1' />
                <div className='h-2 bg-gray-100 rounded-full w-full mb-1' />
                <div className='h-2 bg-gray-200 rounded-full w-3/4 mb-1' />
                <div className='h-2 bg-gray-200 rounded-full w-1/2' />
            </div>
            <div className='flex justify-between items-end mt-auto border-t pt-1.5'>
                <div className='h-3 bg-gray-100 rounded-full w-1/4' />
                <div className='h-8 bg-gray-200 rounded-md w-1/4' />
            </div>
        </div>
    )
}