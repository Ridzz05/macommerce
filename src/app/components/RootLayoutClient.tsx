import SearchProvider from '../context/SearchContext'
import Footer from './Footer'
import Navbar from './navbar/Navbar'

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
                <Footer />
            </SearchProvider>
        </body>
    )
} 
