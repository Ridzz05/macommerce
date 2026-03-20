'use client'

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { useSearch } from '@/app/context/SearchContext';
import { navVariants } from './NavbarAnimations';
import { Logo } from './Logo';
import { SearchButton } from './SearchButton';
import { SearchModal } from './SearchModal';
import { NavigationDropdown } from './NavigationDropdown';
import { CartButton } from './CartButton';

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
                        className="fixed top-0 left-0 right-0 z-50"
                        variants={shouldReduceMotion ? {} : navVariants}
                        initial="initial"
                        animate="animate"
                        exit="exit"
                    >
                        <nav className="bg-[#FDF6E3] backdrop-blur-md bg-opacity-90 border-b border-[#EDE3CD] rounded-b-3xl shadow-sm">
                            <div className="max-w-7xl mx-auto px-4 sm:px-6 py-3">
                                <div className="flex justify-between items-center">
                                    <Logo />
                                    
                                    <div className="flex items-center gap-2 sm:gap-3">
                                        <SearchButton onClick={() => setShowSearchModal(true)} />
                                        <CartButton />
                                        <NavigationDropdown 
                                            isOpen={isDropdownOpen}
                                            onToggle={() => setIsDropdownOpen(!isDropdownOpen)}
                                            onClose={() => setIsDropdownOpen(false)}
                                        />
                                    </div>
                                </div>
                            </div>
                        </nav>
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
