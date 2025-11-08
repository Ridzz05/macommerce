import { motion, AnimatePresence } from 'framer-motion';
import { Category } from '../data/products';
import { 
    X, 
    LayoutGrid, 
    Check, 
    CheckCircle2, 
    Sparkles, 
    Shirt, 
    Footprints, 
    Laptop, 
    Users,
    type LucideIcon
} from 'lucide-react';

interface CategorySidebarProps {
    isOpen: boolean;
    onClose: () => void;
    categories: Category[];
    selectedCategory: Category | null;
    onSelectCategory: (category: Category | null) => void;
}

// Pre-initialize icon components for faster rendering (no lazy loading)
// Icons are imported and ready immediately when component loads
const CATEGORY_ICONS: Record<Category, LucideIcon> = {
    'Produk Kecantikan': Sparkles,
    'T-Shirt': Shirt,
    'Sepatu': Footprints,
    'Produk Digital': Laptop,
    'Jasa': Users
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
                                    <X className="w-5 h-5 text-[#5C4B37]" />
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
                                    <LayoutGrid className="w-5 h-5 mr-3 flex-shrink-0" />
                                    <span className="text-base">Semua Kategori</span>
                                    {!selectedCategory && (
                                        <motion.div 
                                            className="ml-auto"
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                        >
                                            <Check className="w-5 h-5" />
                                        </motion.div>
                                    )}
                                </div>
                            </motion.button>

                            {/* Category Grid */}
                            <div className="grid grid-cols-2 gap-3">
                                {categories.map((category) => {
                                    const IconComponent = CATEGORY_ICONS[category];
                                    return (
                                        <motion.button
                                            key={category}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => handleSelect(category)}
                                            className={`relative flex flex-col items-center justify-center p-4 rounded-lg transition-all ${
                                                selectedCategory === category 
                                                    ? 'bg-[#5C4B37] text-white' 
                                                    : 'text-[#5C4B37] bg-[#EDE3CD] hover:bg-[#E5D5B7]'
                                            }`}
                                        >
                                            <IconComponent className="w-6 h-6 mb-2 flex-shrink-0" />
                                            <span className="text-sm text-center font-medium">{category}</span>
                                            {selectedCategory === category && (
                                                <motion.div
                                                    className="absolute top-1 right-1"
                                                    initial={{ opacity: 0, scale: 0.5 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                >
                                                    <CheckCircle2 className="w-4 h-4" />
                                                </motion.div>
                                            )}
                                        </motion.button>
                                    );
                                })}
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