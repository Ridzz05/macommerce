'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSearch } from '../context/SearchContext';
import Link from 'next/link';

const navVariants = {
    initial: {
        y: -100,
        opacity: 0,
    },
    animate: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5
        }
    },
    exit: {
        y: -100,
        opacity: 0,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 20,
            mass: 0.5
        }
    }
};

const modalVariants = {
    hidden: {
        opacity: 0,
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
            duration: 0.2,
            when: "afterChildren"
        }
    },
    visible: {
        opacity: 1,
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        transition: {
            duration: 0.3,
            when: "beforeChildren"
        }
    }
};

const contentVariants = {
    hidden: {
        y: -60,
        scale: 0.95,
        opacity: 0,
        transition: {
            type: "spring",
            duration: 0.4
        }
    },
    visible: {
        y: 0,
        scale: 1,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 300,
            damping: 25,
            duration: 0.4
        }
    }
};

const Navbar = () => {
    const { setSearchQuery } = useSearch();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [localSearchQuery, setLocalSearchQuery] = useState('');
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const shouldReduceMotion = useReducedMotion();

    const controlNavbar = useCallback(() => {
        const currentScrollY = window.scrollY;
        const scrollDelta = currentScrollY - lastScrollY;
        
        if (scrollDelta < -5) {
            setIsVisible(true);
        } else if (scrollDelta > 5 && currentScrollY > 50) {
            setIsVisible(false);
        }
        
        setLastScrollY(currentScrollY);
    }, [lastScrollY]);

    useEffect(() => {
        let ticking = false;

        const onScroll = () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    controlNavbar();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, [controlNavbar]);

    const handleSearch = (value: string) => {
        setLocalSearchQuery(value);
        setSearchQuery(value);
    };

    const handleClearSearch = () => {
        setLocalSearchQuery('');
        setSearchQuery('');
        setShowSearchModal(false);
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
            <AnimatePresence>
                {isVisible && (
                    <motion.div 
                        className="fixed top-2 left-0 right-0 z-50 px-3 sm:px-6 py-2"
                        variants={shouldReduceMotion ? {} : navVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <div className="max-w-7xl mx-auto">
                            <nav className="bg-[#FDF6E3] backdrop-blur-sm bg-opacity-90 border border-[#EDE3CD] rounded-xl shadow-lg">
                                <div className="px-3 sm:px-6 py-2 sm:py-3">
                                    <div className="flex justify-between items-center">
                                        {/* Logo */}
                                        <Link href="/" className="flex-shrink-0">
                                            <div className="relative flex items-center h-8 sm:h-9 px-3 sm:px-4 bg-[#FDF6E3] border border-[#EDE3CD] rounded-lg hover:bg-[#F5ECD6] transition-colors">
                                                <span className="text-base sm:text-lg font-semibold text-[#5C4B37] mr-1">Ma</span>
                                                <span className="text-base sm:text-lg font-medium text-[#8B7355]">Commerce</span>
                                            </div>
                                        </Link>

                                        {/* Right side content */}
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            {/* Search Button */}
                                            <motion.button
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                onClick={() => setShowSearchModal(true)}
                                                className="group p-2 sm:p-2.5 rounded-lg border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] hover:border-[#D8C8A7] transition-all duration-300 shadow-sm hover:shadow"
                                            >
                                                <svg
                                                    className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-12"
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
                                                        className="group p-2 sm:p-2.5 rounded-lg border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] hover:border-[#D8C8A7] transition-all duration-300 shadow-sm hover:shadow"
                                                    >
                                                        <svg
                                                            className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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

                                                    {/* Dropdown Menu */}
                                                    <AnimatePresence>
                                                        {isDropdownOpen && (
                                                            <motion.div
                                                                initial={{ opacity: 0, y: -10 }}
                                                                animate={{ opacity: 1, y: 0 }}
                                                                exit={{ opacity: 0, y: -10 }}
                                                                transition={{ duration: 0.2 }}
                                                                className="absolute right-0 mt-2 w-48 bg-[#FDF6E3] border border-[#EDE3CD] rounded-lg shadow-lg overflow-hidden"
                                                            >
                                                                <div className="py-1">
                                                                    <a
                                                                        href="#"
                                                                        className="block px-4 py-2 text-sm text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors"
                                                                    >
                                                                        Tentang Kami
                                                                    </a>
                                                                    <a
                                                                        href="#"
                                                                        className="block px-4 py-2 text-sm text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors"
                                                                    >
                                                                        Hubungi Kami
                                                                    </a>
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
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Modal dengan animasi yang lebih halus */}
            <AnimatePresence mode="wait">
                {showSearchModal && (
                    <motion.div
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="hidden"
                        className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm"
                        onClick={(e) => e.target === e.currentTarget && setShowSearchModal(false)}
                    >
                        <motion.div
                            variants={contentVariants}
                            className="w-full max-w-lg mt-24 mx-4"
                        >
                            <div className="relative bg-[#FDF6E3] rounded-2xl shadow-lg overflow-hidden">
                                <div className="relative flex items-center bg-[#FDF6E3] rounded-2xl border-2 border-[#EDE3CD] focus-within:border-[#8B7355] transition-all duration-300">
                                    {/* Search Icon dengan animasi rotasi */}
                                    <motion.div 
                                        className="absolute left-4 text-[#8B7355]"
                                        initial={{ rotate: -90, opacity: 0 }}
                                        animate={{ rotate: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.1 }}
                                    >
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
                                    </motion.div>
                                    
                                    {/* Search Input dengan animasi slide */}
                                    <motion.input
                                        initial={{ x: -20, opacity: 0 }}
                                        animate={{ x: 0, opacity: 1 }}
                                        transition={{ duration: 0.3, delay: 0.2 }}
                                        type="text"
                                        placeholder="Cari produk..."
                                        value={localSearchQuery}
                                        onChange={(e) => handleSearch(e.target.value)}
                                        onKeyDown={handleKeyDown}
                                        autoFocus
                                        className="w-full py-4 pl-12 pr-12 text-base bg-transparent text-[#5C4B37] placeholder-[#8B7355] focus:outline-none rounded-2xl"
                                    />

                                    {/* Clear Button dengan animasi spring */}
                                    <AnimatePresence mode="wait">
                                        {localSearchQuery && (
                                            <motion.button
                                                initial={{ opacity: 0, scale: 0.8, rotate: -180 }}
                                                animate={{ opacity: 1, scale: 1, rotate: 0 }}
                                                exit={{ opacity: 0, scale: 0.8, rotate: 180 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 300,
                                                    damping: 20
                                                }}
                                                whileHover={{ 
                                                    scale: 1.1,
                                                    rotate: 90,
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