import React from 'react';
import { useState } from 'react';
import { NavLink } from "react-router-dom";

const Navbar = () => {
    const [menuOpen, setMenuOpen] = useState(false);
    return (
        <>
            <nav className="flex h-full flex-col md:flex-row shadow-[inset_0_10px_20px_-10px_rgba(0,0,0,0.7)] bg-neutral-800">
                {/* Sidebar for desktop */}
                <div className="hidden md:flex flex-col rounded-lg text-white xl:w-88 w-48 min-h-screen p-6 space-y-6">
                    <NavLink to="/" className="text-2xl font-bold mb-6">
                        Wavy
                    </NavLink>

                    <NavLink to="/" end>
                        {({ isActive }) => (
                            <button
                                className={`py-2 px-4 w-full text-center rounded-md transition-all ${isActive
                                    ? 'bg-gradient-to-r from-blue-700 to-indigo-900'
                                    : 'hover:bg-neutral-700'
                                    }`}
                            >
                                Home
                            </button>
                        )}
                    </NavLink>

                    <NavLink to="/album">
                        {({ isActive }) => (
                            <button
                                className={`py-2 px-4 w-full text-center rounded-md transition-all ${isActive
                                    ? 'bg-gradient-to-r from-blue-700 to-indigo-900'
                                    : 'hover:bg-neutral-700'
                                    }`}
                            >
                                <span>
                                    <i className="fa fa-plus mr-2" />
                                    Album
                                </span>
                            </button>
                        )}
                    </NavLink>

                    <NavLink to="/track">
                        {({ isActive }) => (
                            <button
                                className={`py-2 px-4 rounded-md w-full text-center transition-all ${isActive
                                    ? 'bg-gradient-to-r from-blue-700 to-indigo-900'
                                    : 'hover:bg-neutral-700'
                                    }`}
                            >
                                <span>
                                    <i className="fa fa-plus mr-2" />
                                    Track
                                </span>
                            </button>
                        )}
                    </NavLink>
                </div>

                {/* Mobile Navbar */}
                <div className="w-full md:hidden px-4 py-3 flex justify-between items-center  bg-gradient-to-l from-neutral-800">
                    <NavLink to="/" className="text-white text-xl font-bold">
                        Wavy
                    </NavLink>

                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-white text-2xl">
                        {menuOpen ? <i className="fa fa-close" /> : <i className="fa fa-bars" />}
                    </button>
                </div>

                {/* Dropdown menu for mobile */}
                {menuOpen && (
                    <div className="md:hidden text-white w-full flex flex-col items-center space-y-4 py-4">
                        <NavLink to="/" end className="w-4/5">
                            {({ isActive }) => (
                                <button
                                    className={`w-full py-2 rounded-md transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900'
                                        : 'hover:bg-neutral-700'
                                        }`}
                                >
                                    Home
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/album" className="w-4/5">
                            {({ isActive }) => (
                                <button
                                    className={`w-full py-2 rounded-md transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900'
                                        : 'hover:bg-neutral-700'
                                        }`}
                                >
                                    Add Album
                                </button>
                            )}
                        </NavLink>
                        <NavLink to="/track" className="w-4/5">
                            {({ isActive }) => (
                                <button
                                    className={`w-full py-2 rounded-md transition-all ${isActive
                                        ? 'bg-gradient-to-r from-blue-700 to-indigo-900'
                                        : 'hover:bg-neutral-700'
                                        }`}
                                >
                                    Add Track
                                </button>
                            )}
                        </NavLink>
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar;