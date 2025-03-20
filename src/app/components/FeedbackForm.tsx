'use client'

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FeedbackForm() {
    const [isOpen, setIsOpen] = useState(false);
    const [isButtonVisible, setIsButtonVisible] = useState(false);
    const [showTooltip, setShowTooltip] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        feedback: '',
        rating: 5,
        category: 'umum'
    });
    const [isSubmitted, setIsSubmitted] = useState(false);

    useEffect(() => {
        // Tampilkan tombol feedback setelah 1 detik
        const buttonTimer = setTimeout(() => {
            setIsButtonVisible(true);
        }, 1000);

        const tooltipTimer = setTimeout(() => {
            setShowTooltip(true);
            // Sembunyikan tooltip setelah 5 detik ditampilkan
            setTimeout(() => {
                setShowTooltip(false);
                // Sembunyikan tombol feedback setelah tooltip hilang
                setTimeout(() => {
                    setIsButtonVisible(false);
                }, 300); // Delay 300ms untuk memberi waktu animasi tooltip selesai
            }, 5000);
        }, 5000);

        return () => {
            clearTimeout(tooltipTimer);
            clearTimeout(buttonTimer);
        };
    }, []);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // Di sini Anda bisa menambahkan logika untuk mengirim feedback ke backend
        console.log('Feedback submitted:', formData);
        setIsSubmitted(true);
        setTimeout(() => {
            setIsSubmitted(false);
            setIsOpen(false);
            setFormData({
                name: '',
                email: '',
                feedback: '',
                rating: 5,
                category: 'umum'
            });
        }, 2000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const toggleButtonVisibility = () => {
        setIsButtonVisible(!isButtonVisible);
    };

    return (
        <div className="fixed bottom-4 right-4 z-40 flex items-end gap-3">
            <AnimatePresence>
                {isButtonVisible && (
                    <div className="relative">
                        <AnimatePresence>
                            {showTooltip && (
                                <motion.div
                                    initial={{ opacity: 0, y: -10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                    className="absolute bottom-full mb-2 right-0 w-64 p-3 bg-white rounded-xl shadow-lg border border-[#EDE3CD]"
                                >
                                    <div className="text-sm text-[#5C4B37]">
                                        Halo, jika anda mempunyai waktu luang bantu kami meningkatkan layanan website ini
                                    </div>
                                    <div className="absolute bottom-0 right-6 transform translate-y-1/2 rotate-45 w-2 h-2 bg-white border-r border-b border-[#EDE3CD]"></div>
                                </motion.div>
                            )}
                        </AnimatePresence>
                        <motion.button
                            initial={{ opacity: 0, x: 50 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 50 }}
                            transition={{ type: "spring", stiffness: 300, damping: 25 }}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setIsOpen(true)}
                            className="bg-[#5C4B37] text-white px-4 py-2 rounded-xl shadow-lg hover:bg-[#4A3C2D] transition-colors duration-300"
                        >
                            <div className="flex items-center space-x-2">
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                                </svg>
                                <span>Berikan Masukan</span>
                            </div>
                        </motion.button>
                    </div>
                )}
            </AnimatePresence>

            <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleButtonVisibility}
                className="bg-[#5C4B37] text-white p-2 rounded-full shadow-lg hover:bg-[#4A3C2D] transition-colors duration-300"
            >
                <motion.div
                    animate={{ rotate: isButtonVisible ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                    </svg>
                </motion.div>
            </motion.button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
                        onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
                    >
                        <motion.div
                            initial={{ scale: 0.95, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.95, opacity: 0, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="bg-[#FDF6E3] rounded-2xl shadow-xl w-full max-w-lg overflow-hidden"
                        >
                            {isSubmitted ? (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="p-6 text-center"
                                >
                                    <div className="mb-4 text-[#5C4B37]">
                                        <svg className="w-16 h-16 mx-auto text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <h3 className="text-xl font-semibold text-[#5C4B37] mb-2">Terima Kasih!</h3>
                                    <p className="text-[#8B7355]">Masukan Anda sangat berarti bagi kami.</p>
                                </motion.div>
                            ) : (
                                <form onSubmit={handleSubmit} className="p-6 space-y-4">
                                    <div className="text-center mb-6">
                                        <h2 className="text-2xl font-semibold text-[#5C4B37]">Berikan Masukan</h2>
                                        <p className="text-[#8B7355] mt-1">Bantu kami meningkatkan layanan</p>
                                    </div>

                                    <div className="space-y-4">
                                        <div>
                                            <label className="block text-sm font-medium text-[#5C4B37] mb-1">Nama</label>
                                            <input
                                                type="text"
                                                name="name"
                                                value={formData.name}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-xl border border-[#EDE3CD] bg-white focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition-colors duration-300"
                                                placeholder="Masukkan nama Anda"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#5C4B37] mb-1">Email</label>
                                            <input
                                                type="email"
                                                name="email"
                                                value={formData.email}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-xl border border-[#EDE3CD] bg-white focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition-colors duration-300"
                                                placeholder="Masukkan email Anda"
                                                required
                                            />
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#5C4B37] mb-1">Kategori</label>
                                            <select
                                                name="category"
                                                value={formData.category}
                                                onChange={handleChange}
                                                className="w-full px-4 py-2 rounded-xl border border-[#EDE3CD] bg-white focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition-colors duration-300"
                                            >
                                                <option value="umum">Umum</option>
                                                <option value="ui">Tampilan UI</option>
                                                <option value="bug">Laporan Bug</option>
                                                <option value="saran">Saran Fitur</option>
                                                <option value="lainnya">Lainnya</option>
                                            </select>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#5C4B37] mb-1">Rating</label>
                                            <div className="flex items-center space-x-2">
                                                {[1, 2, 3, 4, 5].map((star) => (
                                                    <motion.button
                                                        key={star}
                                                        type="button"
                                                        whileHover={{ scale: 1.1 }}
                                                        whileTap={{ scale: 0.9 }}
                                                        onClick={() => handleChange({ target: { name: 'rating', value: star }} as any)}
                                                        className={`text-2xl ${formData.rating >= star ? 'text-yellow-400' : 'text-gray-300'}`}
                                                    >
                                                        ★
                                                    </motion.button>
                                                ))}
                                            </div>
                                        </div>

                                        <div>
                                            <label className="block text-sm font-medium text-[#5C4B37] mb-1">Masukan</label>
                                            <textarea
                                                name="feedback"
                                                value={formData.feedback}
                                                onChange={handleChange}
                                                rows={4}
                                                className="w-full px-4 py-2 rounded-xl border border-[#EDE3CD] bg-white focus:border-[#8B7355] focus:ring-1 focus:ring-[#8B7355] transition-colors duration-300"
                                                placeholder="Berikan masukan Anda di sini..."
                                                required
                                            />
                                        </div>
                                    </div>

                                    <div className="flex justify-end space-x-3 mt-6">
                                        <motion.button
                                            type="button"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            onClick={() => setIsOpen(false)}
                                            className="px-4 py-2 rounded-xl border border-[#EDE3CD] text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors duration-300"
                                        >
                                            Batal
                                        </motion.button>
                                        <motion.button
                                            type="submit"
                                            whileHover={{ scale: 1.02 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="px-4 py-2 rounded-xl bg-[#5C4B37] text-white hover:bg-[#4A3C2D] transition-colors duration-300"
                                        >
                                            Kirim Masukan
                                        </motion.button>
                                    </div>
                                </form>
                            )}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
} 