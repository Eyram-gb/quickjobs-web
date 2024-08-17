import React from 'react'

const NavBar = () => {
  return (
    <nav className='flex justify-between px-12 py-4'>
        <h2 className='text-4xl font-bold'>Quickjobs</h2>
        <ul className='flex gap-x-4 items-center'>
          <li>Home</li>
          <li>About</li>
          <li>Services</li>
          <li>Contact</li>
        </ul>
  
    </nav>
  )
}

export default NavBar