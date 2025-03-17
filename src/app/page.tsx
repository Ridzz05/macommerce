'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ProductGrid from './components/ProductGrid';
import CategoryFilter from './components/CategoryFilter';
import { products } from './data/products';

export default function Home() {
    const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
    const [showWelcome, setShowWelcome] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowWelcome(false);
        }, 5000); // Pesan akan hilang setelah 5 detik

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="pt-20 bg-[#FFFBF2]">
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
                    <AnimatePresence>
                        {showWelcome && (
                            <motion.div 
                                className="space-y-3"
                                initial={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                transition={{ duration: 0.5 }}
                            >
                                <motion.div 
                                    className="space-y-1"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <p className="text-sm font-medium text-[#8B7355]">Selamat datang di marketplace kami</p>
                                    <h1 className="text-2xl md:text-3xl font-semibold text-[#5C4B37] font-lexend">
                                        Temukan Produk Pilihan Anda
                                    </h1>
                                </motion.div>
                                <motion.p 
                                    className="text-[#8B7355] text-sm md:text-base max-w-xl leading-relaxed"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                >
                                    Jelajahi koleksi lengkap kami mulai dari produk kecantikan, fashion, sepatu, hingga layanan digital dan jasa profesional. Semua kebutuhan Anda tersedia dalam satu platform.
                                </motion.p>
                            </motion.div>
                        )}
                    </AnimatePresence>
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
