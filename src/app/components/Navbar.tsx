'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSearch } from '../context/SearchContext';

const Navbar = () => {
    const { setSearchQuery } = useSearch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState('');

    const handleSearch = (value: string) => {
        setLocalSearchQuery(value);
        setSearchQuery(value);
    };

    const handleClearSearch = () => {
        setLocalSearchQuery('');
        setSearchQuery('');
        setShowSearchModal(false); // Menutup modal pencarian setelah dibersihkan
    };

    const handleSearchSubmit = () => {
        if (localSearchQuery.trim()) {
            setShowSearchModal(false);
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearchSubmit();
        } else if (e.key === 'Escape') {
            setShowSearchModal(false);
        }
    };

    return (
        <>
            <nav className="fixed top-0 left-0 right-0 bg-[#FDF6E3] backdrop-blur-sm bg-opacity-90 border-b border-[#EDE3CD] z-50">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16 items-center">
                        {/* Logo */}
                        <div className="flex-shrink-0">
                            <svg width="200" height="40" viewBox="0 0 200 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                                {/* Ma */}
                                <text x="10" y="28" className="text-2xl font-bold" fill="#5C4B37" fontFamily="Montserrat">
                                    Ma
                                </text>
                                {/* Commerce */}
                                <text x="45" y="28" className="text-2xl" fill="#8B7355" fontFamily="Montserrat">
                                    Commerce
                                </text>
                            </svg>
                        </div>

                        {/* Right side content */}
                        <div className="flex items-center gap-3">
                            {/* Search Button */}
                            <motion.button
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                onClick={() => setShowSearchModal(true)}
                                className="group p-2.5 rounded-xl border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] hover:border-[#D8C8A7] transition-all duration-300 shadow-sm hover:shadow"
                            >
                                <svg
                                    className="w-4 h-4 transition-transform duration-300 group-hover:rotate-12"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                    />
                                </svg>
                            </motion.button>

                            {/* Navigation Links */}
                            <div className="flex items-center">
                                <div className="relative">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                                        className="group p-2.5 rounded-xl border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] hover:border-[#D8C8A7] transition-all duration-300 shadow-sm hover:shadow"
                                    >
                                        <svg
                                            className="w-4 h-4"
                                            fill="none"
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d="M4 6h16M4 12h16M4 18h16"
                                            />
                                        </svg>
                                    </motion.button>

                                    <AnimatePresence>
                                        {isDropdownOpen && (
                                            <motion.div
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                className="absolute right-0 mt-2 w-44 rounded-xl border border-[#EDE3CD] bg-[#FDF6E3] shadow-lg overflow-hidden"
                                            >
                                                <div className="py-1.5" role="menu">
                                                    <motion.a
                                                        href="https://wa.me/6281222827630"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center px-4 py-2.5 text-sm text-[#5C4B37] hover:bg-[#F5ECD6] transition-all duration-300"
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <svg className="h-4 w-4 mr-3 text-[#8B7355]" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z"/>
                                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                                                        </svg>
                                                        Channel
                                                    </motion.a>
                                                    <motion.a
                                                        href="https://wa.me/6281222827630"
                                                        target="_blank"
                                                        rel="noopener noreferrer"
                                                        className="flex items-center px-4 py-2.5 text-sm text-[#5C4B37] hover:bg-[#F5ECD6] transition-all duration-300"
                                                        whileHover={{ x: 4 }}
                                                    >
                                                        <svg className="h-4 w-4 mr-3 text-[#8B7355]" fill="currentColor" viewBox="0 0 24 24">
                                                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z"/>
                                                            <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm.029 18.88c-1.161 0-2.305-.292-3.318-.844l-3.677.964.984-3.595c-.607-1.052-.927-2.246-.926-3.468.001-3.825 3.113-6.937 6.937-6.937 1.856.001 3.598.723 4.907 2.034 1.31 1.311 2.031 3.054 2.03 4.908-.001 3.825-3.113 6.938-6.937 6.938z"/>
                                                        </svg>
                                                        Admin
                                                    </motion.a>
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Search Modal */}
            <AnimatePresence>
                {showSearchModal && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="fixed inset-0 z-50 flex items-start justify-center bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={(e) => e.target === e.currentTarget && setShowSearchModal(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: -40 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: -40 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="w-full max-w-lg mt-24 mx-4"
                        >
                            <div className="relative bg-[#FDF6E3] rounded-2xl shadow-lg">
                                <div className="relative flex items-center bg-[#FDF6E3] rounded-2xl border-2 border-[#EDE3CD] focus-within:border-[#8B7355] transition-all duration-300">
                                    {/* Search Icon */}
                                    <div className="absolute left-4 text-[#8B7355]">
                                        <svg
                                            className="w-5 h-5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                                            />
                                        </svg>
                                    </div>
                                    
                                    {/* Search Input */}
                                    <input
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={localSearchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        className="w-full py-4 pl-12 pr-12 text-base bg-transparent text-[#5C4B37] placeholder-[#8B7355] focus:outline-none rounded-2xl"
                                    />

                                    {/* Clear Button */}
                                    <AnimatePresence>
                                        {localSearchQuery && (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.8 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0.8 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 20
                                                }}
                                                whileHover={{ 
                                                    scale: 1.1,
                                                    transition: { duration: 0.2 }
                                                }}
                                                whileTap={{ 
                                                    scale: 0.9,
                                                    transition: { duration: 0.1 }
                                                }}
                                                onClick={() => handleClearSearch()}
                                                className="absolute right-4 p-1.5 rounded-xl hover:bg-[#EDE3CD] text-[#8B7355] hover:text-[#5C4B37] transition-colors duration-300"
                                            >
                                                <motion.svg 
                                                    className="w-4 h-4" 
                                                    fill="none" 
                                                    stroke="currentColor" 
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth="2" 
                                                        d="M6 18L18 6M6 6l12 12"
                                                    />
                                                </motion.svg>
                                            </motion.button>
                                        )}
                                    </AnimatePresence>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default Navbar; 