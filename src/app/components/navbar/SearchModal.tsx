import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { modalVariants, contentVariants } from './NavbarAnimations';

interface SearchModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSearch: (query: string) => void;
    onClear: () => void;
    initialQuery?: string;
}

export const SearchModal = ({ isOpen, onClose, onSearch, onClear, initialQuery = '' }: SearchModalProps) => {
    const [localSearchQuery, setLocalSearchQuery] = useState(initialQuery);

    const handleSearch = (value: string) => {
        setLocalSearchQuery(value);
        onSearch(value);
    };

    const handleClearSearch = () => {
        setLocalSearchQuery('');
        onClear();
        onClose();
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            if (localSearchQuery.trim()) {
                onClose();
            }
        } else if (e.key === 'Escape') {
            onClose();
        }
    };

    return (
        <AnimatePresence mode="wait">
            {isOpen && (
                <motion.div
                    variants={modalVariants}
                    initial="hidden"
                    animate="visible"
                    exit="hidden"
                    role="dialog"
                    aria-modal="true"
                    aria-label="Pencarian produk"
                    className="fixed inset-0 z-50 flex items-start justify-center bg-black/50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
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
                                    aria-label="Cari produk"
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
                                            onClick={handleClearSearch}
                                            type="button"
                                            aria-label="Hapus pencarian"
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
    );
};
