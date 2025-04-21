'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardProps } from '../types/product';
import { ProductCardServer } from './ProductCardServer';

const modalVariants = {
    hidden: {
        opacity: 0,
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
    },
    visible: {
        opacity: 1,
        backdropFilter: "blur(4px)",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    },
    exit: {
        opacity: 0,
        backdropFilter: "blur(0px)",
        backgroundColor: "rgba(0, 0, 0, 0)",
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const contentVariants = {
    hidden: {
        y: "100%",
        opacity: 0
    },
    visible: {
        y: "0%",
        opacity: 1,
        transition: {
            type: "spring",
            damping: 25,
            stiffness: 300
        }
    },
    exit: {
        y: "100%",
        opacity: 0,
        transition: {
            duration: 0.2,
            ease: "easeIn"
        }
    }
};

const imageVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: { 
        scale: 1, 
        opacity: 1,
        transition: {
            duration: 0.3,
            ease: "easeOut"
        }
    }
};

const ProductCardClient = ({ name, price, imageUrl, category, demoUrl, marketplace, description, features }: ProductCardProps) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    
    // Format price to IDR currency
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);

    const handleDetailClick = () => {
        setShowDetailModal(true);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseDetail = () => {
        setShowDetailModal(false);
        document.body.style.overflow = 'unset';
    };

    const handleBeli = () => {
        setShowPurchaseModal(true);
        document.body.style.overflow = 'hidden';
    };

    const handleClosePurchase = () => {
        setShowPurchaseModal(false);
        document.body.style.overflow = 'unset';
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
            <AnimatePresence mode="wait">
                {showDetailModal && (
                    <motion.div 
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={handleCloseDetail}
                    >
                        <motion.div 
                            className="bg-[#FDF6E3] w-full sm:w-[480px] sm:rounded-lg overflow-hidden shadow-xl transform transition-all duration-300 max-h-[90vh] flex flex-col"
                            variants={contentVariants}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <motion.div 
                                className="relative w-full aspect-[4/3] sm:aspect-square bg-[#EDE3CD] flex-shrink-0"
                                variants={imageVariants}
                            >
                                <Image
                                    src={imageUrl}
                                    alt={name}
                                    fill
                                    className="object-contain"
                                    sizes="(max-width: 640px) 100vw, 480px"
                                    priority
                                />
                            </motion.div>
                            
                            <motion.div 
                                className="p-3 sm:p-4 overflow-y-auto flex-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-start justify-between gap-3 mb-3">
                                    <div>
                                        {category && (
                                            <motion.span 
                                                className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-1"
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                {category}
                                            </motion.span>
                                        )}
                                        <motion.h2 
                                            className="text-base font-medium text-[#5C4B37] leading-tight"
                                            initial={{ opacity: 0, y: 10 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.4 }}
                                        >
                                            {name}
                                        </motion.h2>
                                    </div>
                                    <motion.p 
                                        className="text-base font-bold text-[#8B7355] flex-shrink-0"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {formattedPrice}
                                    </motion.p>
                                </div>

                                <motion.div 
                                    className="space-y-3"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div>
                                        <h3 className="text-xs font-medium text-[#5C4B37] mb-1">
                                            Deskripsi Produk
                                        </h3>
                                        <p className="text-xs text-[#8B7355]">
                                            {description}
                                        </p>
                                    </div>

                                    <div>
                                        <h3 className="text-xs font-medium text-[#5C4B37] mb-1">
                                            Fitur Utama
                                        </h3>
                                        <ul className="text-xs text-[#8B7355] list-disc list-inside space-y-0.5">
                                            {features.map((feature, index) => (
                                                <motion.li 
                                                    key={index}
                                                    initial={{ opacity: 0, x: 20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.6 + index * 0.1 }}
                                                >
                                                    {feature}
                                                </motion.li>
                                            ))}
                                        </ul>
                                    </div>
                                </motion.div>

                                <motion.div 
                                    className="flex justify-end gap-2 mt-4 pt-3 border-t border-[#EDE3CD]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <motion.button
                                        className="px-3 py-1.5 text-xs font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded hover:bg-[#EDE3CD] transition-colors"
                                        onClick={handleCloseDetail}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Tutup
                                    </motion.button>
                                    <motion.button
                                        className="px-3 py-1.5 text-xs font-medium text-white bg-[#5C4B37] rounded hover:bg-[#3D3224] transition-colors"
                                        onClick={() => {
                                            handleCloseDetail();
                                            handleBeli();
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        Beli Sekarang
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Purchase Modal */}
            {showPurchaseModal && (
                <div 
                    className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 transition-opacity duration-300"
                    onClick={handleClosePurchase}
                >
                    <div 
                        className="bg-[#FDF6E3] w-full sm:w-[400px] sm:rounded-lg p-4 shadow-xl transform transition-all duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center mb-4">
                            <h3 className="text-base font-medium text-[#5C4B37]">
                                Pilih Marketplace
                            </h3>
                            <p className="mt-1 text-xs text-[#8B7355]">
                                Lanjutkan pembelian {name} melalui marketplace pilihan Anda
                            </p>
                            <p className="mt-1 text-xs font-medium text-[#5C4B37]">
                                {formattedPrice}
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {marketplace.shopee && (
                                <a
                                    href={marketplace.shopee}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-3 rounded bg-[#FE5621] text-white hover:opacity-90 transition-opacity"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/images/marketplace/shopee.png"
                                            alt="Shopee Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="mt-1 text-xs font-medium">Shopee</span>
                                </a>
                            )}

                            {marketplace.tokopedia && (
                                <a
                                    href={marketplace.tokopedia}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-3 rounded bg-[#03AC0E] text-white hover:opacity-90 transition-opacity"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/images/marketplace/tokopedia.webp"
                                            alt="Tokopedia Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="mt-1 text-xs font-medium">Tokopedia</span>
                                </a>
                            )}

                            {marketplace.lazada && (
                                <a
                                    href={marketplace.lazada}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-3 rounded bg-[#0F146D] text-white hover:opacity-90 transition-opacity"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/images/marketplace/lazada.webp"
                                            alt="Lazada Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="mt-1 text-xs font-medium">Lazada</span>
                                </a>
                            )}

                            {marketplace.tiktokshop && (
                                <a
                                    href={marketplace.tiktokshop}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-3 rounded bg-black text-white hover:opacity-90 transition-opacity"
                                >
                                    <div className="relative w-6 h-6">
                                        <Image
                                            src="/images/marketplace/tiktokshop.webp"
                                            alt="TikTok Shop Logo"
                                            fill
                                            className="object-contain"
                                        />
                                    </div>
                                    <span className="mt-1 text-xs font-medium">TikTok Shop</span>
                                </a>
                            )}
                        </div>

                        <div className="mt-4 flex justify-end">
                            <button
                                className="px-3 py-1.5 text-xs font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded hover:bg-[#EDE3CD] transition-colors"
                                onClick={handleClosePurchase}
                            >
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductCardClient; 