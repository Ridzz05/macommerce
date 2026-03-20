import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Category } from '../lib/products';
import { 
  XMarkIcon, 
  Squares2X2Icon, 
  CheckIcon, 
  CheckCircleIcon, 
  ComputerDesktopIcon, 
  WrenchScrewdriverIcon,
  RocketLaunchIcon
} from '@heroicons/react/24/outline';

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

/**
 * Category Icons - Mapped to HeroIcons
 */
const WORLD_ICON_MAP: Record<Category, React.ComponentType<{ className?: string }>> = {
  'Digital Product': ComputerDesktopIcon,
  'Jasa Online': WrenchScrewdriverIcon,
  'Growth Tools': RocketLaunchIcon,
};



const CategorySidebar = ({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onSelectCategory,
}: CategorySidebarProps) => {
  const shouldReduceMotion = useReducedMotion();

  const overlayTransition = shouldReduceMotion
    ? { duration: 0 }
    : { duration: 0.2, ease: 'easeOut' };
  const panelTransition = shouldReduceMotion
    ? { duration: 0 }
    : { type: 'spring', stiffness: 300, damping: 30, mass: 1 };
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
            transition={overlayTransition}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={panelTransition}
            role="dialog"
            aria-modal="true"
            aria-label="Pilih kategori"
            className="fixed left-0 top-0 bottom-0 w-full sm:w-[280px] z-50 bg-[#FDF6E3] flex flex-col will-change-transform"
          >
            {/* Header */}
            <div className="sticky top-0 bg-[#FDF6E3] p-4 border-b border-[#EDE3CD]">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-medium text-[#5C4B37]">
                  Explore Worlds
                </h3>
                <motion.button
                  onClick={onClose}
                  whileTap={shouldReduceMotion ? undefined : { scale: 0.95 }}
                  type="button"
                  aria-label="Tutup kategori"
                  className="p-2 hover:bg-[#EDE3CD] rounded-lg transition-colors"
                >
                  <XMarkIcon className="w-5 h-5 text-[#5C4B37]" />
                </motion.button>
              </div>
            </div>

            {/* Category Grid */}
            <div className="flex-grow overflow-y-auto p-4">
              {/* Semua Kategori Button */}
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
                  <Squares2X2Icon className="w-5 h-5 mr-3 flex-shrink-0" />
                  <span className="text-base">All Worlds</span>
                  {!selectedCategory && (
                    <motion.div
                      className="ml-auto"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <CheckIcon className="w-5 h-5" />
                    </motion.div>
                  )}
                </div>
              </motion.button>

              {/* Worlds Grid */}
              <div className="grid grid-cols-2 gap-3">
                {categories.map((category) => {
                  const IconComponent = WORLD_ICON_MAP[category];

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
                      <span className="text-sm text-center font-medium">
                        {category}
                      </span>

                      {selectedCategory === category && (
                        <motion.div
                          className="absolute top-1 right-1"
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                        >
                          <CheckCircleIcon className="w-4 h-4" />
                        </motion.div>
                      )}
                    </motion.button>
                  );
                })}
              </div>
            </div>

            {/* Footer */}
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
