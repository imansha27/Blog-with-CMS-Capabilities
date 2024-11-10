import Image from 'next/image'
import React from 'react'
import { images } from '../images/images.js';


export const Header = () => {
    return (
        <div className='py-5 px-2 md:px-12 lg:px-28 '>
            <div className='flex justify-between items-center'>
                {/* <Image src={images.logo} width={180} alt="logo" className='w-[130px] sm:w-auto'></Image> */}
                <div className="flex-grow"></div>
                <div className="flex space-x-10 text-rose-800 ml-auto">
          <span className="text-lg font-semibold cursor-pointer">Homepage</span>
          <span className="text-lg font-semibold cursor-pointer">Dashboard</span>
          <span className="text-lg font-semibold cursor-pointer">Profile</span>
        </div>
            </div>
        </div>
    )
}

