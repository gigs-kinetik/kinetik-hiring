import React from 'react'
import { accent, background } from '../util/colors'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const HeaderLinks = () => {
    return (
        <div className='flex flex-row justify-around items-center gap-[80px] px-[30px]'>
            <Link href='/companies/login' className='text-white text-3xl'>login</Link>
            <Link href='/companies/signup' className='text-white text-3xl'>signup</Link>
        </div>
    )
}

export default function Header() {
    const router = useRouter();
    return (
        <div style={{ backgroundColor: background, zIndex: 10000 }}>
            <div 
                style={{ 
                    backgroundColor: background,
                    boxShadow: `-10px 0px 500px -5px ${accent}`,
                    borderBottomLeftRadius: 30,
                    borderBottomRightRadius: 30,
                }} 
                className=' flex justify-between px-[30px] py-[30px]'>

                <img className='h-[70px] px-[20px] invert hover:cursor-pointer' src="/logo.png" onClick={e => router.push('/')} />

                <HeaderLinks />
            </div>
        </div>
    )
}
