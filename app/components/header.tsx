'use client'

import React, { useState } from 'react'
import { useTheme } from '@/app/providers/ThemeProviders'
import { Sun, Moon, GalleryHorizontal, EllipsisVertical } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  
  const [isDark, setDark] = useState(false);
  const [isMenuHeader, setToggleMenuHeader] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const menuHeader = [
    {
        name: 'Home',
        path: '/',
    },
    {
        name: 'About',
        path: '',
    },
    {
        name: 'Service',
        path: '',
    },
  ]

  return (
    <div
        className='flex flex-row p-4 px-16 w-full justify-between items-center
        dark:bg-dark-bg dark:text-white 
        relative bg-white z-50'
        style={{
            fontFamily: 'Jost'
        }}
    >
        <div className='w-auto flex flex-row space-x-2 items-center'>
            <GalleryHorizontal size={20} className='dark:text-[#c3e647] text-slate-900'/>
            <div className='font-extrabold dark:text-[#c3e647] text-slate-900'>BITLIX</div>
        </div>
        <div className='flex flex-row'>
            <div className="flex flex-row">
                {/* <ul className='sm:inline space-x-6 transition-all duration-200 hidden text-sm tracking-tight'>
                    <li className='hover:underline inline-block'>
                        <Link href='/'>
                            Home
                        </Link>
                    </li>
                    <li className='hover:underline inline-block'>
                        <Link href='/'>
                            About
                        </Link>
                    </li>
                    <li className='hover:underline inline-block'>
                        <Link href='/'>
                            Service
                        </Link>
                    </li>
                </ul> */}
            </div>
            <div className="bg-transparent flex items-center justify-center">
                <div className="flex flex-row justify-center items-center pl-4">
                    <div 
                        className='cursor-pointer'
                        onClick={toggleTheme}
                    >
                        {
                            theme === 'light' ? <>
                                <Sun size={13} 
                                    // onClick={() => setDark(!isDark)} 
                                    className='transition-all duration-500'
                                />
                            </> : <>
                                <Moon size={13} 
                                    // onClick={() => setDark(!isDark)}
                                    className='transition-all duration-500'
                                />
                            </>
                        }
                    </div>

                </div>  

                <div className="relative flex items-center">

                    <div 
                        className='sm:hidden inline-block ml-3'
                        onClick={()=> setToggleMenuHeader(!isMenuHeader)}
                    >
                        <EllipsisVertical size={15} className='cursor-pointer'/>
                    </div>   

                    {
                        isMenuHeader && <div className='text-sm sm:text-base py-4 px-6 rounded-md 
                            shadow-lg absolute top-5 right-0 transition-all duration-700
                          dark:bg-dark-bg bg-white space-y-2 flex flex-col
                        '>
                            {
                                menuHeader.map((menu: any)=><>
                                    <Link href={menu.path} className='cursor-pointer hover:underline transition-all duration-500'>
                                        {menu.name}
                                    </Link>
                                </>)
                            }
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
  )
}

export default Header