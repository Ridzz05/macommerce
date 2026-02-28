'use client'

import { usePathname } from 'next/navigation'
import SearchProvider from '../context/SearchContext'
import Footer from './Footer'
import Navbar from './navbar/Navbar'
import ChatWidget from './chat/ChatWidget'

interface RootLayoutClientProps {
    children: React.ReactNode;
    montserratClass: string;
}

export default function RootLayoutClient({
    children,
    montserratClass
}: RootLayoutClientProps) {
    const pathname = usePathname()
    const isAdminRoute = pathname?.startsWith('/admin')

    return (
        <body className={`${montserratClass} font-montserrat bg-[#FFFBF2]`}>
            <SearchProvider>
                {!isAdminRoute && <Navbar />}
                {children}
                {!isAdminRoute && <Footer />}
                {!isAdminRoute && <ChatWidget />}
            </SearchProvider>
        </body>
    )
} 

