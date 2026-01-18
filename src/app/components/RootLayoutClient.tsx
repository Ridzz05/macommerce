import SearchProvider from '../context/SearchContext'
import Footer from './Footer'
import Navbar from './navbar/Navbar'

interface RootLayoutClientProps {
    children: React.ReactNode;
    montserratClass: string;
}

export default function RootLayoutClient({
    children,
    montserratClass
}: RootLayoutClientProps) {
    return (
        <body className={`${montserratClass} font-montserrat bg-[#FFFBF2]`}>
            <SearchProvider>
                <Navbar />
                {children}
                <Footer />
            </SearchProvider>
        </body>
    )
} 
