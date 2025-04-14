import React from 'react';
import logo from "../src/assets/Wavy-logo.png"
import { useState } from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <nav className="mt-6 w-full px-8 py-3">
                <div className="flex items-center justify-between lg:px-18">
                    {/* Logo and Title */}
                    <NavLink to="/">
                        <div className="flex flex-col items-center">
                            <img
                                src={logo}
                                className="h-10 ml-2 md:ml-4 md:h-12 filter brightness-0 invert"
                                alt="Logo"
                            />
                            <span className="text-xl md:text-4xl wavy text-white">
                                Wavy
                            </span>
                        </div>
                    </NavLink>

                    {/* Hamburger Toggle Button */}
                    <div className="md:hidden text-white transition-all">
                        <button onClick={() => setMenuOpen(!menuOpen)}>
                            {
                                menuOpen ? <i className='fa fa-close text-2xl cursor-pointer'></i> : <i className='fa fa-bars text-2xl cursor-pointer'></i>
                            }
                        </button>
                    </div>

                    {/* Navigation Links (desktop) */}
                    <div className="hidden md:flex space-x-6 items-center wavy-links tracking-wider">
                        <NavLink to="/" end>
                            {({ isActive }) => (
                                <button
                                    type="button"
                                    className={`w-full md:px-14 py-2 px-4 rounded-full text-white shadow-md cursor-pointer transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-700'
                                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                                        }`}
                                >
                                    Home
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/album" >
                            {({ isActive }) => (
                                <button
                                    type="button"
                                    className={`w-full cursor-pointer relative md:px-14 py-2 px-4 rounded-full text-white shadow-md transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-700'
                                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                                        }`}
                                >
                                    <i className='fa fa-plus absolute left-4 top-3'></i>
                                    Album
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/track">
                            {({ isActive }) => (
                                <button
                                    type="button"
                                    className={`w-full cursor-pointer relative md:px-14 py-2 px-4 rounded-full text-white shadow-md transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-700'
                                        : 'bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-500 hover:to-gray-600'
                                        }`}
                                >
                                    <i className='fa fa-plus absolute left-4 top-3'></i>
                                    Track
                                </button>
                            )}
                        </NavLink>
                    </div>
                </div>

                {/* Navigation Links (mobile dropdown) */}
                {menuOpen && (
                    <div className="flex w-full wavy-links cursor-pointer flex-col space-y-4 md:hidden items-center mt-10 tracking-wider">
                        <NavLink to="/" end className="w-full">
                            {({ isActive }) => (
                                <button
                                    type="button"
                                    className={`w-full py-2 px-4 rounded-full text-white shadow-md cursor-pointer transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-700'
                                        : 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-700'
                                        }`}
                                >
                                    Home
                                </button>
                            )}
                        </NavLink>

                        <NavLink to="/album" className="w-full">
                            {({ isActive }) => (
                                <button
                                    type="button"
                                    className={`w-full py-2 cursor-pointer px-4 rounded-full text-white shadow-md transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-700'
                                        : 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-700'
                                        }`}
                                >
                                    Add Album
                                </button>
                            )}
                        </NavLink>

                        <NavLink to="/track" className="w-full">
                            {({ isActive }) => (
                                <button
                                    type="button"
                                    className={`w-full py-2 cursor-pointer px-4 rounded-full text-white shadow-md transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900 hover:from-blue-600 hover:to-indigo-700'
                                        : 'bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-700'
                                        }`}
                                >
                                    Add Track
                                </button>
                            )}
                        </NavLink>

                    </div>
                )}
            </nav >
        </>
    )
}

export default Navbar;