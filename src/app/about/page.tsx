import { Suspense } from 'react';
import Link from 'next/link';
import { Metadata } from 'next';
import AboutContent from '../components/AboutContent';

export const metadata: Metadata = {
    title: 'Tentang Kami',
    description: 'Pelajari lebih lanjut tentang MaCommerce, platform kurasi premium untuk produk digital, jasa online, dan alat pertumbuhan bisnismu.',
};

// Loading component
function LoadingFallback() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#FDF6E3] flex items-center justify-center">
            <div className="animate-pulse text-[#8B7355]">
                Memuat...
            </div>
        </div>
    );
}

// Back button component
function BackButton() {
    return (
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
    );
}

export default function AboutPage() {
    return (
        <div className="min-h-screen pt-24 pb-12 bg-[#FDF6E3]">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
                <BackButton />
                <Suspense fallback={<LoadingFallback />}>
                    <AboutContent />
                </Suspense>
            </div>
        </div>
    );
} 