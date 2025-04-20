import Image from 'next/image';

interface DetailModalContentProps {
    name: string;
    price: string;
    imageUrl: string;
    category?: string;
    description: string;
    features: string[];
    onClose: () => void;
    onBuy: () => void;
}

export default function DetailModalContent({
    name,
    price,
    imageUrl,
    category,
    description,
    features,
    onClose,
    onBuy
}: DetailModalContentProps) {
    return (
        <>
            <div className="relative w-full h-[280px] sm:h-[320px] bg-[#EDE3CD]">
                <Image
                    src={imageUrl}
                    alt={name}
                    fill
                    className="object-contain"
                    sizes="(max-width: 640px) 100vw, 640px"
                    loading="lazy"
                />
            </div>
            
            <div className="p-3 sm:p-4">
                <div className="flex items-start justify-between mb-2 sm:mb-3">
                    <div>
                        {category && (
                            <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-1 font-lexend">
                                {category}
                            </span>
                        )}
                        <h2 className="text-base sm:text-lg font-medium text-[#5C4B37] font-lexend">
                            {name}
                        </h2>
                    </div>
                    <p className="text-base sm:text-lg font-bold text-[#8B7355] font-lexend">
                        {price}
                    </p>
                </div>

                <div className="space-y-2 sm:space-y-3">
                    <div>
                        <h3 className="text-sm font-medium text-[#5C4B37] mb-0.5">
                            Deskripsi Produk
                        </h3>
                        <p className="text-xs sm:text-sm text-[#8B7355]">
                            {description}
                        </p>
                    </div>

                    <div>
                        <h3 className="text-sm font-medium text-[#5C4B37] mb-0.5">
                            Fitur Utama
                        </h3>
                        <ul className="text-xs sm:text-sm text-[#8B7355] list-disc list-inside space-y-0.5">
                            {features.map((feature, index) => (
                                <li key={index}>{feature}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="flex justify-end gap-2 mt-3 sm:mt-4 pt-2 sm:pt-3 border-t border-[#EDE3CD]">
                    <button
                        className="px-3 py-1.5 text-xs sm:text-sm font-medium text-[#5C4B37] bg-white border border-[#EDE3CD] rounded-lg hover:bg-[#EDE3CD] transition-colors"
                        onClick={onClose}
                    >
                        Tutup
                    </button>
                    <button
                        className="px-3 py-1.5 text-xs sm:text-sm font-medium text-white bg-[#5C4B37] rounded-lg hover:bg-[#3D3224] transition-colors"
                        onClick={onBuy}
                    >
                        Beli Sekarang
                    </button>
                </div>
            </div>
        </>
    );
} 