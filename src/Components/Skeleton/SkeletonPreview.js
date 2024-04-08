import React from 'react'
function SkeletonPreview() {
    return (
        <div className='w-full'>
            <div className="flex justify-between animate-pulse mb-3">
                <div className="h-4 bg-slate-200 w-[30%] rounded-full"></div>
                <div className="h-4 bg-slate-200 w-[18%] rounded-full"></div>
            </div>
            <div className="flex justify-between mb-2 animate-pulse">
                <div className="h-4 bg-slate-200 w-[45%] rounded-full mb-4"></div>
            </div>

            <div className="border-b-[1px] pb-5  animate-pulse">
                <div className='flex items-center gap-2 justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                        <div className='flex gap-2 items-center font-semibold text-[#131517] break-all'>
                            <div className="h-4 bg-slate-200 w-[30px] rounded-full"></div>
                        </div>
                        <div className='text-[13px] text-[#969498] rounded-full px-2 py-0.5'>
                            <div className="h-4 bg-slate-200 w-[100px] rounded-full"></div>
                        </div>
                        <div className="h-6 bg-slate-200 w-[100px] rounded-full"></div>
                    </div>
                </div>

                <div className='flex items-center gap-2 justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                        <div className='flex gap-2 items-center font-semibold text-[#131517] break-all'>
                            <div className="h-4 bg-slate-200 w-[30px] rounded-full"></div>
                        </div>
                        <div className='text-[13px] text-[#969498] rounded-full px-2 py-0.5'>
                            <div className="h-4 bg-slate-200 w-[100px] rounded-full"></div>
                        </div>
                        <div className="h-6 bg-slate-200 w-[100px] rounded-full"></div>
                    </div>
                </div>

                <div className='flex items-center gap-2 justify-between mb-4'>
                    <div className='flex items-center gap-2'>
                        <div className='flex gap-2 items-center font-semibold text-[#131517] break-all'>
                            <div className="h-4 bg-slate-200 w-[30px] rounded-full"></div>
                        </div>
                        <div className='text-[13px] text-[#969498] rounded-full px-2 py-0.5'>
                            <div className="h-4 bg-slate-200 w-[100px] rounded-full"></div>
                        </div>
                        <div className="h-6 bg-slate-200 w-[100px] rounded-full"></div>
                    </div>

                </div>
            </div>

            <div className='pt-6 animate-pulse'>
                <div className='flex flex-col gap-2'>
                    <div className='h-4 bg-slate-200 w-[18%] rounded-full'></div>
                    <div className='h-3 bg-slate-200 w-[30%] rounded-full'></div>
                </div>
                <div className='bg-[#FFFFFF] border border-[#D9E2E5] px-4 py-4 rounded-lg mt-5'>
                    <div className='flex gap-2 p-1.5 items-center'>
                        <div className='h-4 bg-slate-200 w-[25px] rounded-sm pr-1'></div>
                        <div className='h-10 bg-slate-200 w-[18%] rounded-[8px] grow'></div>
                        <div className='h-4 bg-slate-200 w-[25px] flex gap-4 items-center justify-end rounded-full'></div>
                    </div>
                    <div className='flex gap-2 p-1.5 items-center'>
                        <div className='h-4 bg-slate-200 w-[25px] rounded-sm pr-1'></div>
                        <div className='h-10 bg-slate-200 w-[18%] rounded-[8px] grow'></div>
                        <div className='h-4 bg-slate-200 w-[25px] flex gap-4 items-center justify-end rounded-full'></div>
                    </div>
                    <div className='flex gap-2 p-1.5 items-center'>
                        <div className='h-4 bg-slate-200 w-[25px] rounded-sm pr-1'></div>
                        <div className='h-10 bg-slate-200 w-[18%] rounded-[8px] grow'></div>
                        <div className='h-4 bg-slate-200 w-[25px] flex gap-4 items-center justify-end rounded-full'></div>
                    </div>
                </div>
            </div>

            <div className='pt-8 pb-6 border-b-[1px]'>
                <div className='h-10 bg-slate-200 w-[18%] rounded-[8px] grow'></div>
            </div>

            <div className='pb-5 pt-6 animate-pulse'>
            <div className='flex flex-col gap-3'>
                    <div className='h-4 bg-slate-200 w-[18%] rounded-full'></div>
                    <div className='h-3 bg-slate-200 w-[30%] rounded-full'></div>
                </div>
            </div>

        </div>
    )
}

export default SkeletonPreview