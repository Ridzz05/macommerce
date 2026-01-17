'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { CircleHelp, X } from 'lucide-react';
import { useSearch } from '@/app/context/SearchContext';
import { navVariants } from './NavbarAnimations';
import { Logo } from './Logo';
import { SearchButton } from './SearchButton';
import { SearchModal } from './SearchModal';
import { NavigationDropdown } from './NavigationDropdown';

const Navbar = () => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showSearchModal, setShowSearchModal] = useState(false);
    const [isVisible, setIsVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);
    const shouldReduceMotion = useReducedMotion();
    const [showHelp, setShowHelp] = useState(false);

    // Safe context access with error handling
    let setSearchQuery: (query: string) => void;
    try {
        const searchContext = useSearch();
        setSearchQuery = searchContext?.setSearchQuery || (() => {});
    } catch (error) {
        console.warn('SearchContext not available, using fallback');
        setSearchQuery = () => {};
    }

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
        setSearchQuery(value);
    };

    const handleClearSearch = () => {
        setSearchQuery('');
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
                                        <Logo />
                                        
                                        <div className="flex items-center gap-2 sm:gap-3">
                                            <SearchButton onClick={() => setShowSearchModal(true)} />
                                            <NavigationDropdown 
                                                isOpen={isDropdownOpen}
                                                onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                                                onClose={() => setIsDropdownOpen(false)}
                                                onHelpClick={() => setShowHelp(true)}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </nav>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            <SearchModal 
                isOpen={showSearchModal}
                onClose={() => setShowSearchModal(false)}
                onSearch={handleSearch}
                onClear={handleClearSearch}
            />

            <div className="fixed bottom-6 right-6 z-50">
                <AnimatePresence>
                    {showHelp && (
                        <motion.div
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 12 }}
                            transition={{ duration: 0.2 }}
                            className="w-72 rounded-xl border border-[#EDE3CD] bg-white shadow-lg overflow-hidden"
                        >
                            <div className="px-4 py-3">
                                <div className="flex items-start gap-3">
                                    <div className="w-9 h-9 rounded-full bg-[#F5ECD6] text-[#5C4B37] flex items-center justify-center">
                                        <CircleHelp className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-start justify-between gap-3">
                                            <div>
                                                <p className="text-sm font-semibold text-[#5C4B37]">
                                                    Selamat datang di MaCommerce
                                                </p>
                                                <p className="mt-1 text-xs text-[#8B7355]">
                                                    Jelajahi worlds pilihan kami dan temukan produk yang relevan untukmu.
                                                </p>
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => setShowHelp(false)}
                                                className="text-[#8B7355] hover:text-[#5C4B37]"
                                                aria-label="Tutup pesan"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};

export default Navbar; 
