'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
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
        </>
    );
};

export default Navbar; 
