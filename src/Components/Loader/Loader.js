import React from 'react'

function Loader({
  theme = false
}) {
  return (
    <div className={`fixed flex justify-center items-center left-0 top-0 w-full h-full ${theme ? 'bg-black/50' : 'bg-white'} z-50`} style={{zIndex:999}}>
      <div className={`animate-spin w-12 h-12 rounded-full border-[3px] ${theme ? 'border-[#fff]/20 border-t-[#fff]' : 'border-[#000]/20 border-t-[#000]'}`}>

      </div>
    </div>
  )
}

export default Loader