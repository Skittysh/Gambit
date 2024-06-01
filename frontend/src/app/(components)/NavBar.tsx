"use client";
import React from 'react';
import { FaHome, FaGamepad, FaRegUser, FaCog, FaSnowflake } from 'react-icons/fa';
import { motion } from 'framer-motion';
import 'tailwindcss/tailwind.css';


const NavBar: React.FC = () => {
    const navItems = [
        { icon: <FaHome />, label: 'Home', path: '/' },
        { icon: <FaGamepad />, label: 'Game', path: 'game' },
        { icon: <FaRegUser />, label: 'Lobby', path: 'Lobby' },
        { icon: <FaCog />, label: 'Settings', path: 'game' }
    ];

    return (
        <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="w-full bg-blue-50 shadow-lg fixed top-0 left-0 right-0 z-50"
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0 flex items-center space-x-3">
                        <FaSnowflake className="text-blue-500" size={30} />
                        <span className="text-2xl font-bold text-gray-800">Winter App</span>
                    </div>
                    <div className="hidden md:block">
                        <div className="ml-10 flex items-baseline space-x-4">
                            {navItems.map((item, index) => (
                                <motion.a
                                    key={index}
                                    href={item.path}
                                    className="text-gray-700 hover:bg-blue-200 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium flex items-center space-x-2"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                >
                                    {item.icon}
                                    <span>{item.label}</span>
                                </motion.a>
                            ))}
                        </div>
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-50 focus:ring-white"
                        >
                            <span className="sr-only">Open main menu</span>
                            {/* Heroicon menu for hamburger menu */}
                            <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

export default NavBar;
