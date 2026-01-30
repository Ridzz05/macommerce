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

const slideVariants = {
    enter: (direction: number) => {
        return {
            x: direction > 0 ? "100%" : "-100%",
            opacity: 0
        };
    },
    center: {
        zIndex: 1,
        x: 0,
        opacity: 1
    },
    exit: (direction: number) => {
        return {
            zIndex: 0,
            x: direction < 0 ? "100%" : "-100%",
            opacity: 0
        };
    }
};

const swipeConfidenceThreshold = 10000;
const swipePower = (offset: number, velocity: number) => {
    return Math.abs(offset) * velocity;
};

const ProductCardClient = ({ name, price, imageUrl, images = [], category, demoUrl, description, features, options = [] }: ProductCardProps) => {
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [[currentImageIndex, direction], setPage] = useState([0, 0]);
    const [step, setStep] = useState<'options' | 'marketplace'>('options');
    const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);
    
    // Combine single imageUrl with additional images array
    const allImages = [imageUrl, ...(images || [])];
    
    // Format price to IDR currency
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);

    const paginate = (newDirection: number) => {
        setPage([currentImageIndex + newDirection, newDirection]);
    };

    // Calculate actual index based on page number to handle wrap-around
    const imageIndex = Math.abs(currentImageIndex % allImages.length);
    // Fix negative index wrap-around logic if needed (Math.abs works but not circular backwards)
    // Actually Framer Motion paginate logic usually handles infinite pager. 
    // Here we have finite loop or infinite circle?
    // Let's implement robust circular index:
    const activeIndex = ((currentImageIndex % allImages.length) + allImages.length) % allImages.length;


    const handleDetailClick = () => {
        setShowDetailModal(true);
        setPage([0, 0]);
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
                            >
                                {/* Carousel Image Container */}
                                <div className="relative w-full h-full overflow-hidden">
                                    <AnimatePresence initial={false} custom={direction}>
                                        <motion.div
                                            key={currentImageIndex}
                                            custom={direction}
                                            variants={slideVariants}
                                            initial="enter"
                                            animate="center"
                                            exit="exit"
                                            transition={{
                                                x: { type: "spring", stiffness: 300, damping: 30 },
                                                opacity: { duration: 0.2 }
                                            }}
                                            drag="x"
                                            dragConstraints={{ left: 0, right: 0 }}
                                            dragElastic={1}
                                            onDragEnd={(e, { offset, velocity }) => {
                                                const swipe = swipePower(offset.x, velocity.x);

                                                if (swipe < -swipeConfidenceThreshold) {
                                                    paginate(1);
                                                } else if (swipe > swipeConfidenceThreshold) {
                                                    paginate(-1);
                                                }
                                            }}
                                            className="absolute inset-0 cursor-grab active:cursor-grabbing"
                                        >
                                            <Image
                                                src={allImages[activeIndex]}
                                                alt={`${name} - Image ${activeIndex + 1}`}
                                                fill
                                                className="object-contain"
                                                sizes="(max-width: 640px) 100vw, 480px"
                                                priority
                                                draggable={false}
                                            />
                                        </motion.div>
                                    </AnimatePresence>

                                    {/* Image Indicators */}
                                    {allImages.length > 1 && (
                                        <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-1.5 z-10">
                                            {allImages.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                                        index === activeIndex 
                                                            ? 'bg-[#5C4B37] w-3 scale-110' 
                                                            : 'bg-[#5C4B37]/30 hover:bg-[#5C4B37]/50'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        const newDirection = index > activeIndex ? 1 : -1;
                                                        setPage([index, newDirection]);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                            
                            <motion.div 
                                className="p-3 sm:p-4 overflow-y-auto flex-1"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
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
                                    className="space-y-2"
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
                                    className="flex justify-end gap-2 mt-3 pt-3 border-t border-[#EDE3CD]"
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
                                        <div className="text-center mb-3">
                                            <h3 className="text-base font-medium text-[#5C4B37]">
                                                Pilih Varian
                                            </h3>
                                            <p className="mt-1 text-xs text-[#8B7355]">
                                                Pilih paket yang sesuai dengan kebutuhan Anda
                                            </p>
                                        </div>

                                        <div className="space-y-1.5 mb-4 max-h-[60vh] overflow-y-auto">
                                            {options.map((option, index) => (
                                                <motion.button
                                                    key={index}
                                                    onClick={() => setSelectedOption(option)}
                                                    className={`w-full p-2.5 rounded-lg border flex items-center justify-between transition-all ${
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

                                        <div className="flex justify-end gap-2 pt-3 border-t border-[#EDE3CD]">
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
                                            className="text-center mb-3"
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
                                            className="grid grid-cols-2 gap-2"
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
