import Link from 'next/link';

interface LogoProps {
    className?: string;
}

export const Logo = ({ className = "" }: LogoProps) => {
    return (
        <Link href="/" className={`flex-shrink-0 ${className}`}>
            <div className="relative flex items-center h-8 sm:h-9 px-3 sm:px-4 bg-[#FDF6E3] border border-[#EDE3CD] rounded-lg hover:bg-[#F5ECD6] transition-colors">
                <span className="text-base sm:text-lg font-semibold text-[#5C4B37] mr-1">Ma</span>
                <span className="text-base sm:text-lg font-medium text-[#8B7355]">Commerce</span>
            </div>
        </Link>
    );
};
