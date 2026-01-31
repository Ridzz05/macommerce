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

    return (
        <div className="group bg-[#FDF6E3] rounded-lg border border-[#EDE3CD] overflow-hidden hover:border-[#D8C8A7] transition-all duration-300 flex flex-col h-full">
            <div className="relative w-full aspect-square overflow-hidden">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
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
                    <h3 className="text-xs font-medium text-[#5C4B37] line-clamp-2 group-hover:text-[#3D3224] mb-1 leading-tight">
                        {name}
                    </h3>
                    <div className="flex flex-col gap-0.5 mt-1">
                        {discountPrice && discountPrice > 0 ? (
                            <>
                                <p className="text-[10px] text-[#8B7355] line-through decoration-[#8B7355]/40">
                                    {formattedPrice}
                                </p>
                                <p className="text-xs font-bold text-[#D32F2F]">
                                    {formattedDiscountPrice}
                                </p>
                            </>
                        ) : (
                            <p className="text-xs font-medium text-[#8B7355]">
                                {formattedPrice}
                            </p>
                        )}
                    </div>
                </div>
                
                <div className="flex justify-center items-center gap-1.5 sm:gap-2 pt-2 mt-auto border-t border-[#EDE3CD]">
                    <button 
                        className="px-2 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-all duration-200 flex items-center gap-1 sm:gap-1.5"
                        onClick={onDetailClick}
                    >
                        <Info className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">Detail</span>
                    </button>
                    <button 
                        className="px-2 py-1.5 sm:px-3 sm:py-2 text-[10px] sm:text-sm font-medium text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-all duration-200 flex items-center gap-1 sm:gap-1.5"
                        onClick={onBeliClick}
                    >
                        <ShoppingCart className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
                        <span className="whitespace-nowrap">Beli</span>
                    </button>
                </div>
            </div>
        </div>
    );
}