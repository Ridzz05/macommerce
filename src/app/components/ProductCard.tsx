'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardProps } from '../types/product';
import { ProductCardServer } from './ProductCardServer';

const ProductCardClient = ({ name, price, imageUrl, images = [], category, demoUrl, marketplace, description, features }: ProductCardProps) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    
    const allImages = [imageUrl, ...images];
    
    // Format price to IDR currency
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);

    const handleDetailClick = () => {
        setShowDetailModal(true);
        setCurrentImageIndex(0);
    };

    const handleBeli = () => {
        setShowPurchaseModal(true);
    };

    const nextImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = (e: React.MouseEvent) => {
        e.stopPropagation();
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
    };

    const marketplaceImages = {
        shopee: {
            src: '/images/marketplace/shopee.webp',
            alt: 'Shopee Logo',
            bg: 'bg-[#FE5621]'
        },
        tokopedia: {
            src: '/images/marketplace/tokopedia.webp',
            alt: 'Tokopedia Logo',
            bg: 'bg-[#03AC0E]'
        },
        lazada: {
            src: '/images/marketplace/lazada.webp',
            alt: 'Lazada Logo',
            bg: 'bg-[#0F146D]'
        },
        tiktokshop: {
            src: '/images/marketplace/tiktokshop.webp',
            alt: 'TikTok Shop Logo',
            bg: 'bg-black'
        }
    };

    return (
        <>
            <ProductCardServer
                name={name}
                price={price}
                imageUrl={imageUrl}
                category={category}
                onDetailClick={handleDetailClick}
                onBeliClick={handleBeli}
            />

            {/* Detail Modal */}
            <AnimatePresence>
                {showDetailModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={(e) => e.target === e.currentTarget && setShowDetailModal(false)}
                    >
                        <motion.div 
                            initial={{ y: 100, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: 100, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-[#FDF6E3] rounded-t-xl sm:rounded-xl overflow-hidden w-full sm:max-w-lg mx-auto shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            {/* Image Carousel */}
                            <div className="relative w-full h-[280px] sm:h-[320px] bg-[#EDE3CD]">
                                <AnimatePresence mode="wait">
                                    <motion.div
                                        key={currentImageIndex}
                                        initial={{ opacity: 0, x: 100 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -100 }}
                                        transition={{ duration: 0.3 }}
                                        className="absolute inset-0"
                                    >
                                        <Image
                                            src={allImages[currentImageIndex]}
                                            alt={`${name} - Gambar ${currentImageIndex + 1}`}
                                            fill
                                            className="object-contain"
                                            sizes="(max-width: 640px) 100vw, 640px"
                                            priority
                                        />
                                    </motion.div>
                                </AnimatePresence>

                                {/* Navigation Buttons */}
                                {allImages.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/30 text-white hover:bg-black/50 transition-colors z-10"
                                        >
                                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                                            </svg>
                                        </button>

                                        {/* Dots Indicator */}
                                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
                                            {allImages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(index);
                                                    }}
                                                    className={`w-2 h-2 rounded-full transition-colors ${
                                                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                                                    }`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>
                            
                            <div className="p-3 sm:p-4">
                                <div className="flex items-start justify-between mb-2 sm:mb-3">
                                    <div>
                                        {category && (
                                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-1 font-lexend">
                                                {category}
                                            </span>
                                        )}
                                        <h2 className="text-base sm:text-lg font-medium text-[#5C4B37] font-lexend">
                                            {name}
                                        </h2>
                                    </div>
                                    <p className="text-base sm:text-lg font-bold text-[#8B7355] font-lexend">
                                        {formattedPrice}
                                    </p>
                                </div>

                                <div className="space-y-2 sm:space-y-3">
                                    <div>
                                        <h3 className="text-sm font-medium text-[#5C4B37] mb-0.5">
                                            Deskripsi Produk
                                        </h3>
                                        <p className="text-xs sm:text-sm text-[#8B7355]">
                                            {description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-[#5C4B37] mb-0.5">
                                            Fitur Utama
                                        </h3>
                                        <ul className="text-xs sm:text-sm text-[#8B7355] list-disc list-inside space-y-0.5">
                                            {features.map((feature, index) => (
                                                <li key={index}>{feature}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#EDE3CD]">
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-all duration-200"
                                        onClick={() => setShowDetailModal(false)}
                                    >
                                        Tutup
                                    </motion.button>
                                    <motion.button
                                        whileTap={{ scale: 0.95 }}
                                        className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-all duration-200"
                                        onClick={() => {
                                            setShowDetailModal(false);
                                            setShowPurchaseModal(true);
                                        }}
                                    >
                                        Beli Sekarang
                                    </motion.button>
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Purchase Modal */}
            <AnimatePresence>
                {showPurchaseModal && (
                    <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={(e) => e.target === e.currentTarget && setShowPurchaseModal(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-[#FDF6E3] rounded-xl p-6 max-w-sm w-full mx-auto shadow-lg"
                        >
                            <div className="text-center mb-6">
                                <h3 className="text-lg font-medium text-[#5C4B37] font-lexend">
                                    Pilih Marketplace
                                </h3>
                                <p className="mt-2 text-sm text-[#8B7355]">
                                    Lanjutkan pembelian {name} melalui marketplace pilihan Anda
                                </p>
                                <p className="mt-1 text-sm font-medium text-[#5C4B37]">
                                    {formattedPrice}
                                </p>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                {marketplace.shopee && (
                                    <motion.a
                                        href={marketplace.shopee}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center p-4 rounded-lg ${marketplaceImages.shopee.bg} text-white hover:bg-opacity-90 transition-all`}
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image
                                                src={marketplaceImages.shopee.src}
                                                alt={marketplaceImages.shopee.alt}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="mt-2 text-sm font-medium">Shopee</span>
                                    </motion.a>
                                )}

                                {marketplace.tokopedia && (
                                    <motion.a
                                        href={marketplace.tokopedia}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center p-4 rounded-lg ${marketplaceImages.tokopedia.bg} text-white hover:bg-opacity-90 transition-all`}
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image
                                                src={marketplaceImages.tokopedia.src}
                                                alt={marketplaceImages.tokopedia.alt}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="mt-2 text-sm font-medium">Tokopedia</span>
                                    </motion.a>
                                )}

                                {marketplace.lazada && (
                                    <motion.a
                                        href={marketplace.lazada}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center p-4 rounded-lg ${marketplaceImages.lazada.bg} text-white hover:bg-opacity-90 transition-all`}
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image
                                                src={marketplaceImages.lazada.src}
                                                alt={marketplaceImages.lazada.alt}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="mt-2 text-sm font-medium">Lazada</span>
                                    </motion.a>
                                )}

                                {marketplace.tiktokshop && (
                                    <motion.a
                                        href={marketplace.tiktokshop}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className={`flex flex-col items-center p-4 rounded-lg ${marketplaceImages.tiktokshop.bg} text-white hover:bg-opacity-90 transition-all`}
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image
                                                src={marketplaceImages.tiktokshop.src}
                                                alt={marketplaceImages.tiktokshop.alt}
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="mt-2 text-sm font-medium">TikTok Shop</span>
                                    </motion.a>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="px-4 py-2 text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-all duration-200"
                                    onClick={() => setShowPurchaseModal(false)}
                                >
                                    Tutup
                                </motion.button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductCardClient; 