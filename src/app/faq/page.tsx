import Link from 'next/link';
import { Metadata } from 'next';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import Navbar from '../components/navbar/Navbar';
import Footer from '../components/Footer';
import { FAQAccordion } from '../components/FAQAccordion';

export const metadata: Metadata = {
    title: 'Tanya Jawab (FAQ)',
    description: 'Temukan jawaban atas pertanyaan umum seputar pemesanan, pembayaran, dan pengiriman di MaCommerce.',
};

export default function FAQPage() {
    return (
        <div className="min-h-screen bg-[#FDF6E3] flex flex-col font-sans">
            <Navbar />
            
            <main className="flex-grow pt-24 pb-12">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="mb-8">
                        <Link 
                            href="/" 
                            className="inline-flex items-center px-4 py-2 rounded-xl bg-white border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] transition-all duration-300 group"
                        >
                            <svg 
                                className="w-5 h-5 mr-2 transition-transform duration-300 group-hover:-translate-x-1" 
                                fill="none" 
                                stroke="currentColor" 
                                viewBox="0 0 24 24"
                            >
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    strokeWidth="2" 
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                            Kembali ke Beranda
                        </Link>
                    </div>

                    <div className="text-center mb-10">
                        <span className="inline-block px-3 py-1 bg-[#EDE3CD] text-[#8B7355] rounded-full text-xs font-semibold tracking-wider uppercase mb-3">
                            Bantuan
                        </span>
                        <h1 className="text-3xl sm:text-4xl font-bold text-[#5C4B37] mb-4">
                            Tanya & Jawab
                        </h1>
                        <p className="text-[#8B7355] text-sm sm:text-base max-w-xl mx-auto">
                            Punya pertanyaan? Kami sudah kumpulkan jawaban untuk pertanyaan yang paling sering diajukan oleh pelanggan setia kami.
                        </p>
                    </div>

                    <FAQAccordion />

                    <div className="mt-12 text-center">
                        <p className="text-sm text-[#5C4B37] mb-4">
                            Belum menemukan jawaban yang dicari?
                        </p>
                        <a 
                            href="https://wa.me/6281234567890" 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-lg text-white bg-[#5C4B37] hover:bg-[#3D3224] transition-colors shadow-sm"
                        >
                            Hubungi Admin via WhatsApp
                        </a>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
