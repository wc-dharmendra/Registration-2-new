import React from 'react'

function UploadLoader() {
  return (
    <div className='absolute flex justify-center items-center left-0 top-0 w-full h-full bg-black/50 z-10 rounded-lg'>
        <div className='animate-spin w-12 h-12 rounded-full border-[3px] border-[#fff]/20 border-t-[#fff]'>

        </div>
    </div>
  )
}

export default UploadLoader