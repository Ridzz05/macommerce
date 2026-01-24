import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';
import { Category } from '../data/products';

interface CategorySidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  selectedCategory: Category | null;
  onSelectCategory: (category: Category | null) => void;
}

/**
 * Modern Custom Icon Components
 * Using vibrant gradients and modern designs
 */

// Close Icon - Modern X with rounded edges
const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Grid Icon - Modern 4-square grid
const GridIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.8"/>
    <rect x="13" y="3" width="8" height="8" rx="2" fill="currentColor" opacity="0.8"/>
    <rect x="3" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.8"/>
    <rect x="13" y="13" width="8" height="8" rx="2" fill="currentColor" opacity="0.8"/>
  </svg>
);

// Check Icon - Modern checkmark
const CheckIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

// Check Circle Icon - Modern circled checkmark
const CheckCircleIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="currentColor" opacity="0.9"/>
    <path d="M16 9L10.5 14.5L8 12" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
);

/**
 * Category Icons - Modern & Vibrant
 */

// Digital Product Icon - Modern laptop/screen with shopping elements
const DigitalProductIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="digitalGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#667EEA" />
        <stop offset="100%" stopColor="#764BA2" />
      </linearGradient>
    </defs>
    {/* Laptop screen */}
    <rect x="2" y="4" width="20" height="12" rx="1.5" stroke="url(#digitalGrad)" strokeWidth="2" fill="none"/>
    {/* Keyboard base */}
    <path d="M1 16H23L21 19H3L1 16Z" fill="url(#digitalGrad)" opacity="0.7"/>
    {/* Download/Product icon */}
    <path d="M12 7V12M12 12L10 10M12 12L14 10" stroke="url(#digitalGrad)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="12" cy="13" r="0.8" fill="url(#digitalGrad)"/>
  </svg>
);

// Jasa Online Icon - Modern tools/service with gradient
const JasaOnlineIcon = ({ className = "" }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <defs>
      <linearGradient id="jasaGrad" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#F093FB" />
        <stop offset="50%" stopColor="#F5576C" />
        <stop offset="100%" stopColor="#FD8D3C" />
      </linearGradient>
    </defs>
    {/* Wrench */}
    <path d="M14.7 6.3C15.1 5.9 15.1 5.3 14.7 4.9L13.1 3.3C12.7 2.9 12.1 2.9 11.7 3.3L3.3 11.7C2.9 12.1 2.9 12.7 3.3 13.1L4.9 14.7C5.3 15.1 5.9 15.1 6.3 14.7L14.7 6.3Z" 
          fill="url(#jasaGrad)" opacity="0.8"/>
    {/* Gear */}
    <circle cx="17" cy="17" r="4" stroke="url(#jasaGrad)" strokeWidth="1.8" fill="none"/>
    <circle cx="17" cy="17" r="1.5" fill="url(#jasaGrad)"/>
    {/* Gear teeth */}
    <path d="M17 13V14M17 20V21M21 17H20M14 17H13" stroke="url(#jasaGrad)" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
);

const WORLD_ICON_MAP: Record<Category, React.ComponentType<{ className?: string }>> = {
  'Digital Product': DigitalProductIcon,
  'Jasa Online': JasaOnlineIcon,
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
    : { type: 'tween', duration: 0.28, ease: [0.22, 1, 0.36, 1] };
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
                  <CloseIcon className="w-5 h-5 text-[#5C4B37]" />
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
                  <GridIcon className="w-5 h-5 mr-3 flex-shrink-0" />
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
