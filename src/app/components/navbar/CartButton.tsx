import { ShoppingCart } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useCart } from '@/app/context/CartContext';

export const CartButton = () => {
    const { cartCount, isLoading } = useCart();

    return (
        <Link href="/cart">
            <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                type="button"
                aria-label="Keranjang Belanja"
                className="relative group p-2 sm:p-2.5 rounded-lg border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] hover:border-[#D8C8A7] transition-all duration-300 shadow-sm hover:shadow"
            >
                <ShoppingCart className="w-4 h-4 sm:w-5 sm:h-5" />
                
                {!isLoading && cartCount > 0 && (
                    <motion.span 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute -top-1.5 -right-1.5 min-w-[1.25rem] h-5 px-1 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full shadow-sm"
                    >
                        {cartCount > 99 ? '99+' : cartCount}
                    </motion.span>
                )}
            </motion.button>
        </Link>
    );
};
