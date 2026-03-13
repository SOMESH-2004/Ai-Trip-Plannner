import Link from 'next/link'
import React from 'react'

const menuOption = [
  { name: 'Home', path: '/' },
  { name: 'Pricing', path: '/pricing' },
  { name: 'Contact Us', path: '/contact-us' }
]

const Header = () => {
  return (
    <div className='fixed top-0 left-0 z-50 w-full bg-black px-3 py-1.5 text-white font-mono flex items-center justify-between'>
      <div className='flex gap-3 items-center'>
            <img  className='hover:scale-115 transition-all' src="/logo.svg " alt="logo" width={30} height={30} />
        <h2>TRIpy</h2>
      </div>

      <nav className='flex items-center gap-8 text-sm ' >
        {menuOption.map((menu) => (
          <Link className='hover:scale-105 transition-all' key={menu.path} href={menu.path}>
            <span>{menu.name}</span>
          </Link>
        ))}
      </nav>
      <div>
        <Link href={'/create-new-trip'}>
                 <button className='transition-transform active:scale-90 bg-amber-700 px-3 mr-3 py-1 rounded-full font-bold  text-gray-300   shadow-sm shadow-amber-300'>Create New Trip</button>
          </Link>
      </div>
    </div>
  )
}

export default Header
