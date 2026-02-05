'use client'

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

interface FAQItem {
    question: string;
    answer: string;
}

const faqs: FAQItem[] = [
    {
        question: "Bagaimana cara melakukan pemesanan?",
        answer: "Pilih produk yang Anda inginkan, klik tombol 'Beli', pilih varian (jika ada), lalu isi data diri di form pemesanan. Anda akan diarahkan ke WhatsApp admin untuk menyelesaikan transaksi."
    },
    {
        question: "Apakah metode pembayaran yang tersedia?",
        answer: "Kami menerima pembayaran melalui Transfer Bank (BCA, Mandiri, BNI) dan E-Wallet (GoPay, OVO, Dana). Detail pembayaran akan diberikan oleh admin saat di WhatsApp."
    },
    {
        question: "Berapa lama proses pengiriman?",
        answer: "Untuk produk fisik, pengiriman dilakukan H+1 setelah pembayaran terkonfirmasi. Estimasi sampai tergantung ekspedisi (JNE/SiCepat). Untuk produk digital/jasa, prosesnya instan atau sesuai antrian pengerjaan."
    },
    {
        question: "Apakah ada garansi untuk produk?",
        answer: "Tentu! Kami memberikan garansi ganti baru jika produk diterima dalam kondisi rusak atau tidak sesuai pesanan. Mohon sertakan video unboxing saat klaim garansi."
    },
    {
        question: "Apakah bisa request produk tertentu?",
        answer: "Bisa banget! Jika Anda mencari produk Gadget atau Setup tertentu yang belum ada di katalog, silakan hubungi kami via menu 'Hubungi Kami'. Kami akan bantu carikan."
    }
];

export function FAQAccordion() {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const toggleAccordion = (index: number) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="space-y-4">
            {faqs.map((faq, index) => (
                <div 
                    key={index} 
                    className="border border-[#EDE3CD] rounded-xl bg-white overflow-hidden transition-all duration-300 hover:shadow-sm"
                >
                    <button
                        onClick={() => toggleAccordion(index)}
                        className="w-full px-5 py-4 flex items-center justify-between text-left focus:outline-none bg-[#FDF6E3]/30 hover:bg-[#FDF6E3] transition-colors"
                    >
                        <span className={`text-sm sm:text-base font-medium transition-colors ${activeIndex === index ? 'text-[#8B7355]' : 'text-[#5C4B37]'}`}>
                            {faq.question}
                        </span>
                        <ChevronDown 
                            className={`w-5 h-5 text-[#8B7355] transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`} 
                        />
                    </button>
                    <AnimatePresence>
                        {activeIndex === index && (
                            <motion.div
                                initial={{ height: 0, opacity: 0 }}
                                animate={{ height: "auto", opacity: 1 }}
                                exit={{ height: 0, opacity: 0 }}
                                transition={{ duration: 0.3, ease: "easeInOut" }}
                            >
                                <div className="px-5 pb-4 text-sm text-[#5C4B37]/80 leading-relaxed border-t border-[#EDE3CD]/50 pt-2">
                                    {faq.answer}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>
            ))}
        </div>
    );
}
