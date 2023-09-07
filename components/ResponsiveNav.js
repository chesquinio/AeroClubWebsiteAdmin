import Link from 'next/link'
import React from 'react'

function ResponsiveNav() {
  return (
    <div>
        <nav className='flex flex-col items-center bg-peimary w-screen'>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/'}>Inicio</Link>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/noticias'}>Noticias</Link>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/tenis'}>Tenis</Link>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/aeroclub'}>AeroClub</Link>
            <Link className='text-xl font-medium py-5 text-white hover:text-gray-200 transition' href={'/colonia'}>Colonia</Link>
        </nav>
    </div>
  )
}

export default ResponsiveNav