'use client'

import { motion, AnimatePresence } from 'framer-motion';
import { Product } from '../data/products';
import ProductCardClient from './ProductCard';
import { useSearch } from '../context/SearchContext';

interface ProductGridClientProps {
    products: Product[];
    filteredCategory: string | null;
}

export function ProductGridClient({ products, filteredCategory }: ProductGridClientProps) {
    const { searchQuery } = useSearch();

    const filteredProducts = products
        .filter(product => {
            // Filter by category if selected
            if (filteredCategory && product.category !== filteredCategory) {
                return false;
            }
            // Filter by search query
            if (searchQuery) {
                return product.name.toLowerCase().includes(searchQuery.toLowerCase());
            }
            return true;
        });

    if (filteredProducts.length === 0) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center justify-center h-[50vh]"
            >
                <div className="text-center space-y-4">
                    <svg 
                        className="w-16 h-16 mx-auto text-[#8B7355] opacity-50" 
                        fill="none" 
                        stroke="currentColor" 
                        viewBox="0 0 24 24"
                    >
                        <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={1.5}
                            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                        />
                    </svg>
                    <p className="text-[#8B7355] text-lg font-medium">
                        Tidak ada produk yang sesuai dengan pencarian Anda.
                    </p>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div 
            layout
            className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-5"
        >
            <AnimatePresence>
                {filteredProducts.map((product) => (
                    <motion.div
                        key={product.id}
                        layout
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.3 }}
                    >
                        <ProductCardClient
                            name={product.name}
                            price={product.price}
                            imageUrl={product.imageUrl}
                            category={product.category}
                            description={product.description}
                            features={product.features}
                            demoUrl={product.demoUrl}
                            marketplace={product.marketplace}
                        />
                    </motion.div>
                ))}
            </AnimatePresence>
        </motion.div>
    );
} 