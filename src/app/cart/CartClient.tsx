'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight } from 'lucide-react';
import { updateCartItemQuantity, removeFromCart, clearCart } from '@/app/actions/cart';
import { useCart } from '@/app/context/CartContext';

interface EnrichedCartItem {
    variant_id: string;
    quantity: number;
    productName: string;
    variantName: string;
    price: number;
    imageUrl: string;
    sku: string;
}

interface CartClientProps {
    initialItems: EnrichedCartItem[];
}

export default function CartClient({ initialItems }: CartClientProps) {
    const [items, setItems] = useState<EnrichedCartItem[]>(initialItems);
    const [isUpdating, setIsUpdating] = useState<string | null>(null);
    const { refreshCart } = useCart();

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const handleUpdateQuantity = async (variantId: string, currentQuantity: number, change: number) => {
        const newQuantity = currentQuantity + change;
        if (newQuantity < 1) return;

        setIsUpdating(variantId);
        try {
            // Optimistic update
            setItems(prev => prev.map(item => 
                item.variant_id === variantId ? { ...item, quantity: newQuantity } : item
            ));
            
            await updateCartItemQuantity(variantId, newQuantity);
            await refreshCart();
        } catch (error) {
            console.error('Failed to update quantity', error);
            // Revert on error (could fetch from server again, but simple revert here)
            setItems(prev => prev.map(item => 
                item.variant_id === variantId ? { ...item, quantity: currentQuantity } : item
            ));
        } finally {
            setIsUpdating(null);
        }
    };

    const handleRemove = async (variantId: string) => {
        setIsUpdating(variantId);
        try {
            setItems(prev => prev.filter(item => item.variant_id !== variantId));
            await removeFromCart(variantId);
            await refreshCart();
        } catch (error) {
            console.error('Failed to remove item', error);
            window.location.reload(); // Hard fallback
        } finally {
            setIsUpdating(null);
        }
    };

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    if (items.length === 0) {
        return (
            <div className="min-h-[70vh] flex flex-col items-center justify-center p-4">
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="w-48 h-48 bg-[#F5ECD6] rounded-full flex items-center justify-center mb-6"
                >
                    <ShoppingBag className="w-20 h-20 text-[#D8C8A7]" />
                </motion.div>
                <h1 className="text-2xl font-bold text-[#5C4B37] mb-2 text-center">Keranjang Anda Kosong</h1>
                <p className="text-[#8B7355] text-center mb-8 max-w-sm">
                    Temukan produk digital dan tools terbaik untuk kebutuhan Anda di halaman utama.
                </p>
                <Link href="/">
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-8 py-4 bg-[#5C4B37] text-white font-bold rounded-xl shadow-lg hover:bg-[#3D3224] transition-colors"
                    >
                        Mulai Belanja
                    </motion.button>
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5C4B37] mb-8">Keranjang Belanja</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Cart Items List */}
                <div className="flex-1 space-y-4">
                    <AnimatePresence mode="popLayout">
                        {items.map((item) => (
                            <motion.div
                                layout
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, scale: 0.9 }}
                                key={item.variant_id}
                                className="bg-white p-4 rounded-2xl shadow-sm border border-[#EDE3CD] flex gap-4 relative overflow-hidden group"
                            >
                                <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-xl border border-[#EDE3CD] bg-[#FDF6E3] flex-shrink-0 overflow-hidden">
                                    <Image
                                        src={item.imageUrl}
                                        alt={item.productName}
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                
                                <div className="flex-1 flex flex-col justify-between py-1 min-w-0">
                                    <div className="pr-8">
                                        <h3 className="font-bold text-[#5C4B37] text-sm sm:text-base leading-tight truncate">
                                            {item.productName}
                                        </h3>
                                        {item.variantName && (
                                            <p className="text-xs sm:text-sm text-[#8B7355] mt-1 bg-[#F5ECD6] inline-block px-2 py-0.5 rounded-md">
                                                {item.variantName}
                                            </p>
                                        )}
                                    </div>
                                    
                                    <div className="flex items-end justify-between mt-4">
                                        <p className="font-bold text-[#D32F2F] text-lg sm:text-xl">
                                            {formatPrice(item.price)}
                                        </p>
                                        
                                        <div className="flex items-center gap-3 bg-[#FDF6E3] border border-[#EDE3CD] rounded-lg p-1">
                                            <button
                                                onClick={() => handleUpdateQuantity(item.variant_id, item.quantity, -1)}
                                                disabled={item.quantity <= 1 || isUpdating === item.variant_id}
                                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-[#5C4B37] disabled:opacity-50 transition-colors"
                                            >
                                                <Minus className="w-4 h-4" />
                                            </button>
                                            <span className="w-6 text-center text-sm font-semibold text-[#5C4B37]">
                                                {item.quantity}
                                            </span>
                                            <button
                                                onClick={() => handleUpdateQuantity(item.variant_id, item.quantity, 1)}
                                                disabled={isUpdating === item.variant_id}
                                                className="w-8 h-8 flex items-center justify-center rounded-md hover:bg-white text-[#5C4B37] disabled:opacity-50 transition-colors"
                                            >
                                                <Plus className="w-4 h-4" />
                                            </button>
                                        </div>
                                    </div>
                                </div>

                                {/* Remove Button */}
                                <button
                                    onClick={() => handleRemove(item.variant_id)}
                                    disabled={isUpdating === item.variant_id}
                                    className="absolute top-4 right-4 p-2 text-[#8B7355] hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                    aria-label="Hapus produk"
                                >
                                    <Trash2 className="w-5 h-5" />
                                </button>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-[380px] flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-[#EDE3CD] p-6 sticky top-24">
                        <h2 className="text-lg font-bold text-[#5C4B37] mb-6 border-b border-[#EDE3CD] pb-4">
                            Ringkasan Pesanan
                        </h2>
                        
                        <div className="space-y-4 mb-6">
                            <div className="flex justify-between text-[#8B7355]">
                                <span>Total Harga ({items.reduce((a, b) => a + b.quantity, 0)} Barang)</span>
                                <span className="font-medium text-[#5C4B37]">{formatPrice(subtotal)}</span>
                            </div>
                            {/* Feel free to add discount rows or tax rows here later */}
                        </div>

                        <div className="border-t border-[#EDE3CD] pt-4 mb-8">
                            <div className="flex justify-between items-center">
                                <span className="font-bold text-[#5C4B37]">Total Harga</span>
                                <span className="text-xl font-bold text-[#D32F2F]">{formatPrice(subtotal)}</span>
                            </div>
                        </div>

                        <Link href="/checkout" className="block w-full">
                            <motion.button
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4 bg-[#5C4B37] text-white font-bold rounded-xl shadow-lg hover:bg-[#3D3224] transition-all flex items-center justify-center gap-2 group"
                            >
                                Beli Sekarang
                                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </motion.button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
