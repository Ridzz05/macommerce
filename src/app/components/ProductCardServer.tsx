import Image from 'next/image';
import { ProductCardServerProps } from '../types/product';
import { Info, ShoppingCart } from 'lucide-react';

export function ProductCardServer({ name, price, discountPrice, imageUrl, category, onDetailClick, onBeliClick, optionsCount = 0 }: ProductCardServerProps) {
    // Format price to IDR currency - moved to server side for better performance
    const formattedPrice = new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(price);

    const formattedDiscountPrice = discountPrice ? new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(discountPrice) : null;

    const discountPercentage = discountPrice && price > 0 
        ? Math.round(((price - discountPrice) / price) * 100) 
        : 0;

    return (
        <div className="group bg-[#FDF6E3] rounded-lg border border-[#EDE3CD] overflow-hidden hover:border-[#D8C8A7] transition-all duration-300 flex flex-col h-full relative">
            <div className="relative w-full aspect-square overflow-hidden bg-[#EDE3CD]">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                
                {/* Discount Badge */}
                {discountPrice && discountPrice > 0 && discountPercentage > 0 && (
                    <div className="absolute top-2 left-2 z-10 px-2 py-1 bg-[#D32F2F] text-white text-[10px] font-bold rounded shadow-sm">
                        {discountPercentage}% OFF
                    </div>
                )}

                {optionsCount > 0 && (
                    <div className="absolute top-2 right-2 px-1.5 py-0.5 bg-black/50 backdrop-blur-sm rounded text-[10px] font-medium text-white shadow-sm border border-white/10">
                        {optionsCount} Varian
                    </div>
                )}
            </div>
            <div className="p-2.5 sm:p-3 flex flex-col flex-1">
                <div className="flex-1 min-h-0">
                    {category && (
                        <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-1">
                            {category}
                        </span>
                    )}
                    <h3 className="text-xs font-medium text-[#5C4B37] line-clamp-2 group-hover:text-[#3D3224] mb-1 leading-tight min-h-[2.5em]">
                        {name}
                    </h3>
                    <div className="flex flex-col gap-0.5 mt-1">
                        {discountPrice && discountPrice > 0 ? (
                            <div className="flex flex-col items-start -space-y-0.5">
                                <p className="text-[10px] sm:text-xs text-[#8B7355]/80 line-through decoration-red-500/50">
                                    {formattedPrice}
                                </p>
                                <p className="text-sm sm:text-base font-bold text-[#D32F2F]">
                                    {formattedDiscountPrice}
                                </p>
                            </div>
                        ) : (
                            <p className="text-sm font-bold text-[#5C4B37]">
                                {formattedPrice}
                            </p>
                        )}
                    </div>
                </div>
                
                <div className="grid grid-cols-2 gap-2 pt-2 mt-auto border-t border-[#EDE3CD]">
                    <button 
                        className="w-full px-2 py-2 text-xs sm:text-sm font-medium text-[#5C4B37] bg-transparent border border-[#5C4B37] rounded-lg hover:bg-[#5C4B37]/5 transition-all duration-200 flex items-center justify-center gap-1.5"
                        onClick={onDetailClick}
                    >
                        <Info className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>Detail</span>
                    </button>
                    <button 
                        className="w-full px-2 py-2 text-xs sm:text-sm font-bold text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-all duration-200 flex items-center justify-center gap-1.5 shadow-sm"
                        onClick={onBeliClick}
                    >
                        <ShoppingCart className="w-3.5 h-3.5 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span>Beli</span>
                    </button>
                </div>
            </div>
        </div>
    );
}