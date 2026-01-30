'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardProps, ProductOption } from '../types/product';
import { ProductCardServer } from './ProductCardServer';
import { X, ShoppingCart, ChevronLeft } from 'lucide-react';
import { CONTACT_INFO } from '../data/contact';

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

const ProductCardClient = ({ name, price, imageUrl, images = [], category, demoUrl, description, features, options = [] }: ProductCardProps) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [step, setStep] = useState<'options' | 'marketplace'>('options');
    const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);
    
    // Combine single imageUrl with additional images array
    const allImages = [imageUrl, ...(images || [])];
    
    // Format price to IDR currency
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);

    const handleDetailClick = () => {
        setShowDetailModal(true);
        setCurrentImageIndex(0);
        document.body.style.overflow = 'hidden';
    };

    const handleCloseDetail = () => {
        setShowDetailModal(false);
        document.body.style.overflow = 'unset';
    };

    const handleBeli = () => {
        setShowPurchaseModal(true);
        setStep(options.length > 0 ? 'options' : 'marketplace');
        setSelectedOption(null);
        document.body.style.overflow = 'hidden';
    };

    const handleClosePurchase = () => {
        setShowPurchaseModal(false);
        document.body.style.overflow = 'unset';
    };

    const nextImage = () => {
        setCurrentImageIndex((prev) => (prev + 1) % allImages.length);
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) => (prev - 1 + allImages.length) % allImages.length);
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
                                className="relative w-full aspect-square bg-[#EDE3CD] flex-shrink-0"
                                variants={imageVariants}
                            >
                                <motion.div
                                    key={currentImageIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute inset-0"
                                >
                                    <Image
                                        src={allImages[currentImageIndex]}
                                        alt={`${name} - Image ${currentImageIndex + 1}`}
                                        fill
                                        className="object-contain"
                                        sizes="(max-width: 640px) 100vw, 480px"
                                        priority
                                    />
                                </motion.div>

                                {allImages.length > 1 && (
                                    <>
                                        {/* Navigation Arrows */}
                                        <motion.button
                                            className="absolute left-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 text-[#5C4B37] hover:bg-white transition-colors z-10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                prevImage();
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                                            </svg>
                                        </motion.button>
                                        <motion.button
                                            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white/80 text-[#5C4B37] hover:bg-white transition-colors z-10"
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                nextImage();
                                            }}
                                            whileHover={{ scale: 1.1 }}
                                            whileTap={{ scale: 0.9 }}
                                        >
                                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                                            </svg>
                                        </motion.button>

                                        {/* Image Indicators */}
                                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                                            {allImages.map((_, index) => (
                                                <motion.button
                                                    key={index}
                                                    className={`w-1.5 h-1.5 rounded-full transition-colors ${
                                                        index === currentImageIndex 
                                                            ? 'bg-[#5C4B37]' 
                                                            : 'bg-white/60 hover:bg-white'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        setCurrentImageIndex(index);
                                                    }}
                                                    whileHover={{ scale: 1.2 }}
                                                    whileTap={{ scale: 0.8 }}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
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
                                    className="flex justify-end gap-3 mt-4 pt-4 border-t border-[#EDE3CD]"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.7 }}
                                >
                                    <motion.button
                                        className="px-4 py-2.5 text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-all duration-200 flex items-center gap-2"
                                        onClick={handleCloseDetail}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <X className="w-4 h-4" />
                                        Tutup
                                    </motion.button>
                                    <motion.button
                                        className="px-4 py-2.5 text-sm font-medium text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-all duration-200 flex items-center gap-2"
                                        onClick={() => {
                                            handleCloseDetail();
                                            handleBeli();
                                        }}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Beli Sekarang
                                    </motion.button>
                                </motion.div>
                            </motion.div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Purchase Modal */}
            <AnimatePresence mode="wait">
                {showPurchaseModal && (
                    <motion.div 
                        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-black/50 backdrop-blur-sm"
                        variants={modalVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        onClick={handleClosePurchase}
                    >
                        <motion.div 
                            className="bg-[#FDF6E3] w-full sm:w-[400px] sm:rounded-lg p-4 shadow-xl transform transition-all duration-300"
                            variants={contentVariants}
                            onClick={(e) => e.stopPropagation()}
                        >
                                {step === 'options' ? (
                                    <>
                                        <div className="text-center mb-4">
                                            <h3 className="text-base font-medium text-[#5C4B37]">
                                                Pilih Varian
                                            </h3>
                                            <p className="mt-1 text-xs text-[#8B7355]">
                                                Pilih paket yang sesuai dengan kebutuhan Anda
                                            </p>
                                        </div>

                                        <div className="space-y-2 mb-6 max-h-[60vh] overflow-y-auto">
                                            {options.map((option, index) => (
                                                <motion.button
                                                    key={index}
                                                    onClick={() => setSelectedOption(option)}
                                                    className={`w-full p-3 rounded-lg border flex items-center justify-between transition-all ${
                                                        selectedOption === option
                                                            ? 'border-[#5C4B37] bg-[#EDE3CD]'
                                                            : 'border-[#EDE3CD] bg-white hover:border-[#5C4B37]'
                                                    }`}
                                                    whileTap={{ scale: 0.98 }}
                                                >
                                                    <span className="text-sm font-medium text-[#5C4B37]">{option.label}</span>
                                                    <span className="text-sm text-[#8B7355]">
                                                        {option.price === 0 ? 'Hubungi Admin' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(option.price)}
                                                    </span>
                                                </motion.button>
                                            ))}
                                        </div>

                                        <div className="flex justify-end gap-3 pt-4 border-t border-[#EDE3CD]">
                                            <button
                                                className="px-4 py-2 text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD]"
                                                onClick={handleClosePurchase}
                                            >
                                                Batal
                                            </button>
                                            <button
                                                className={`px-4 py-2 text-sm font-medium text-white rounded-lg transition-colors flex items-center gap-2 ${
                                                    selectedOption 
                                                        ? 'bg-[#5C4B37] hover:bg-[#3D3224]' 
                                                        : 'bg-gray-400 cursor-not-allowed'
                                                }`}
                                                onClick={() => selectedOption && setStep('marketplace')}
                                                disabled={!selectedOption}
                                            >
                                                Lanjut
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <>
                                        <motion.div 
                                            className="text-center mb-4"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.2 }}
                                        >
                                            <motion.h3 
                                                className="text-base font-medium text-[#5C4B37]"
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: 0.3 }}
                                            >
                                                Pilih Marketplace
                                            </motion.h3>
                                            <motion.p 
                                                className="mt-1 text-xs text-[#8B7355]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                Lanjutkan pembelian {name} {selectedOption ? `(${selectedOption.label})` : ''}
                                            </motion.p>
                                            <motion.p 
                                                className="mt-1 text-xs font-medium text-[#5C4B37]"
                                                initial={{ opacity: 0 }}
                                                animate={{ opacity: 1 }}
                                                transition={{ delay: 0.4 }}
                                            >
                                                {selectedOption && selectedOption.price > 0 
                                                    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedOption.price)
                                                    : formattedPrice}
                                            </motion.p>
                                        </motion.div>

                                        <motion.div 
                                            className="grid grid-cols-2 gap-3"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            transition={{ delay: 0.5 }}
                                        >
                                            <motion.a
                                                href={`https://wa.me/${CONTACT_INFO.whatsapp}?text=Halo,%20saya%20tertarik%20dengan%20produk%20${encodeURIComponent(name)}${selectedOption ? `%20(${encodeURIComponent(selectedOption.label)})` : ''}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col items-center p-3 rounded-xl bg-[#25D366] text-white hover:opacity-90 transition-opacity shadow-sm"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.7 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className="relative w-8 h-8 mb-1">
                                                    <Image
                                                        src="/images/marketplace/wa.svg"
                                                        alt="WhatsApp"
                                                        fill
                                                        className="object-contain"
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold">WhatsApp</span>
                                            </motion.a>

                                            <motion.a
                                                href={`https://instagram.com/${CONTACT_INFO.instagram}`}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="flex flex-col items-center p-3 rounded-xl bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] text-white hover:opacity-90 transition-opacity shadow-sm"
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                animate={{ scale: 1, opacity: 1 }}
                                                transition={{ delay: 0.8 }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <div className="relative w-8 h-8 mb-1">
                                                    <Image
                                                        src="/images/marketplace/ig.svg"
                                                        alt="Instagram"
                                                        fill
                                                        className="object-contain invert" 
                                                    />
                                                </div>
                                                <span className="text-xs font-semibold">Instagram</span>
                                            </motion.a>
                                        </motion.div>

                                        <motion.div 
                                            className="mt-4 flex justify-between items-center"
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 1 }}
                                        >
                                            {options.length > 0 && (
                                                <button
                                                    className="px-3 py-2 text-sm font-medium text-[#5C4B37] hover:bg-[#EDE3CD] rounded-lg transition-colors flex items-center gap-1"
                                                    onClick={() => setStep('options')}
                                                >
                                                    <ChevronLeft className="w-4 h-4" />
                                                    Kembali
                                                </button>
                                            )}
                                            <motion.button
                                                className="px-4 py-2.5 text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-all duration-200 flex items-center gap-2 ml-auto"
                                                onClick={handleClosePurchase}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <X className="w-4 h-4" />
                                                Tutup
                                            </motion.button>
                                        </motion.div>
                                    </>
                                )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductCardClient; 
