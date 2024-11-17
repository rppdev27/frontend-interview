import React from 'react'
import Image from 'next/image'

const Hero = () => {
  return (
    <div className='flex justify-center align-middle items-center p-10 px-16
        dark:bg-dark-bg bg-white dark:text-white z-40 flex-row'
    style={{
        // fontFamily: 'Work Sans'
        // fontFamily: 'Manrope'
        fontFamily: 'Jost'
    }}
    >
        <div className='p-4 w-1/2 flex flex-col items-center justify-center'>
            
            <h1 
                className='text-9xl font-extrabold tracking-tight'
            >
                DEFLIX
            </h1>
            <div className="p-2 text-md tracking-wide">
                Empowering Everyone at Defi Universe
            </div>
        </div>
    </div>
  )
}

export default Hero