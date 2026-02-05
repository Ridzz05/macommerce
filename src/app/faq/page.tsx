import { Metadata } from 'next';
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
            
            <main className="flex-grow pt-24 pb-12 px-4 sm:px-6">
                <div className="max-w-3xl mx-auto">
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
