'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';
import { products } from './data/products';
import { useSearch } from './context/SearchContext';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const { searchQuery } = useSearch();

    // Reset kategori ke default ketika pencarian dihapus
    useEffect(() => {
        if (searchQuery === '') {
            setSelectedCategory(null);
        }
    }, [searchQuery]);

    return (
        <div className="pt-20 bg-[#FFFBF2]">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <CategoryFilter 
                        selectedCategory={selectedCategory} 
                        onCategoryChange={setSelectedCategory} 
                    />
                </div>
                <ProductGrid 
                    products={products} 
                    filteredCategory={selectedCategory}
                />
            </main>
        </div>
    );
}
