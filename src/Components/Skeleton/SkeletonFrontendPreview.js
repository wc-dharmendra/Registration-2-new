import React from 'react'

function SkeletonFrontendPreview() {
  return (
    <div className="animate-pulse bg-slate-200 px-2 absolute top-0 left-0 w-full">
                  <div className="rounded-md bg-white p-1 mb-2">
                    <div className="bg-slate-200 rounded aspect-video mb-2"></div>
                    <div className="flex items-center justify-between">
                      <div className="bg-slate-200 rounded h-4 w-[30%]"></div>
                      <div className="bg-slate-200 rounded h-4 w-[20%]"></div>
                    </div>
                  </div>
                  <div className="rounded-md bg-white p-1">
                    <div className="flex items-center justify-between gap-2 mb-2">
                      <div className="bg-slate-200 rounded h-8 grow rounded-md"></div>
                      <div className="bg-slate-200 rounded h-8 grow rounded-md"></div>
                    </div>
                    <div className="flex justify-between gap-2 items-start">
                      <div className="w-[65%] grow rounded-md">
                        <div className="bg-slate-200 rounded h-[50px] w-[100%] rounded-md mb-2"> </div>
                        <div className="bg-slate-200 rounded h-[50px] w-[100%] rounded-md mb-2"> </div>
                        <div className="bg-slate-200 rounded h-[50px] w-[100%] rounded-md mb-2"> </div>
                      </div>
                      <div className="w-[35%] rounded grow rounded-md">
                        <div className="bg-slate-200 rounded h-[80px] w-[100%] rounded-md mb-2"> </div>
                        <div className="bg-slate-200 rounded h-[80px] w-[100%] rounded-md mb-2"> </div>
                      </div>
                    </div>
                  </div>

                </div>
  )
}

export default SkeletonFrontendPreview