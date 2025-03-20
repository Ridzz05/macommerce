import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../data/products';
import { categoryInfo } from '../data/products';

interface CategorySidebarProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
}

const CategorySidebar = ({ 
    isOpen, 
    onClose, 
    categories, 
    selectedCategory, 
    onSelectCategory 
}: CategorySidebarProps) => {
    const handleSelect = (category: Category | null) => {
        onSelectCategory(category);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    
                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed left-0 top-0 bottom-0 w-full sm:w-[280px] z-50 bg-[#FDF6E3] flex flex-col"
                    >
                        {/* Header */}
                        <div className="sticky top-0 bg-[#FDF6E3] p-4 border-b border-[#EDE3CD]">
                            <div className="flex items-center justify-between">
                                <h3 className="text-lg font-medium text-[#5C4B37]">
                                    Pilih Kategori
                                </h3>
                                <motion.button 
                                    onClick={onClose}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-2 hover:bg-[#EDE3CD] rounded-lg transition-colors"
                                >
                                    <svg 
                                        className="w-5 h-5 text-[#5C4B37]" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </motion.button>
                            </div>
                        </div>

                        {/* Category Grid - with flex-grow to take remaining space */}
                        <div className="flex-grow overflow-y-auto p-4">
                            {/* Semua Kategori Button - Full Width */}
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelect(null)}
                                className={`w-full p-3 mb-3 text-left rounded-lg transition-all ${
                                    !selectedCategory 
                                        ? 'bg-[#5C4B37] text-white' 
                                        : 'text-[#5C4B37] bg-[#EDE3CD] hover:bg-[#E5D5B7]'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg 
                                        className="w-5 h-5 mr-3" 
                                        fill="none" 
                                        stroke="currentColor" 
                                        viewBox="0 0 24 24"
                                    >
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            strokeWidth={2} 
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                    <span className="text-base">Semua Kategori</span>
                                    {!selectedCategory && (
                                        <motion.svg 
                                            className="ml-auto h-5 w-5" 
                                            fill="none" 
                                            viewBox="0 0 24 24" 
                                            stroke="currentColor"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                                        </motion.svg>
                                    )}
                                </div>
                            </motion.button>

                            {/* Category Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {categoryInfo.map(({ name, icon }) => (
                                    <motion.button
                                        key={name}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelect(name)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                                            selectedCategory === name 
                                                ? 'bg-[#5C4B37] text-white' 
                                                : 'text-[#5C4B37] bg-[#EDE3CD] hover:bg-[#E5D5B7]'
                                        }`}
                                    >
                                        <svg 
                                            className="w-6 h-6 mb-2" 
                                            fill="none" 
                                            stroke="currentColor" 
                                            viewBox="0 0 24 24"
                                        >
                                            <path 
                                                strokeLinecap="round" 
                                                strokeLinejoin="round" 
                                                strokeWidth={2} 
                                                d={icon}
                                            />
                                        </svg>
                                        <span className="text-sm text-center font-medium">{name}</span>
                                        {selectedCategory === name && (
                                            <motion.div
                                                className="absolute top-1 right-1"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                            >
                                                <svg 
                                                    className="w-4 h-4" 
                                                    fill="none" 
                                                    viewBox="0 0 24 24" 
                                                    stroke="currentColor"
                                                >
                                                    <path 
                                                        strokeLinecap="round" 
                                                        strokeLinejoin="round" 
                                                        strokeWidth={2} 
                                                        d="M5 13l4 4L19 7"
                                                    />
                                                </svg>
                                            </motion.div>
                                        )}
                                    </motion.button>
                                ))}
                            </div>
                        </div>

                        {/* Footer - Optional untuk mobile */}
                        <div className="p-4 border-t border-[#EDE3CD] sm:hidden">
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={onClose}
                                className="w-full p-3 text-center text-[#5C4B37] bg-[#EDE3CD] rounded-lg hover:bg-[#E5D5B7] transition-all"
                            >
                                Tutup
                            </motion.button>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CategorySidebar; 