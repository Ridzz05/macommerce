'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../data/products';
import { categoryInfo } from '../data/products';

interface CategoryModalProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
}

const CategoryModal = ({ 
    isOpen, 
    onClose, 
    categories, 
    selectedCategory, 
    onSelectCategory 
}: CategoryModalProps) => {
    const handleSelect = (category: Category | null) => {
        onSelectCategory(category);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                    onClick={(e) => e.target === e.currentTarget && onClose()}
                >
                    <motion.div
                        initial={{ scale: 0.95, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", duration: 0.3 }}
                        className="bg-[#FDF6E3] rounded-xl p-6 max-w-sm w-full mx-auto shadow-lg"
                    >
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-medium text-[#5C4B37]">
                                Pilih Kategori
                            </h3>
                        </div>

                        <div className="space-y-2">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelect(null)}
                                className={`w-full p-3 text-left rounded-lg transition-all duration-200 ${
                                    !selectedCategory 
                                        ? 'bg-[#5C4B37] text-white' 
                                        : 'bg-white text-[#5C4B37] hover:bg-[#EDE3CD]'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg 
                                        className="w-5 h-5 mr-3" 
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
                                    <span className="text-sm font-medium">Semua Kategori</span>
                                    {!selectedCategory && (
                                        <motion.svg 
                                            className="ml-auto h-4 w-4" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    )}
                                </div>
                            </motion.button>

                            {categoryInfo.map(({ name, icon }) => (
                                <motion.button
                                    key={name}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelect(name)}
                                    className={`w-full p-3 text-left rounded-lg transition-all duration-200 ${
                                        selectedCategory === name 
                                            ? 'bg-[#5C4B37] text-white' 
                                            : 'bg-white text-[#5C4B37] hover:bg-[#EDE3CD]'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg 
                                            className="w-5 h-5 mr-3" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d={icon}
                                            />
                                        </svg>
                                        <span className="text-sm font-medium">{name}</span>
                                        {selectedCategory === name && (
                                            <motion.svg 
                                                className="ml-auto h-4 w-4" 
                                                fill="none" 
                                                viewBox="0 0 24 24" 
                                                stroke="currentColor"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                            >
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                            </motion.svg>
                                        )}
                                    </div>
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default CategoryModal; 