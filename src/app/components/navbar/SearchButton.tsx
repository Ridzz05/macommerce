import { motion } from 'framer-motion';

interface SearchButtonProps {
    onClick: () => void;
    className?: string;
}

export const SearchButton = ({ onClick, className = "" }: SearchButtonProps) => {
    return (
        <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={onClick}
            type="button"
            aria-label="Buka pencarian"
            className={`group p-2 sm:p-2.5 rounded-lg border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] hover:border-[#D8C8A7] transition-all duration-300 shadow-sm hover:shadow ${className}`}
        >
            <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:rotate-12"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
            </svg>
        </motion.button>
    );
};
