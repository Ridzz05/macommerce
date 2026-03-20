'use client';

import { useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { User, Phone, Mail, FileText, ArrowRight, ShieldCheck } from 'lucide-react';
import { createOrder } from '@/app/actions/checkout';
import { useCart } from '@/app/context/CartContext';
import { useRouter } from 'next/navigation';

interface EnrichedCartItem {
    variant_id: string;
    quantity: number;
    productName: string;
    variantName: string;
    price: number;
    imageUrl: string;
}

interface CheckoutClientProps {
    initialItems: EnrichedCartItem[];
    userEmail?: string;
    adminWhatsapp: string;
}

export default function CheckoutClient({ initialItems, userEmail, adminWhatsapp }: CheckoutClientProps) {
    const [items] = useState<EnrichedCartItem[]>(initialItems);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const { refreshCart } = useCart();
    const router = useRouter();

    const [form, setForm] = useState({
        name: '',
        whatsapp: '',
        email: userEmail || '',
        note: ''
    });

    const formatPrice = (price: number) => {
        return new Intl.NumberFormat('id-ID', {
            style: 'currency',
            currency: 'IDR',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(price);
    };

    const subtotal = items.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        
        if (!form.name || !form.whatsapp) {
            alert('Mohon isi Nama Lengkap dan Nomor WhatsApp Anda.');
            return;
        }

        setIsSubmitting(true);
        
        try {
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('whatsapp', form.whatsapp);
            formData.append('email', form.email);
            formData.append('note', form.note);

            const result = await createOrder(formData);

            if (result.error) {
                alert(`Gagal membuat pesanan: ${result.error}`);
                setIsSubmitting(false);
                return;
            }

            // Successfully created order!
            await refreshCart(); // Reset contextual navbar cart state

            // Generate WhatsApp message
            const itemsListText = items.map(item => 
                `- ${item.productName} ${item.variantName ? `(${item.variantName})` : ''} x${item.quantity} = ${formatPrice(item.price * item.quantity)}`
            ).join('\n');

            const message = `Halo Admin, saya telah membuat pesanan baru!
            
*NOMOR PESANAN*: #${result.orderId.substring(0, 8).toUpperCase()}
            
*DETAIL PESANAN*
-----------------------------
${itemsListText}

*Total Belanja*: *${formatPrice(subtotal)}*

*DATA PEMBELI*
-----------------------------
*Nama*    : ${form.name}
*No. WA*  : ${form.whatsapp}
${form.email ? `*Email*   : ${form.email}` : ''}
${form.note ? `*Catatan* : ${form.note}` : ''}

Mohon segera diproses. Terima kasih!`;

            const whatsappUrl = `https://wa.me/${adminWhatsapp}?text=${encodeURIComponent(message)}`;
            
            // Redirect user directly
            window.location.href = whatsappUrl;
            
        } catch (err) {
            console.error('Submit error:', err);
            alert('Terjadi kesalahan. Silakan coba lagi.');
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
            <h1 className="text-2xl sm:text-3xl font-bold text-[#5C4B37] mb-8">Selesaikan Pesanan</h1>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Left Side: Order Form */}
                <div className="flex-1 space-y-6">
                    <div className="bg-white p-6 sm:p-8 rounded-2xl shadow-sm border border-[#EDE3CD]">
                        <h2 className="text-lg font-bold text-[#5C4B37] border-b border-[#EDE3CD] pb-4 mb-6 relative">
                            Data Pemesan
                            <div className="absolute left-0 bottom-0 w-12 h-0.5 bg-[#8B7355]"></div>
                        </h2>
                        
                        <form id="checkout-form" onSubmit={handleSubmit} className="space-y-5">
                            <div>
                                <label className="block text-sm font-medium text-[#8B7355] mb-2 ml-1">
                                    Nama Lengkap <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <User className="w-5 h-5 text-[#8B7355]/60" />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({...form, name: e.target.value})}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE3CD] focus:ring-2 focus:ring-[#5C4B37]/20 focus:border-[#5C4B37] outline-none bg-[#FDF6E3]/50 transition-all font-medium text-[#5C4B37]"
                                        placeholder="Ketik nama lengkap Anda"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8B7355] mb-2 ml-1">
                                    Nomor WhatsApp <span className="text-red-500">*</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Phone className="w-5 h-5 text-[#8B7355]/60" />
                                    </div>
                                    <input
                                        type="tel"
                                        required
                                        value={form.whatsapp}
                                        onChange={(e) => setForm({...form, whatsapp: e.target.value})}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE3CD] focus:ring-2 focus:ring-[#5C4B37]/20 focus:border-[#5C4B37] outline-none bg-[#FDF6E3]/50 transition-all font-medium text-[#5C4B37]"
                                        placeholder="Contoh: 081234567890"
                                    />
                                </div>
                                <p className="text-xs text-[#8B7355] mt-2 ml-1 flex items-center gap-1.5 opacity-80">
                                    <ShieldCheck className="w-3.5 h-3.5" />
                                    Kami akan mengirimkan detail pesanan melalui WhatsApp ini.
                                </p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8B7355] mb-2 ml-1">
                                    Email <span className="text-xs opacity-60">(Opsional)</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                                        <Mail className="w-5 h-5 text-[#8B7355]/60" />
                                    </div>
                                    <input
                                        type="email"
                                        value={form.email}
                                        onChange={(e) => setForm({...form, email: e.target.value})}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE3CD] focus:ring-2 focus:ring-[#5C4B37]/20 focus:border-[#5C4B37] outline-none bg-[#FDF6E3]/50 transition-all font-medium text-[#5C4B37]"
                                        placeholder="email@anda.com"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-[#8B7355] mb-2 ml-1">
                                    Catatan Tambahan <span className="text-xs opacity-60">(Opsional)</span>
                                </label>
                                <div className="relative">
                                    <div className="absolute top-4 left-4 pointer-events-none">
                                        <FileText className="w-5 h-5 text-[#8B7355]/60" />
                                    </div>
                                    <textarea
                                        value={form.note}
                                        onChange={(e) => setForm({...form, note: e.target.value})}
                                        rows={4}
                                        className="w-full pl-12 pr-4 py-3.5 rounded-xl border border-[#EDE3CD] focus:ring-2 focus:ring-[#5C4B37]/20 focus:border-[#5C4B37] outline-none bg-[#FDF6E3]/50 transition-all font-medium text-[#5C4B37] resize-none"
                                        placeholder="Ada pesan khusus untuk admin?"
                                    />
                                </div>
                            </div>
                        </form>
                    </div>
                </div>

                {/* Right Side: Order Summary */}
                <div className="w-full lg:w-[420px] flex-shrink-0">
                    <div className="bg-white rounded-2xl shadow-sm border border-[#EDE3CD] p-6 lg:sticky lg:top-24">
                        <h2 className="text-lg font-bold text-[#5C4B37] mb-6 border-b border-[#EDE3CD] pb-4 relative">
                            Ringkasan Pesanan
                            <div className="absolute left-0 bottom-0 w-12 h-0.5 bg-[#8B7355]"></div>
                        </h2>
                        
                        {/* Selected Items */}
                        <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                            {items.map((item, index) => (
                                <div key={index} className="flex gap-4 items-start p-3 bg-[#FDF6E3]/30 rounded-xl border border-[#EDE3CD]/50">
                                    <div className="relative w-16 h-16 rounded-lg overflow-hidden border border-[#EDE3CD] flex-shrink-0">
                                        <Image
                                            src={item.imageUrl}
                                            alt={item.productName}
                                            fill
                                            className="object-cover"
                                        />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h4 className="text-sm font-bold text-[#5C4B37] truncate">{item.productName}</h4>
                                        {item.variantName && (
                                            <p className="text-xs text-[#8B7355] mt-0.5">{item.variantName}</p>
                                        )}
                                        <div className="flex items-center justify-between mt-1">
                                            <span className="text-xs font-semibold bg-[#EDE3CD] text-[#5C4B37] px-2 py-0.5 rounded-full">
                                                x{item.quantity}
                                            </span>
                                            <span className="text-sm font-bold text-[#D32F2F]">
                                                {formatPrice(item.price * item.quantity)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="border-t border-[#EDE3CD] mt-6 pt-6">
                            <div className="flex justify-between items-center mb-8">
                                <span className="font-bold text-[#5C4B37]">Total Transaksi</span>
                                <span className="text-2xl font-bold text-[#D32F2F]">{formatPrice(subtotal)}</span>
                            </div>

                            <motion.button
                                form="checkout-form"
                                type="submit"
                                disabled={isSubmitting}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                className="w-full py-4.5 bg-[#25D366] text-white font-bold rounded-xl shadow-lg hover:bg-[#128C7E] disabled:opacity-70 disabled:hover:scale-100 disabled:hover:bg-[#25D366] transition-all flex items-center justify-center gap-2 group"
                            >
                                {isSubmitting ? (
                                    <>Memproses Pesanan...</>
                                ) : (
                                    <>
                                        <Image 
                                            src="/images/marketplace/wa_white.svg" 
                                            alt="WhatsApp" 
                                            width={24} 
                                            height={24}
                                            className="w-6 h-6"
                                        />
                                        Bayar & Checkout via WA
                                    </>
                                )}
                            </motion.button>
                            <p className="text-center text-xs text-[#8B7355]/70 mt-3 font-medium">
                                *Kamu akan diarahkan ke WhatsApp untuk proses konfirmasi pembayaran
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
