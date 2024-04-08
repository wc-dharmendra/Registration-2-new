import React from 'react'
function SkeletonBadge() {
    return (
        <div className='w-full'>
            <div className='border border-[#D9E2E5]  px-4 py-5 rounded-[8px] mb-4'>
                <div className='flex justify-between mb-2 animate-pulse'>
                    <div className="h-4 bg-slate-200 w-[35%] rounded-full mb-4"></div>
                    <div className="h-2 bg-slate-200 w-[20px] rounded-full dark:bg-gray-600"></div>
                </div>
                <div className='flex justify-between gap-5 animate-pulse'>
                    <div className="h-[30px] bg-slate-200 rounded-full  w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full  w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full  w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full  w-full"></div>
                </div>
            </div>
            <div className='border border-[#D9E2E5] px-4 py-5 rounded-[8px] mb-4'>
                <div className='flex justify-between mb-2 animate-pulse'>
                    <div className="h-4 bg-gray-200 w-[35%] rounded-full dark:bg-gray-700 mb-4"></div>
                    <div className="h-2 bg-gray-200 w-[20px] rounded-full dark:bg-gray-600"></div>
                </div>
                <div className='flex justify-between gap-5 animate-pulse'>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
            </div>
            <div className='border border-[#D9E2E5] px-4 py-5 rounded-[8px] mb-4'>
                <div className='flex justify-between mb-2 animate-pulse'>
                    <div className="h-4 bg-gray-200 w-[35%] rounded-full dark:bg-gray-700 mb-4"></div>
                    <div className="h-2 bg-gray-200 w-[20px] rounded-full dark:bg-gray-600"></div>
                </div>
                <div className='flex justify-between gap-5 animate-pulse'>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
            </div>
            <div className='border border-[#D9E2E5] px-4 py-5 rounded-[8px] mb-4'>
                <div className='flex justify-between mb-2 animate-pulse'>
                    <div className="h-4 bg-gray-200 w-[35%] rounded-full dark:bg-gray-700 mb-4"></div>
                    <div className="h-2 bg-gray-200 w-[20px] rounded-full dark:bg-gray-600"></div>
                </div>
                <div className='flex justify-between gap-5 animate-pulse'>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                    <div className="h-[30px] bg-slate-200 rounded-full dark:bg-gray-600 w-full"></div>
                </div>
            </div>
        </div>
    )
}

export default SkeletonBadge