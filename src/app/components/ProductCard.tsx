'use client'

import Image from 'next/image';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ProductCardProps, ProductOption } from '../types/product';
import { ProductCardServer } from './ProductCardServer';
import { X, ShoppingCart, ChevronLeft, Info, User, Phone, Mail, FileText } from 'lucide-react';
import { CONTACT_INFO } from '../data/contact';

const fullScreenVariants = {
    hidden: {
        y: "100%",
        opacity: 0,
        pointerEvents: "none" as const, // Fix for type issue if strictly typed, but "none" is valid CSS
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
    const [showPurchaseModal, setShowPurchaseModal] = useState(false);
    const [showDetailModal, setShowDetailModal] = useState(false);
    const [[currentImageIndex, direction], setPage] = useState([0, 0]);
    const [step, setStep] = useState<'options' | 'order-form'>('options');
    const [selectedOption, setSelectedOption] = useState<ProductOption | null>(null);
    const [orderForm, setOrderForm] = useState({
        name: '',
        whatsapp: '',
        email: '',
        note: ''
    });
    
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
        setStep(options.length > 0 ? 'options' : 'order-form');
        setSelectedOption(null);
        setOrderForm({ name: '', whatsapp: '', email: '', note: '' });
        document.body.style.overflow = 'hidden';
    };

    const handleClosePurchase = () => {
        setShowPurchaseModal(false);
        document.body.style.overflow = 'unset';
    };

    const handleOrderSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        
        // Basic validation
        if (!orderForm.name || !orderForm.whatsapp) {
            alert('Mohon isi Nama dan Nomor WhatsApp');
            return;
        }

        const message = `Halo Admin, saya ingin membuat pesanan:

*DETAIL PESANAN*
-----------------------------
*Produk*  : ${name}
${selectedOption ? `*Varian*  : ${selectedOption.label}` : ''}
*Harga*   : ${selectedOption && selectedOption.price > 0 
    ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedOption.price)
    : formattedPrice}

*DATA PEMBELI*
-----------------------------
*Nama*    : ${orderForm.name}
*No. WA*  : ${orderForm.whatsapp}
${orderForm.email ? `*Email*   : ${orderForm.email}` : ''}
${orderForm.note ? `*Catatan* : ${orderForm.note}` : ''}

Mohon diproses, terima kasih!`;

        const whatsappUrl = `https://wa.me/${CONTACT_INFO.whatsapp}?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
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
                                </div>
                            </div>
                            
                            <motion.div 
                                className="p-3 sm:p-4 overflow-y-auto w-full pb-28 md:pb-6"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.2 }}
                            >
                                <div className="flex items-start justify-between gap-2 mb-2">
                                    {/* ... content unchanged ... */}
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
                                            <>
                                                <span className="text-xs text-[#8B7355] line-through decoration-[#8B7355]/40 mb-0.5">
                                                    {formattedPrice}
                                                </span>
                                                <span className="text-lg font-bold text-[#D32F2F]">
                                                    {new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(discountPrice)}
                                                </span>
                                            </>
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
                                                                ? 'Hubungi Admin' 
                                                                : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(option.price)
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
                                        className="w-full px-4 py-3 text-sm font-bold text-white bg-[#5C4B37] rounded-xl hover:bg-[#3D3224] transition-all duration-200 flex items-center justify-center gap-2 shadow-lg md:shadow-none"
                                        onClick={() => {
                                            handleCloseDetail();
                                            // If variant already selected in detail modal, skip to marketplace
                                            if (selectedOption) {
                                                setShowPurchaseModal(true);
                                                setStep('order-form');
                                                setOrderForm({ name: '', whatsapp: '', email: '', note: '' });
                                                document.body.style.overflow = 'hidden';
                                            } else {
                                                handleBeli();
                                            }
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <ShoppingCart className="w-4 h-4" />
                                        Beli Sekarang
                                    </motion.button>
                                </div>
                            </motion.div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Purchase Modal */}
            {/* Purchase Full Screen Overlay */}
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
                                {(step === 'order-form' && options.length > 0) && (
                                     <button 
                                        onClick={() => setStep('options')}
                                        className="p-2 -ml-2 hover:bg-[#EDE3CD] rounded-full transition-colors"
                                    >
                                        <ChevronLeft className="w-6 h-6 text-[#5C4B37]" />
                                    </button>
                                )}
                                <h2 className="text-lg font-bold text-[#5C4B37]">
                                    {step === 'options' ? 'Pilih Varian' : 'Detail Pesanan'}
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
                                {step === 'options' ? (
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
                                                Silakan pilih paket untuk produk <strong>{name}</strong>
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
                                                        {option.price === 0 ? 'Hubungi Admin' : new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(option.price)}
                                                    </span>
                                                </motion.button>
                                            ))}
                                        </div>

                                        <div className="fixed bottom-0 left-0 right-0 p-4 bg-white/90 backdrop-blur border-t border-[#EDE3CD] z-20">
                                            <div className="max-w-lg mx-auto w-full">
                                                 <button
                                                    className={`w-full py-3.5 text-base font-bold text-white rounded-xl transition-all shadow-md ${
                                                        selectedOption 
                                                            ? 'bg-[#5C4B37] hover:bg-[#3D3224] active:scale-[0.98]' 
                                                            : 'bg-[#8B7355]/40 cursor-not-allowed'
                                                    }`}
                                                    onClick={() => selectedOption && setStep('order-form')}
                                                    disabled={!selectedOption}
                                                >
                                                    Lanjut ke Pengisian Data
                                                </button>
                                            </div>
                                        </div>
                                        {/* Spacer for fixed footer */}
                                        <div className="h-24" />
                                    </motion.div>
                                ) : (
                                    <motion.div
                                        key="order-form"
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.2 }}
                                        className="space-y-6"
                                    >
                                        {/* Product Summary Card */}
                                        <div className="bg-[#FDF6E3] p-4 rounded-xl border border-[#EDE3CD] flex gap-4 items-center">
                                            <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border border-[#EDE3CD]">
                                                <Image 
                                                    src={imageUrl} 
                                                    alt={name} 
                                                    fill 
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <h3 className="text-sm font-bold text-[#5C4B37] truncate">{name}</h3>
                                                {selectedOption && (
                                                    <p className="text-xs text-[#8B7355] mt-0.5 bg-white/50 px-2 py-0.5 rounded-md inline-block">
                                                        {selectedOption.label}
                                                    </p>
                                                )}
                                                <p className="text-sm font-bold text-[#D32F2F] mt-1">
                                                    {selectedOption && selectedOption.price > 0 
                                                        ? new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR' }).format(selectedOption.price)
                                                        : formattedPrice}
                                                </p>
                                            </div>
                                        </div>

                                        <form onSubmit={handleOrderSubmit} className="space-y-6">
                                            {/* Section: Data Diri */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-semibold text-[#5C4B37] border-b border-[#EDE3CD] pb-2">
                                                    Data Pemesan
                                                </h4>
                                                
                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-[#8B7355] mb-1.5 ml-1">Nama Lengkap <span className="text-red-500">*</span></label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                                <User className="w-4 h-4 text-[#8B7355]/70" />
                                                            </div>
                                                            <input
                                                                type="text"
                                                                required
                                                                value={orderForm.name}
                                                                onChange={(e) => setOrderForm({...orderForm, name: e.target.value})}
                                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDE3CD] focus:ring-2 focus:ring-[#5C4B37]/20 focus:border-[#5C4B37] outline-none bg-white transition-all placeholder:text-[#8B7355]/40 text-sm"
                                                                placeholder="Nama lengkap Anda"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-[#8B7355] mb-1.5 ml-1">Nomor WhatsApp <span className="text-red-500">*</span></label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                                <Phone className="w-4 h-4 text-[#8B7355]/70" />
                                                            </div>
                                                            <input
                                                                type="tel"
                                                                required
                                                                value={orderForm.whatsapp}
                                                                onChange={(e) => setOrderForm({...orderForm, whatsapp: e.target.value})}
                                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDE3CD] focus:ring-2 focus:ring-[#5C4B37]/20 focus:border-[#5C4B37] outline-none bg-white transition-all placeholder:text-[#8B7355]/40 text-sm"
                                                                placeholder="Contoh: 08123456789"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Section: Info Tambahan */}
                                            <div className="space-y-4">
                                                <h4 className="text-sm font-semibold text-[#5C4B37] border-b border-[#EDE3CD] pb-2">
                                                    Info Tambahan
                                                </h4>

                                                <div className="space-y-3">
                                                    <div>
                                                        <label className="block text-xs font-medium text-[#8B7355] mb-1.5 ml-1">Email <span className="text-[10px] text-[#8B7355]/60">(Opsional)</span></label>
                                                        <div className="relative">
                                                            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none">
                                                                <Mail className="w-4 h-4 text-[#8B7355]/70" />
                                                            </div>
                                                            <input
                                                                type="email"
                                                                value={orderForm.email}
                                                                onChange={(e) => setOrderForm({...orderForm, email: e.target.value})}
                                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDE3CD] focus:ring-2 focus:ring-[#5C4B37]/20 focus:border-[#5C4B37] outline-none bg-white transition-all placeholder:text-[#8B7355]/40 text-sm"
                                                                placeholder="email@kamu.com"
                                                            />
                                                        </div>
                                                    </div>

                                                    <div>
                                                        <label className="block text-xs font-medium text-[#8B7355] mb-1.5 ml-1">Catatan Pesanan <span className="text-[10px] text-[#8B7355]/60">(Opsional)</span></label>
                                                        <div className="relative">
                                                            <div className="absolute top-3.5 left-3.5 pointer-events-none">
                                                                <FileText className="w-4 h-4 text-[#8B7355]/70" />
                                                            </div>
                                                            <textarea
                                                                value={orderForm.note}
                                                                onChange={(e) => setOrderForm({...orderForm, note: e.target.value})}
                                                                rows={3}
                                                                className="w-full pl-10 pr-4 py-3 rounded-xl border border-[#EDE3CD] focus:ring-2 focus:ring-[#5C4B37]/20 focus:border-[#5C4B37] outline-none bg-white transition-all placeholder:text-[#8B7355]/40 text-sm resize-none"
                                                                placeholder="Ada permintaan khusus?"
                                                            />
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>

                                            <button
                                                type="submit"
                                                className="w-full py-4 mt-6 text-base font-bold text-white bg-[#25D366] hover:bg-[#128C7E] rounded-xl transition-all shadow-lg hover:shadow-xl active:scale-[0.98] flex items-center justify-center gap-2.5"
                                            >
                                                <Image
                                                    src="/images/marketplace/wa_white.svg"
                                                    alt="WhatsApp"
                                                    width={24}
                                                    height={24}
                                                    className="object-contain"
                                                />
                                                Lanjut Order via WhatsApp
                                            </button>
                                            <p className="text-center text-[10px] text-[#8B7355]/80 mt-2 px-4">
                                                *Data akan dikirim ke WhatsApp Admin secara otomatis. Tidak ada pembayaran di halaman ini.
                                            </p>
                                        </form>
                                    </motion.div>
                                )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default ProductCardClient; 
