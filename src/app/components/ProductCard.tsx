'use client'

import Image from 'next/image';
import { useState, lazy, Suspense } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardProps } from '../types/product';
import { ProductCardServer } from './ProductCardServer';

// Lazy load the detail modal content
const DetailModalContent = lazy(() => import('./DetailModalContent'));

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
    };

    const handleBeli = () => {
        setShowPurchaseModal(true);
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
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-3 sm:p-4 bg-black bg-opacity-50"
                        onClick={(e) => e.target === e.currentTarget && setShowDetailModal(false)}
                    >
                        <motion.div 
                            initial={{ y: 50 }}
                            animate={{ y: 0 }}
                            exit={{ y: 50 }}
                            transition={{ type: "tween", duration: 0.2 }}
                            className="bg-[#FDF6E3] rounded-t-xl sm:rounded-xl overflow-hidden w-full sm:max-w-lg mx-auto shadow-lg"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <Suspense fallback={
                                <div className="w-full h-[400px] flex items-center justify-center">
                                    <div className="w-8 h-8 border-4 border-[#5C4B37] border-t-transparent rounded-full animate-spin"></div>
                                </div>
                            }>
                                <DetailModalContent
                                    name={name}
                                    price={formattedPrice}
                                    imageUrl={imageUrl}
                                    category={category}
                                    description={description}
                                    features={features}
                                    onClose={() => setShowDetailModal(false)}
                                    onBuy={() => {
                                        setShowDetailModal(false);
                                        setShowPurchaseModal(true);
                                    }}
                                />
                            </Suspense>
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
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
                        onClick={(e) => e.target === e.currentTarget && setShowPurchaseModal(false)}
                    >
                        <motion.div 
                            initial={{ scale: 0.95, y: 10 }}
                            animate={{ scale: 1, y: 0 }}
                            exit={{ scale: 0.95, y: 10 }}
                            transition={{ type: "tween", duration: 0.2 }}
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
                                        className="flex flex-col items-center p-4 rounded-lg bg-[#FE5621] text-white hover:bg-opacity-90 transition-all"
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image
                                                src="/images/marketplace/shopee.png"
                                                alt="Shopee Logo"
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
                                        className="flex flex-col items-center p-4 rounded-lg bg-[#03AC0E] text-white hover:bg-opacity-90 transition-all"
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image
                                                src="/images/marketplace/tokopedia.webp"
                                                alt="Tokopedia Logo"
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
                                        className="flex flex-col items-center p-4 rounded-lg bg-[#0F146D] text-white hover:bg-opacity-90 transition-all"
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image
                                                src="/images/marketplace/lazada.webp"
                                                alt="Lazada Logo"
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
                                        className="flex flex-col items-center p-4 rounded-lg bg-black text-white hover:bg-opacity-90 transition-all"
                                    >
                                        <div className="relative w-8 h-8">
                                            <Image
                                                src="/images/marketplace/tiktokshop.webp"
                                                alt="TikTok Shop Logo"
                                                fill
                                                className="object-contain"
                                            />
                                        </div>
                                        <span className="mt-2 text-sm font-medium">TikTok Shop</span>
                                    </motion.a>
                                )}
                            </div>

                            <div className="mt-6 flex justify-end">
                                <button
                                    className="px-4 py-2 text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-all duration-200"
                                    onClick={() => setShowPurchaseModal(false)}
                                >
                                    Tutup
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductCardClient; 