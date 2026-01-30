import Image from 'next/image';
import Link from 'next/link';

interface LogoProps {
    className?: string;
}
export const Logo = ({ className = "" }: LogoProps) => {
    return (
        <Link href="/" className={`flex-shrink-0 ${className}`} aria-label="MaCommerce">
            <div className="relative flex items-center h-9 sm:h-10 px-2.5 sm:px-3 bg-[#FDF6E3] border border-[#EDE3CD] rounded-lg hover:bg-[#F5ECD6] transition-colors">

                <div className="flex items-baseline gap-0.5">
                    <span className="text-base sm:text-lg font-semibold text-[#5C4B37]">Ma</span>
                    <span className="text-base sm:text-lg font-medium text-[#8B7355]">Commerce</span>
                </div>
            </div>
        </Link>
    );
};
