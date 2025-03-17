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
                        className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px] lg:bg-black/20"
                        onClick={onClose}
                    />
                    
                    {/* Sidebar */}
                    <motion.div
                        initial={{ x: '-100%' }}
                        animate={{ x: 0 }}
                        exit={{ x: '-100%' }}
                        transition={{ type: "spring", damping: 30, stiffness: 300 }}
                        className="fixed left-0 top-0 bottom-0 w-[300px] z-50 bg-[#FDF6E3]/80 backdrop-blur-md shadow-xl overflow-y-auto"
                    >
                        <div className="p-6">
                            <div className="flex items-center justify-between mb-8">
                                <h3 className="text-xl font-medium text-[#5C4B37]">
                                    Pilih Kategori
                                </h3>
                                <motion.button 
                                    onClick={onClose}
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    className="p-2 hover:bg-[#EDE3CD]/50 rounded-lg transition-colors"
                                >
                                    <svg 
                                        className="w-6 h-6 text-[#5C4B37]" 
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

                            <div className="space-y-3">
                                <motion.button
                                    whileHover={{ scale: 1.02, backgroundColor: '#EDE3CD80' }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => handleSelect(null)}
                                    className={`w-full p-4 text-left rounded-xl transition-all duration-200 ${
                                        !selectedCategory 
                                            ? 'bg-[#5C4B37] text-white shadow-lg' 
                                            : 'bg-white/50 text-[#5C4B37] hover:shadow-md backdrop-blur-sm'
                                    }`}
                                >
                                    <div className="flex items-center">
                                        <svg 
                                            className="w-6 h-6 mr-4" 
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
                                        <span className="text-base font-medium">Semua Kategori</span>
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

                                {categoryInfo.map(({ name, icon }) => (
                                    <motion.button
                                        key={name}
                                        whileHover={{ scale: 1.02, backgroundColor: '#EDE3CD80' }}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelect(name)}
                                        className={`w-full p-4 text-left rounded-xl transition-all duration-200 ${
                                            selectedCategory === name 
                                                ? 'bg-[#5C4B37] text-white shadow-lg' 
                                                : 'bg-white/50 text-[#5C4B37] hover:shadow-md backdrop-blur-sm'
                                        }`}
                                    >
                                        <div className="flex items-center">
                                            <svg 
                                                className="w-6 h-6 mr-4" 
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
                                            <span className="text-base font-medium">{name}</span>
                                            {selectedCategory === name && (
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
                                ))}
                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
};

export default CategorySidebar; 