import React from 'react'

export const GigLoadingComponent = () => {
  return (
    <>
        <div className='flex gap-4'>
<div className='w-72 h-60 bg-white animate-pulse rounded-lg overflow-hidden p-5 border'>
    <div className='flex items-center gap-2'>
<div className='h-12 w-12 rounded-full bg-gray-200 animate-pulse'></div>
<div className='py-2 w-12 bg-slate-200 animate-pulse rounded-full'></div>
    </div>
    <div className='space-y-2 pt-4'>
<div className='py-2 w-20 bg-slate-200 animate-pulse rounded-full'></div>
<div className='py-1 w-16 bg-slate-200 animate-pulse rounded-full'></div>
<div className='py-1.5 w-full bg-slate-200 animate-pulse rounded-full'></div>
<div className='py-1 w-16 bg-slate-200 animate-pulse rounded-full'></div>

    </div>
</div>
</div> 
    </>
  )
}