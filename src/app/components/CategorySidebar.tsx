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

const CATEGORY_ICONS = {
    'Produk Kecantikan': 'face',
    'T-Shirt': 'checkroom',
    'Sepatu': 'hiking',
    'Produk Digital': 'devices',
    'Jasa': 'support_agent'
};

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
                                    <span className="material-icons text-[#5C4B37]">close</span>
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
                                    <span className="material-icons mr-3">category</span>
                                    <span className="text-base">Semua Kategori</span>
                                    {!selectedCategory && (
                                        <motion.span 
                                            className="material-icons ml-auto"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            check
                                        </motion.span>
                                    )}
                                </div>
                            </motion.button>

                            {/* Category Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {categories.map((category) => (
                                    <motion.button
                                        key={category}
                                        whileTap={{ scale: 0.98 }}
                                        onClick={() => handleSelect(category)}
                                        className={`flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                                            selectedCategory === category 
                                                ? 'bg-[#5C4B37] text-white' 
                                                : 'text-[#5C4B37] bg-[#EDE3CD] hover:bg-[#E5D5B7]'
                                        }`}
                                    >
                                        <span className="material-icons mb-2 text-2xl">
                                            {CATEGORY_ICONS[category]}
                                        </span>
                                        <span className="text-sm text-center font-medium">{category}</span>
                                        {selectedCategory === category && (
                                            <motion.span
                                                className="material-icons absolute top-1 right-1 text-sm"
                                                initial={{ opacity: 0, scale: 0.5 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                            >
                                                check_circle
                                            </motion.span>
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