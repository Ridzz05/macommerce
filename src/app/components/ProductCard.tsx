import Image from 'next/image';
import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface ProductCardProps {
    name: string;
    price: number;
    imageUrl: string;
    category?: string; // Make optional to maintain compatibility
    demoUrl?: string;
    marketplace: {
        shopee?: string;
        tokopedia?: string;
        lazada?: string;
        tiktokshop?: string;
    };
}

const ProductCard = ({ name, price, imageUrl, category, demoUrl, marketplace }: ProductCardProps) => {
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

    const marketplaceIcons = {
        shopee: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c1.325 0 2.4 1.075 2.4 2.4S13.325 9.6 12 9.6 9.6 8.525 9.6 7.2 10.675 4.8 12 4.8zM12 21.6c-3.314 0-6-2.686-6-6h12c0 3.314-2.686 6-6 6z"/>
            </svg>
        ),
        tokopedia: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c1.325 0 2.4 1.075 2.4 2.4S13.325 9.6 12 9.6 9.6 8.525 9.6 7.2 10.675 4.8 12 4.8zM12 21.6c-3.314 0-6-2.686-6-6h12c0 3.314-2.686 6-6 6z"/>
            </svg>
        ),
        lazada: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c1.325 0 2.4 1.075 2.4 2.4S13.325 9.6 12 9.6 9.6 8.525 9.6 7.2 10.675 4.8 12 4.8zM12 21.6c-3.314 0-6-2.686-6-6h12c0 3.314-2.686 6-6 6z"/>
            </svg>
        ),
        tiktokshop: (
            <svg className="w-8 h-8" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 4.8c1.325 0 2.4 1.075 2.4 2.4S13.325 9.6 12 9.6 9.6 8.525 9.6 7.2 10.675 4.8 12 4.8zM12 21.6c-3.314 0-6-2.686-6-6h12c0 3.314-2.686 6-6 6z"/>
            </svg>
        ),
    };

    return (
        <>
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="group bg-[#FDF6E3] rounded-xl border border-[#EDE3CD] overflow-hidden hover:border-[#D8C8A7] transition-all duration-300"
            >
                <div className="relative h-36 sm:h-48 w-full overflow-hidden">
                    <Image
                        src={imageUrl}
                        alt={name}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                </div>
                <div className="p-3 sm:p-4 flex flex-col min-h-[100px] sm:min-h-[120px]">
                    <div className="flex-grow space-y-1.5 sm:space-y-2">
                        {category && (
                            <motion.span 
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                className="inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-1 sm:mb-2 font-lexend"
                            >
                                {category}
                            </motion.span>
                        )}
                        <h3 className="text-xs sm:text-sm font-medium text-[#5C4B37] line-clamp-2 group-hover:text-[#3D3224] font-raleway">
                            {name}
                        </h3>
                        <p className="text-xs sm:text-sm font-medium text-[#8B7355] font-lexend">
                            {formattedPrice}
                        </p>
                    </div>
                    
                    <div className="flex justify-end gap-1.5 sm:gap-2 mt-3 pt-2 border-t border-[#EDE3CD]">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-colors font-lexend inline-flex items-center"
                            onClick={handleDetailClick}
                        >
                            <svg 
                                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                />
                            </svg>
                            <span className="whitespace-nowrap">Detail</span>
                        </motion.button>
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-2 sm:px-3 py-1 sm:py-1.5 text-[11px] sm:text-sm font-medium text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-colors font-lexend inline-flex items-center"
                            onClick={handleBeli}
                        >
                            <svg 
                                className="w-3 h-3 sm:w-4 sm:h-4 mr-1 sm:mr-1.5" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                                />
                            </svg>
                            <span className="whitespace-nowrap">Beli</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>

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
                                        className="flex flex-col items-center p-4 rounded-lg bg-[#FE5621] text-white hover:bg-opacity-90 transition-all"
                                    >
                                        {marketplaceIcons.shopee}
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
                                        className="flex flex-col items-center p-4 rounded-lg bg-[#03AC0E] text-white hover:bg-opacity-90 transition-all"
                                    >
                                        {marketplaceIcons.tokopedia}
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
                                        className="flex flex-col items-center p-4 rounded-lg bg-[#0F146D] text-white hover:bg-opacity-90 transition-all"
                                    >
                                        {marketplaceIcons.lazada}
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
                                        className="flex flex-col items-center p-4 rounded-lg bg-black text-white hover:bg-opacity-90 transition-all"
                                    >
                                        {marketplaceIcons.tiktokshop}
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

export default ProductCard; 