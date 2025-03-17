'use client'

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Category } from '../data/products';
import CategoryModal from './CategoryModal';

interface CategoryFilterClientProps {
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
    categories: Category[];
}

export function CategoryFilterClient({ selectedCategory, onCategoryChange, categories }: CategoryFilterClientProps) {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="flex justify-end">
            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                onClick={() => setIsModalOpen(true)}
                className="group px-4 py-2.5 text-sm font-medium text-[#5C4B37] bg-[#FDF6E3] border-2 border-[#EDE3CD] rounded-xl hover:bg-[#EDE3CD] hover:border-[#D8C8A7] shadow-sm transition-all duration-300 inline-flex items-center"
            >
                <svg 
                    className="w-4 h-4 mr-2 transition-transform duration-300 group-hover:rotate-180" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                >
                    <path 
                        strokeLinecap="round" 
                        strokeLinejoin="round" 
                        strokeWidth={2} 
                        d="M19 9l-7 7-7-7"
                    />
                </svg>
                {selectedCategory || 'Pilih Kategori'}
            </motion.button>

            <CategoryModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                categories={categories}
                selectedCategory={selectedCategory as Category}
                onSelectCategory={onCategoryChange}
            />
        </div>
    );
} 