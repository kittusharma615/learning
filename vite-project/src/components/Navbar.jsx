import React, { useState } from 'react'
import { FaBars } from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";

export default function Navbar() {

  const [open, setOpen] = useState(true)

  const MenuData = [
    { name: 'Home', linkl: '/' },
    { name: 'About', linkl: '/about' },
    { name: 'Contact', linkl: '/contact' },
    { name: 'FeedbAck', linkl: '/dasd' },
    { name: 'Message', linkl: '/dasd' },
  ]


  return (
    <div>

      <header>
        <nav className='bg-amber-800 text-white p-4 flex justify-between items-center'>
          <h1 className='font-bold'>Logo</h1>
          <ul className='hidden md:flex gap-5 font-bold' >
            {
              MenuData.map((item, key) => (
                <li key={key}> <a href="#">{item.name}</a></li>
              ))
            }
          </ul>

          <div className='hidden md:block'>
            <button className='p-4 font-bold'><a href="#">SignUp</a></button>
            <button className='font-bold'><a href="#">SignIn</a></button>
          </div>
          <div onClick={() => { setOpen(!open) }} className='md:hidden'>
            {
              open ? <FaBars /> : <AiOutlineClose />
            }
          </div>
          {
            open &&
            <div className='md:hidden absolute top-10 bg-gray-600 w-full'>
              <ul className='hidden md:flex gap-5 font-bold' >
                {
                  MenuData.map((item, key) => (
                    <li key={key}> <a href="#">{item.name}</a></li>
                  ))
                }
              </ul>
            </div>
          }

        </nav>
      </header>
    </div>
  )
}
