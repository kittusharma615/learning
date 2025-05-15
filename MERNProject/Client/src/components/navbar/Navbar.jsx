import React, { useState } from 'react';
import { FaBars } from "react-icons/fa";
import { IoCloseSharp } from "react-icons/io5";
import { Link } from 'react-router-dom';

export default function Navbar() {
  const [open, setOpen] = useState(false);

  const MENUDATA = [
    { link: '/men', name: 'Men' },
    { link: '/women', name: 'Women' },
    { link: '/kid', name: 'Kid' },
    { link: '/', name: 'Home' },
    { link: '/beauty', name: 'Beauty' },
  ];

  return (
    <header className="bg-amber-600 shadow-md sticky top-0 z-50">
      <nav className="flex items-center justify-between py-3 px-6 max-w-7xl mx-auto">
        
        {/* Logo */}
        <h1 className="text-white text-xl font-bold">
          <Link to="/">Logo</Link>
        </h1>

        {/* Desktop Menu */}
        <ul className="hidden md:flex gap-6 text-white font-medium">
          {MENUDATA.map(({ name, link }, index) => (
            <li key={index} className="hover:text-black transition">
              <Link to={link}>{name}</Link>
            </li>
          ))}
        </ul>

        {/* Buttons */}
        <div className="hidden md:flex gap-4">
          <Link to="/login" className="bg-white text-amber-600 font-semibold px-4 py-1 rounded hover:bg-amber-100 transition">
            Login
          </Link>
          <Link to="/signup" className="border border-white text-white px-4 py-1 rounded hover:bg-white hover:text-amber-600 transition">
            Signup
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setOpen(!open)} className="md:hidden text-white text-2xl focus:outline-none">
          {open ? <IoCloseSharp /> : <FaBars />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {open && (
        <div className="md:hidden bg-amber-500 text-white px-6 pb-4">
          <ul className="flex flex-col items-center gap-4 mt-2">
            {MENUDATA.map(({ name, link }, index) => (
              <li key={index}>
                <Link to={link} className="block py-1 border-b border-amber-200">{name}</Link>
              </li>
            ))}
          </ul>

          <div className="flex flex-col gap-3 mt-4">
            <Link to="/login" className="bg-white text-amber-600 font-semibold px-4 py-2 rounded text-center">
              Login
            </Link>
            <Link to="/signup" className="border border-white text-white px-4 py-2 rounded text-center">
              Signup
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
