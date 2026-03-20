'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardProps } from '../types/product';
import { ProductOption } from '../lib/products';
import { ProductCardServer } from './ProductCardServer';
import { X, ShoppingCart, ChevronLeft, Info, FileText } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { addToCart } from '../actions/cart';

const fullScreenVariants = {
    hidden: {
        y: "100%",
        opacity: 0,
        pointerEvents: "none" as const,
    },
    visible: {
        y: "0%",
        opacity: 1,
        pointerEvents: "auto" as const,
        transition: {
            type: "spring",
            damping: 30,
            stiffness: 300,
            mass: 0.8
        }
    },
    exit: {
        y: "100%",
        opacity: 0,
        pointerEvents: "none" as const,
        transition: {
            duration: 0.3,
            ease: "easeInOut"
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

const ProductCardClient = ({ name, price, discountPrice, imageUrl, images = [], category, demoUrl, description, features, options = [] }: ProductCardProps) => {
    const { refreshCart } = useCart();
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [[currentImageIndex, direction], setPage] = useState([0, 0]);
    const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);
    const [isAdding, setIsAdding] = useState(false);
    
    // Combine single imageUrl with additional images array
    const allImages = [imageUrl, ...(images || [])];
    
    // Format price to IDR currency
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(price);

    const paginate = (newDirection: number) => {
        setPage([currentImageIndex + newDirection, newDirection]);
    };

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
        setSelectedOption(null);
        document.body.style.overflow = 'hidden';
    };

    const handleClosePurchase = () => {
        setShowPurchaseModal(false);
        document.body.style.overflow = 'unset';
    };

    const handleAddToCart = async () => {
        if (options.length > 0 && !selectedOption?.id) {
            alert('Silakan pilih varian produk terlebih dahulu.');
            return;
        }

        // If no options exist, this is invalid based on DB requirements. Wait, fallback to generic error.
        if (options.length === 0) {
            alert('Produk ini belum memiliki varian yang dapat dibeli.');
            return;
        }

        setIsAdding(true);
        try {
            await addToCart(selectedOption!.id!, 1);
            await refreshCart();
            alert('Produk berhasil ditambahkan ke keranjang!');
            handleClosePurchase();
            handleCloseDetail();
        } catch (error) {
            console.error('Error adding to cart:', error);
            alert('Gagal menambahkan produk ke keranjang.');
        } finally {
            setIsAdding(false);
        }
    };

    return (
        <>
            <ProductCardServer
                name={name}
                price={price}
                discountPrice={discountPrice}
                imageUrl={imageUrl}
                category={category}
                onDetailClick={handleDetailClick}
                onBeliClick={handleBeli}
                optionsCount={options.length}
            />

            {/* Detail Full Screen Overlay */}
            <AnimatePresence mode="wait">
                {showDetailModal && (
                    <motion.div 
                        className="fixed inset-0 z-[100] bg-[#FDF6E3] overflow-y-auto flex flex-col"
                        variants={fullScreenVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                        {/* Sticky Header */}
                        <div className="sticky top-0 z-10 bg-[#FDF6E3]/80 backdrop-blur-md border-b border-[#EDE3CD] p-4 flex items-center gap-3">
                            <button 
                                onClick={handleCloseDetail}
                                className="p-2 -ml-2 hover:bg-[#EDE3CD] rounded-full transition-colors"
                            >
                                <ChevronLeft className="w-6 h-6 text-[#5C4B37]" />
                            </button>
                            <h2 className="text-lg font-bold text-[#5C4B37] truncate flex-1">{name}</h2>
                        </div>

                        <div className="flex-1 pb-safe">
                             <div className="relative w-full aspect-[4/3] bg-[#EDE3CD] flex-shrink-0">
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

                                    {/* Discount Badge in Detail */}
                                    {discountPrice && discountPrice > 0 && price > 0 && (
                                        <div className="absolute top-4 left-4 z-20 px-3 py-1.5 bg-[#D32F2F] text-white text-xs font-bold rounded shadow-sm">
                                            {Math.round(((price - discountPrice) / price) * 100)}% OFF
                                        </div>
                                    )}
                                </div>
                            </div>
                            
                            <motion.div 
                                className="p-3 sm:p-4 overflow-y-auto w-full pb-28 md:pb-6"
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
                                    <motion.div
                                        className="flex flex-col items-end"
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.4 }}
                                    >
                                        {discountPrice && discountPrice > 0 ? (
                                            <div className="flex flex-col items-end -space-y-0.5">
                                                <span className="text-xs sm:text-sm text-[#8B7355]/80 line-through decoration-red-500/50">
                                                    {formattedPrice}
                                                </span>
                                                <span className="text-lg sm:text-xl font-bold text-[#D32F2F]">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(discountPrice)}
                                                </span>
                                            </div>
                                        ) : (
                                            <span className="text-lg font-bold text-[#8B7355]">
                                                {formattedPrice}
                                            </span>
                                        )}
                                    </motion.div>
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

                                    {options.length > 0 && (
                                        <div>
                                            <h3 className="text-xs font-medium text-[#5C4B37] mb-1">
                                                Pilihan Varian
                                            </h3>
                                            <div className="space-y-1.5">
                                                {options.map((option, index) => (
                                                    <motion.button
                                                        key={index}
                                                        initial={{ opacity: 0, x: 20 }}
                                                        animate={{ opacity: 1, x: 0 }}
                                                        transition={{ delay: 0.6 + (features.length + index) * 0.1 }}
                                                        onClick={() => setSelectedOption(option)}
                                                        className={`w-full flex items-center justify-between p-2 rounded-lg border transition-all ${
                                                            selectedOption === option
                                                                ? 'border-[#5C4B37] bg-[#EDE3CD]'
                                                                : 'border-[#EDE3CD] bg-white hover:border-[#5C4B37]'
                                                        }`}
                                                        whileTap={{ scale: 0.98 }}
                                                    >
                                                        <span className="text-xs text-[#5C4B37] font-medium">
                                                            {option.label}
                                                        </span>
                                                        <span className="text-xs text-[#8B7355]">
                                                            {option.price === 0 
                                                                ? 'Gratis' 
                                                                : '+ ' + new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(option.price)
                                                            }
                                                        </span>
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>
                                    )}
                                </motion.div>
                            </motion.div>

                            {/* Sticky Bottom Bar */}
                            <motion.div 
                                className="fixed bottom-0 left-0 right-0 p-4 bg-white border-t border-[#EDE3CD] z-20 md:static md:bg-transparent md:border-t-0 md:p-0"
                                initial={{ opacity: 0, y: 100 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.7 }}
                            >
                                <div className="grid grid-cols-2 gap-3 max-w-lg mx-auto w-full md:flex md:justify-end">
                                    <motion.button
                                        className="w-full px-4 py-3 text-sm font-medium text-[#5C4B37] bg-white border border-[#5C4B37] rounded-xl hover:bg-[#5C4B37]/5 transition-all duration-200 flex items-center justify-center gap-2"
                                        onClick={handleCloseDetail}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <X className="w-4 h-4" />
                                        Tutup
                                    </motion.button>
                                    <motion.button
                                        className="w-full px-4 py-3 text-sm font-bold text-white bg-[#5C4B37] rounded-xl hover:bg-[#3D3224] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg md:shadow-none disabled:opacity-50"
                                        onClick={() => {
                                            if (selectedOption) {
                                                handleAddToCart();
                                            } else {
                                                handleBeli();
                                            }
                                        }}
                                        disabled={isAdding}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        {isAdding ? 'Memproses...' : (selectedOption ? 'Tambah Keranjang' : 'Pilih Varian')}
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Purchase Modal */}
            <AnimatePresence mode="wait">
                {showPurchaseModal && (
                    <motion.div 
                        className="fixed inset-0 z-[100] bg-[#FDF6E3] overflow-y-auto flex flex-col"
                        variants={fullScreenVariants}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                    >
                         {/* Sticky Header */}
                        <div className="sticky top-0 z-10 bg-[#FDF6E3]/80 backdrop-blur-md border-b border-[#EDE3CD] p-4 flex items-center justify-between gap-3">
                             <div className="flex items-center gap-2">
                                <h2 className="text-lg font-bold text-[#5C4B37]">
                                    Pilih Varian
                                </h2>
                            </div>
                            <button 
                                onClick={handleClosePurchase}
                                className="p-2 -mr-2 hover:bg-[#EDE3CD] rounded-full transition-colors"
                            >
                                <X className="w-6 h-6 text-[#5C4B37]" />
                            </button>
                        </div>

                        <div className="flex-1 p-4 pb-safe max-w-lg mx-auto w-full">
                            <motion.div
                                key="options"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.2 }}
                                className="space-y-4"
                            >
                                <div className="text-center mb-6">
                                    <p className="text-sm text-[#8B7355]">
                                        Silakan pilih varian untuk produk <strong>{name}</strong>
                                    </p>
                                </div>

                                <div className="space-y-3">
                                    {options.map((option, index) => (
                                        <motion.button
                                            key={index}
                                            onClick={() => setSelectedOption(option)}
                                            className={`w-full p-4 rounded-xl border-2 flex items-center justify-between transition-all ${
                                                selectedOption === option
                                                    ? 'border-[#5C4B37] bg-[#EDE3CD] shadow-sm'
                                                    : 'border-[#EDE3CD] bg-white hover:border-[#5C4B37]/50'
                                            }`}
                                            initial={{ opacity: 0, scale: 0.95 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            transition={{ delay: index * 0.05 }}
                                            whileTap={{ scale: 0.98 }}
                                        >
                                            <span className="text-base font-semibold text-[#5C4B37]">{option.label}</span>
                                            <span className="text-sm font-medium text-[#8B7355]">
                                                {option.price === 0 ? 'Gratis' : '+ ' + new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(option.price)}
                                            </span>
                                        </motion.button>
                                    ))}
                                </div>

                                <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-[#EDE3CD] z-20">
                                    <div className="max-w-lg mx-auto w-full">
                                         <button
                                            className={`w-full py-3.5 text-base font-bold text-white rounded-xl transition-all shadow-md flex items-center justify-center gap-2 ${
                                                selectedOption && !isAdding
                                                    ? 'bg-[#5C4B37] hover:bg-[#3D3224] active:scale-[0.98]' 
                                                    : 'bg-[#8B7355]/40 cursor-not-allowed'
                                            }`}
                                            onClick={handleAddToCart}
                                            disabled={!selectedOption || isAdding}
                                        >
                                            <ShoppingCart className="w-5 h-5"/>
                                            {isAdding ? 'Memproses...' : 'Tambahkan ke Keranjang'}
                                        </button>
                                    </div>
                                </div>
                                {/* Spacer for fixed footer */}
                                <div className="h-24" />
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductCardClient;
