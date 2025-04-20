'use client'

import Image from 'next/image';
import { useState } from 'react';
import { ProductCardProps } from '../types/product';
import { ProductCardServer } from './ProductCardServer';

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
        // Prevent scrolling when modal is open
        document.body.style.overflow = 'hidden';
    };

    const handleCloseDetail = () => {
        setShowDetailModal(false);
        // Re-enable scrolling
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
            {showDetailModal && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300"
                    onClick={handleCloseDetail}
                >
                    <div 
                        className="bg-[#FDF6E3] rounded-xl overflow-hidden w-full max-w-lg mx-auto shadow-xl transform transition-all duration-300 opacity-100 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="relative w-full h-[280px] sm:h-[320px] bg-[#EDE3CD]">
                            <Image
                                src={imageUrl}
                                alt={name}
                                fill
                                className="object-contain"
                                sizes="(max-width: 640px) 100vw, 640px"
                            />
                        </div>
                        
                        <div className="p-4 sm:p-6">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    {category && (
                                        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-1">
                                            {category}
                                        </span>
                                    )}
                                    <h2 className="text-lg sm:text-xl font-medium text-[#5C4B37]">
                                        {name}
                                    </h2>
                                </div>
                                <p className="text-lg sm:text-xl font-bold text-[#8B7355]">
                                    {formattedPrice}
                                </p>
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <h3 className="text-sm font-medium text-[#5C4B37] mb-1">
                                        Deskripsi Produk
                                    </h3>
                                    <p className="text-sm text-[#8B7355]">
                                        {description}
                                    </p>
                                </div>

                                <div>
                                    <h3 className="text-sm font-medium text-[#5C4B37] mb-1">
                                        Fitur Utama
                                    </h3>
                                    <ul className="text-sm text-[#8B7355] list-disc list-inside space-y-1">
                                        {features.map((feature, index) => (
                                            <li key={index}>{feature}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            <div className="flex justify-end gap-3 mt-6 pt-4 border-t border-[#EDE3CD]">
                                <button
                                    className="px-4 py-2 text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-colors"
                                    onClick={handleCloseDetail}
                                >
                                    Tutup
                                </button>
                                <button
                                    className="px-4 py-2 text-sm font-medium text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-colors"
                                    onClick={() => {
                                        handleCloseDetail();
                                        handleBeli();
                                    }}
                                >
                                    Beli Sekarang
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            )}

            {/* Purchase Modal */}
            {showPurchaseModal && (
                <div 
                    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 transition-opacity duration-300"
                    onClick={handleClosePurchase}
                >
                    <div 
                        className="bg-[#FDF6E3] rounded-xl p-6 max-w-sm w-full mx-auto shadow-xl transform transition-all duration-300 opacity-100 scale-100"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="text-center mb-6">
                            <h3 className="text-lg font-medium text-[#5C4B37]">
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
                                <a
                                    href={marketplace.shopee}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-4 rounded-lg bg-[#FE5621] text-white hover:opacity-90 transition-opacity"
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
                                </a>
                            )}

                            {marketplace.tokopedia && (
                                <a
                                    href={marketplace.tokopedia}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-4 rounded-lg bg-[#03AC0E] text-white hover:opacity-90 transition-opacity"
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
                                </a>
                            )}

                            {marketplace.lazada && (
                                <a
                                    href={marketplace.lazada}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-4 rounded-lg bg-[#0F146D] text-white hover:opacity-90 transition-opacity"
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
                                </a>
                            )}

                            {marketplace.tiktokshop && (
                                <a
                                    href={marketplace.tiktokshop}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex flex-col items-center p-4 rounded-lg bg-black text-white hover:opacity-90 transition-opacity"
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
                                </a>
                            )}
                        </div>

                        <div className="mt-6 flex justify-end">
                            <button
                                className="px-4 py-2 text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-colors"
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