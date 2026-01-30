import { motion, AnimatePresence } from 'framer-motion';
import { Info, Mail, LockKeyhole } from 'lucide-react';
import Link from 'next/link';

interface NavigationDropdownProps {
    isOpen: boolean;
    onToggle: () => void;
    onClose: () => void;
}

const dropdownItemVariants = {
    hidden: { x: -10, opacity: 0 },
    visible: { x: 0, opacity: 1 }
};

export const NavigationDropdown = ({ isOpen, onToggle, onClose }: NavigationDropdownProps) => {
    const menuId = 'navigation-menu';

    return (
        <div className="flex items-center">
            <div className="relative">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onToggle}
                    type="button"
                    aria-label="Menu navigasi"
                    aria-haspopup="menu"
                    aria-expanded={isOpen}
                    aria-controls={menuId}
                    className="group p-2 sm:p-2.5 rounded-lg border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] hover:border-[#D8C8A7] transition-all duration-300 shadow-sm hover:shadow"
                >
                    <svg
                        className="w-3.5 h-3.5 sm:w-4 sm:h-4"
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
                </motion.button>

                {/* Dropdown Menu */}
                <AnimatePresence>
                    {isOpen && (
                        <motion.div
                            initial={{ opacity: 0, y: -10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            transition={{ duration: 0.2 }}
                            id={menuId}
                            role="menu"
                            className="absolute right-0 mt-2 w-48 bg-[#FDF6E3] border border-[#EDE3CD] rounded-lg shadow-lg overflow-hidden"
                        >
                            <div className="py-1">
                                <Link
                                    href="/about"
                                    className="block px-4 py-2 text-sm text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors"
                                    onClick={onClose}
                                    role="menuitem"
                                >
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.1 }}
                                        variants={dropdownItemVariants}
                                        className="flex items-center gap-2"
                                    >
                                        <svg
                                            className="w-4 h-4 text-[#8B7355]"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                            />
                                        </svg>
                                        Tentang Kami
                                    </motion.div>
                                </Link>
                                <Link
                                    href="/about#contact"
                                    className="block px-4 py-2 text-sm text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors"
                                    onClick={onClose}
                                    role="menuitem"
                                >
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.2 }}
                                        variants={dropdownItemVariants}
                                        className="flex items-center gap-2"
                                    >
                                        <Mail className="w-4 h-4 text-[#8B7355]" />
                                        Hubungi Kami
                                    </motion.div>
                                </Link>
                                <div className="my-1 border-t border-[#EDE3CD]" />
                                <Link
                                    href="/admin/products"
                                    className="block px-4 py-2 text-sm text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors"
                                    onClick={onClose}
                                    role="menuitem"
                                >
                                    <motion.div
                                        initial="hidden"
                                        animate="visible"
                                        transition={{ delay: 0.3 }}
                                        variants={dropdownItemVariants}
                                        className="flex items-center gap-2"
                                    >
                                        <LockKeyhole className="w-4 h-4 text-[#8B7355]" />
                                        Login Admin
                                    </motion.div>
                                </Link>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};
