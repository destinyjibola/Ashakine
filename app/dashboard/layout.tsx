import React from 'react'

const layout = ({children}:{children:React.ReactNode}) => {
  return (
    <div className='flex flex-col gap-y-4'>
       <nav className='bg-black text-white'>
        this is a navbar </nav> {children}</div>
  )
}

export default layout