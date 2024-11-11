import Image from 'next/image'
import React from 'react'
import { images } from '../app/images/images.js';
import Link from 'next/link';


export const Header = () => {
    return (
        <div className='py-5 px-2 md:px-12 lg:px-28 '>
            <div className='flex justify-between items-center'>
                {/* <Image src={images.logo} width={180} alt="logo" className='w-[130px] sm:w-auto'></Image> */}
                <div className="flex-grow"></div>
                <div className="flex space-x-10 text-rose-800 ml-auto">
                <Link href="./dashboard">
                <span className="text-lg font-semibold cursor-pointer">BLOG</span>
                </Link>
          <span className="text-lg font-semibold cursor-pointer">DASHBOARD</span>
          <span className="text-lg font-semibold cursor-pointer">ABOUT</span>
        </div>
            </div>
        </div>
    )
}

