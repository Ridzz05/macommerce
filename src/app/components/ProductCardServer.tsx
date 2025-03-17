import Image from 'next/image';
import { ProductCardServerProps } from '../types/product';

export function ProductCardServer({ name, price, imageUrl, category, onDetailClick, onBeliClick }: ProductCardServerProps) {
    // Format price to IDR currency - moved to server side for better performance
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);

    return (
        <div className="group bg-[#FDF6E3] rounded-xl border border-[#EDE3CD] overflow-hidden hover:border-[#D8C8A7] transition-all duration-300 flex flex-col">
            <div className="relative aspect-square w-full overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
            </div>
            <div className="p-3 sm:p-4 flex flex-col flex-1">
                <div className="flex-1">
                    {category && (
                        <span className="inline-block px-2 py-0.5 text-[10px] sm:text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-2 font-lexend">
                            {category}
                        </span>
                    )}
                    <h3 className="text-xs sm:text-sm font-medium text-[#5C4B37] line-clamp-2 group-hover:text-[#3D3224] font-raleway mb-1">
                        {name}
                    </h3>
                    <p className="text-xs sm:text-sm font-medium text-[#8B7355] font-lexend">
                        {formattedPrice}
                    </p>
                </div>
                
                <div className="flex justify-end items-center gap-2 pt-3 mt-auto border-t border-[#EDE3CD]">
                    <button 
                        className="px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-colors font-lexend inline-flex items-center"
                        onClick={onDetailClick}
                    >
                        <svg 
                            className="w-3 h-3 mr-1" 
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
                    </button>
                    <button 
                        className="px-2.5 py-1.5 text-[11px] sm:text-xs font-medium text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-colors font-lexend inline-flex items-center"
                        onClick={onBeliClick}
                    >
                        <svg 
                            className="w-3 h-3 mr-1" 
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
                    </button>
                </div>
            </div>
        </div>
    );
} 