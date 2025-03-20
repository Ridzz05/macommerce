'use client'

import { SearchProvider } from '../context/SearchContext'
import Navbar from './Navbar'
import FeedbackForm from './FeedbackForm'

interface RootLayoutClientProps {
    children: React.ReactNode;
    lexendGigaClass: string;
    lexendClass: string;
    montserratClass: string;
    ralewayClass: string;
}

export default function RootLayoutClient({
    children,
    lexendGigaClass,
    lexendClass,
    montserratClass,
    ralewayClass
}: RootLayoutClientProps) {
    return (
        <body className={`${lexendGigaClass} ${lexendClass} ${montserratClass} ${ralewayClass} font-montserrat bg-[#FFFBF2]`}>
            <SearchProvider>
                <Navbar />
                {children}
                <FeedbackForm />
            </SearchProvider>
        </body>
    )
} 