'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardProps } from '../types/product';
import { ProductCardServer } from './ProductCardServer';

const ProductCardClient = ({ name, price, imageUrl, category, demoUrl, marketplace }: ProductCardProps) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    // Format price to IDR currency
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);

    const handleDetailClick = () => {
        setShowDetailModal(true);
    };

    const handleBeli = () => {
        setShowPurchaseModal(true);
    };

    const handleConfirm = () => {
        window.open('https://t.me/admin_username', '_blank', 'noopener,noreferrer');
        setShowPurchaseModal(false);
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50 backdrop-blur-sm"
                        onClick={(e) => e.target === e.currentTarget && setShowDetailModal(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.9, y: 20, opacity: 0 }}
                            animate={{ scale: 1, y: 0, opacity: 1 }}
                            exit={{ scale: 0.9, y: 20, opacity: 0 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-[#FDF6E3] rounded-xl overflow-hidden max-w-2xl w-full mx-auto shadow-lg"
                        >
                            <div className="relative h-48 sm:h-64 w-full">
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    fill
                                    className="object-cover"
                                />
                            </div>
                            
                            <div className="p-4 sm:p-6">
                                <div className="flex items-start justify-between mb-3 sm:mb-4">
                                    <div>
                                        {category && (
                                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-1.5 sm:mb-2 font-lexend">
                                                {category}
                                            </span>
                                        )}
                                        <h2 className="text-lg sm:text-xl font-medium text-[#5C4B37] font-lexend">
                                            {name}
                                        </h2>
                                    </div>
                                    <p className="text-lg sm:text-xl font-bold text-[#8B7355] font-lexend">
                                        {formattedPrice}
                                    </p>
                                </div>

                                <div className="space-y-3 sm:space-y-4">
                                    <div>
                                        <h3 className="text-sm font-medium text-[#5C4B37] mb-1">
                                            Deskripsi Produk
                                        </h3>
                                        <p className="text-sm text-[#8B7355]">
                                            Layanan {name} dengan kualitas terbaik dan pengerjaan profesional.
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-sm font-medium text-[#5C4B37] mb-1">
                                            Fitur Utama
                                        </h3>
                                        <ul className="text-sm text-[#8B7355] list-disc list-inside space-y-0.5 sm:space-y-1">
                                            <li>Pengerjaan Cepat</li>
                                            <li>Hasil Berkualitas</li>
                                            <li>Revisi Tanpa Batas</li>
                                            <li>Garansi 100%</li>
                                        </ul>
                                    </div>
                                </div>

                                <div className="flex justify-end gap-2 sm:gap-3 mt-4 sm:mt-6 pt-3 sm:pt-4 border-t border-[#EDE3CD]">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-all duration-200"
                                        onClick={() => setShowDetailModal(false)}
                                    >
                                        Tutup
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-4 py-2 text-sm font-medium text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-all duration-200"
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