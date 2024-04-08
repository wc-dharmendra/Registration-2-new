import React from 'react'
function SkeletonMatrix() {
    return (
        <div className='w-full'>
            <div className="border rounded-lg shadow-md bg-white mb-5">
                <div className='p-5'>

                    <div className='md:flex justify-between max-md:pb-4'>
                        <div className='h-6 bg-slate-200 w-[45px] rounded-full'></div>
                        <div className='flex items-center gap-3'>
                            <div className='h-8 bg-slate-200 w-[60px] rounded-[6px]'></div>
                            <div className='h-8 bg-slate-200 w-[70px] rounded-[6px]'></div>
                            <div className='h-8 bg-slate-200 w-[30px] rounded-[6px]'></div>
                        </div>
                    </div>

                    <div className='pt-6 animate-pulse'>
                    <div className='flex items-center gap-3'>
                        <div className='h-3 bg-slate-200 w-[18%] rounded-full'></div>
                        <div className='h-3 bg-slate-200 w-[20px] rounded-full'></div>
                    </div>
                    <div className='pt-4 animate-pulse'>
                        <div className='h-2 bg-slate-200 rounded-full w-[30%]'></div>
                    </div>
                </div>

                <div className='pt-5 animate-pulse'>
                    <div className='flex justify-between gap-3'>
                        <div className='h-20 bg-slate-200 rounded-[8px] w-full'></div>
                        <div className='h-20 bg-slate-200 rounded-[8px] w-full'></div>
                    </div>
                </div>
               

                </div>
                
                    <div className="px-5 py-3  border-t-[1px] flex justify-between animate-pulse">
                        <div className='h-3 bg-slate-200 rounded-full w-[18%]'></div>
                        <div className='h-3 bg-slate-200 rounded-full w-[18%]'></div>
                    </div>
            </div>
        </div>
    )
}

export default SkeletonMatrix