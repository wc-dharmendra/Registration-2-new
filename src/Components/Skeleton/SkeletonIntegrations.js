import React from 'react'
function SkeletonIntegrations() {
    return (
        <div className='w-full'>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mt-5 mb-8">
          <div className='flex justify-between gap-2 items-center border rounded-md py-4 px-5 animate-pulse'>
                <div className="h-4 bg-slate-200 w-[35%] rounded-full"></div>
                <div className="h-3 bg-slate-200 w-[20px] rounded-full dark:bg-gray-600"></div>
            </div>
            <div className='flex justify-between gap-2 items-center border rounded-md py-4 px-5 animate-pulse'>
                <div className="h-4 bg-slate-200 w-[35%] rounded-full"></div>
                <div className="h-3 bg-slate-200 w-[20px] rounded-full dark:bg-gray-600"></div>
            </div>
        </div>
        </div>
    )
}

export default SkeletonIntegrations