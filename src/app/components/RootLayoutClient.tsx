'use client'

import { useEffect } from 'react'
import Navbar from './Navbar'
import { SearchProvider } from '../context/SearchContext'

export default function RootLayoutClient({
    children,
}: {
    children: React.ReactNode
}) {
    useEffect(() => {
        // Menambahkan class untuk mencegah scroll saat modal terbuka
        document.documentElement.classList.add('scroll-smooth');
        
        return () => {
            document.documentElement.classList.remove('scroll-smooth');
        };
    }, []);

    return (
        <SearchProvider>
            <Navbar />
            {children}
        </SearchProvider>
    )
} 