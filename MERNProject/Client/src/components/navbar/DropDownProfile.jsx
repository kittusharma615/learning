import React from 'react'
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/react'
import { IoPerson, IoSettings } from "react-icons/io5";
import { RiLogoutBoxRFill } from "react-icons/ri";
import {useAuth} from '../context/auth_context'
import { Link } from 'react-router-dom';

const UserDropdownMenu = () => {

    const {setIsLoggedIn,userData} =useAuth();
const data = userData.profileImg.secure_url

    const menuItems = [
        { icon: <IoPerson className="text-gray-600" size={18} />, name: "Your Profile", link: '/profile' },
        { icon: <IoSettings className="text-gray-600" size={18} />, name: "Settings", link: '/setting' },
        { icon: <RiLogoutBoxRFill className="text-blue-500" size={18} />, name: "Log out",onclick:()=>{setIsLoggedIn(false)} },
    ]

    return (
        <Menu as="div" className="relative">
            <MenuButton 
                className="flex rounded-full focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
                aria-label="User menu"
            >
                <span className="sr-only">Open user menu</span>
                <img
                    alt="User profile"
                    src={data}
                    className="h-8 w-8 rounded-full"
                    width={32}
                    height={32}
                />
            </MenuButton>

            <MenuItems
                className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black/5 focus:outline-none"
            >
                <div className="px-4 py-3">
                    <p className="text-sm text-gray-900">{userData.name}</p>
                    <p className="truncate text-sm font-medium text-gray-500">{userData.email}</p>
                </div>

                <div className="py-1">
                    {menuItems.map((item, index) => (
                        <MenuItem key={index}>
                            {({ focus }) => (
                                <Link
                                    onClick={item.onclick}
                                    to={item.link}
                                    className={`flex items-center px-4 py-2 text-sm ${
                                        focus ? 'bg-gray-100 text-gray-900' : 'text-gray-700'
                                    }`}
                                >
                                    <span className="mr-3">{item.icon}</span>
                                    {item.name}
                                </Link>
                            )}
                        </MenuItem>
                    ))}
                </div>
            </MenuItems>
        </Menu>
    )
}

export default UserDropdownMenu