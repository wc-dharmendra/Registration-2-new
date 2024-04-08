import React from 'react'
import Svg from '../../../public/Assets/Svg'

function ToolTip({ children = '', title = '', icon = false, placement='top' }) {
  return (
    <div className="tooltip relative  inline-block cursor-pointer">
      {icon ? Svg().InfoIcon : null}
      {title ? title : null}
      {children ? <span className={`tooltip-text invisible border p-2 rounded-lg absolute z-10 ${(placement == 'top') ? 'bottom-[125%]':'top-[125%]'} left-[50%] ml-[-50%] opacity-0 transition bg-white shadow-md`}>{children}</span> : null}
    </div>
  )
}

export default ToolTip