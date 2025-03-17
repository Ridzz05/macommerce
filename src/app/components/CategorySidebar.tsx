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
                        className="fixed inset-0 z-40 bg-black/20"
                        onClick={onClose}
                    />
                    
                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed left-0 top-0 bottom-0 w-[75%] sm:w-[280px] z-50 bg-[#FDF6E3] overflow-y-auto"
                    >
                        <div className="sticky top-0 bg-[#FDF6E3] p-3 border-b border-[#EDE3CD] mb-2">
                            <div className="flex items-center justify-between">
                                <h3 className="text-base font-medium text-[#5C4B37]">
                                    Pilih Kategori
                                </h3>
                                <motion.button 
                                    onClick={onClose}
                                    whileTap={{ scale: 0.95 }}
                                    className="p-1.5 hover:bg-[#EDE3CD] rounded-lg transition-colors"
                                >
                                    <svg 
                                        className="w-4 h-4 text-[#5C4B37]" 
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

                        <div className="p-3 space-y-1.5">
                            <motion.button
                                whileTap={{ scale: 0.98 }}
                                onClick={() => handleSelect(null)}
                                className={`w-full p-2.5 text-left rounded-lg transition-all ${
                                    !selectedCategory 
                                        ? 'bg-[#5C4B37] text-white' 
                                        : 'text-[#5C4B37] bg-[#EDE3CD]'
                                }`}
                            >
                                <div className="flex items-center">
                                    <svg 
                                        className="w-4 h-4 mr-2.5" 
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
                                    <span className="text-sm">Semua Kategori</span>
                                    {!selectedCategory && (
                                        <motion.svg 
                                            className="ml-auto h-4 w-4" 
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

                            {categoryInfo.map(({ name, icon }) => (
                                <motion.button
                                    key={name}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelect(name)}
                                    className={`w-full p-2.5 text-left rounded-lg transition-all ${
                                        selectedCategory === name 
                                            ? 'bg-[#5C4B37] text-white' 
                                            : 'text-[#5C4B37] bg-[#EDE3CD]'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg 
                                            className="w-4 h-4 mr-2.5" 
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
                                        <span className="text-sm">{name}</span>
                                        {selectedCategory === name && (
                                            <motion.svg 
                                                className="ml-auto h-4 w-4" 
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
                            ))}
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CategorySidebar; 