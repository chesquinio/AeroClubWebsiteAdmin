import Link from 'next/link'
import React from 'react'

function ResponsiveNav() {
  return (
    <div>
        <nav className='flex flex-col items-center bg-blue-300 h-screen w-screen'>
            <Link className='text-xl font-medium py-5 text-gray-600 hover:text-gray-800' href={'/noticias'}>Noticias</Link>
            <Link className='text-xl font-medium py-5 text-gray-600 hover:text-gray-800' href={'/usuarios'}>Usuarios</Link>
            <Link className='text-xl font-medium py-5 text-gray-600 hover:text-gray-800' href={'/tenis'}>Tenis</Link>
            <Link className='text-xl font-medium py-5 text-gray-600 hover:text-gray-800' href={'/aeroclub'}>AeroClub</Link>
            <Link className='text-xl font-medium py-5 text-gray-600 hover:text-gray-800' href={'/camping'}>Camping</Link>
        </nav>
    </div>
  )
}

export default ResponsiveNav