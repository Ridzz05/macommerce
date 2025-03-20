'use client'

import { motion } from 'framer-motion';

export default function AboutContent() {
    return (
        <>
            {/* Header Section */}
            <div className="text-center mb-12">
                <motion.h1 
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl font-bold text-[#5C4B37] mb-4"
                >
                    Tentang MaCommerce
                </motion.h1>
                <motion.p 
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    className="text-lg text-[#8B7355]"
                >
                    Platform marketplace yang menghubungkan penjual dan pembeli dalam satu komunitas
                </motion.p>
            </div>

            {/* Main Content */}
            <div className="grid gap-8 md:grid-cols-2">
                {/* Visi Section */}
                <motion.div 
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.4 }}
                    className="bg-white p-6 rounded-2xl shadow-md border border-[#EDE3CD]"
                >
                    <h2 className="text-xl font-semibold text-[#5C4B37] mb-4">Visi Kami</h2>
                    <p className="text-[#8B7355]">
                        Menjadi platform marketplace terpercaya yang memudahkan transaksi jual beli dan 
                        mendukung pertumbuhan UMKM di Indonesia dengan menghadirkan pengalaman berbelanja 
                        yang aman dan nyaman.
                    </p>
                </motion.div>

                {/* Misi Section */}
                <motion.div 
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.6 }}
                    className="bg-white p-6 rounded-2xl shadow-md border border-[#EDE3CD]"
                >
                    <h2 className="text-xl font-semibold text-[#5C4B37] mb-4">Misi Kami</h2>
                    <ul className="text-[#8B7355] space-y-2">
                        <li>• Menyediakan platform yang aman dan mudah digunakan</li>
                        <li>• Mendukung pertumbuhan UMKM lokal</li>
                        <li>• Memberikan pengalaman berbelanja terbaik</li>
                        <li>• Membangun komunitas yang positif</li>
                    </ul>
                </motion.div>

                {/* Features Section */}
                <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.8 }}
                    className="md:col-span-2 bg-white p-6 rounded-2xl shadow-md border border-[#EDE3CD]"
                >
                    <h2 className="text-xl font-semibold text-[#5C4B37] mb-4">Fitur Utama</h2>
                    <div className="grid md:grid-cols-3 gap-4">
                        <div className="p-4 rounded-xl bg-[#FDF6E3]">
                            <h3 className="font-medium text-[#5C4B37] mb-2">Kemudahan Transaksi</h3>
                            <p className="text-sm text-[#8B7355]">Proses jual beli yang simpel dan aman untuk semua pengguna</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#FDF6E3]">
                            <h3 className="font-medium text-[#5C4B37] mb-2">Komunitas Aktif</h3>
                            <p className="text-sm text-[#8B7355]">Terhubung dengan komunitas penjual dan pembeli yang positif</p>
                        </div>
                        <div className="p-4 rounded-xl bg-[#FDF6E3]">
                            <h3 className="font-medium text-[#5C4B37] mb-2">Dukungan 24/7</h3>
                            <p className="text-sm text-[#8B7355]">Layanan pelanggan yang siap membantu setiap saat</p>
                        </div>
                    </div>
                </motion.div>
            </div>

            {/* Contact Section */}
            <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 1 }}
                className="mt-12 text-center"
            >
                <h2 className="text-xl font-semibold text-[#5C4B37] mb-4">Hubungi Kami</h2>
                <p className="text-[#8B7355] mb-4">
                    Punya pertanyaan atau masukan? Jangan ragu untuk menghubungi kami
                </p>
                <div className="flex justify-center space-x-4">
                    <a 
                        href="https://wa.me/6281222827630" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-xl bg-[#5C4B37] text-white hover:bg-[#4A3C2D] transition-colors duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z"/>
                        </svg>
                        Hubungi Admin
                    </a>
                    <a 
                        href="https://chat.whatsapp.com/Hqe9cwAb7spJcqYi4Ficg1" 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 rounded-xl border border-[#5C4B37] text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors duration-300"
                    >
                        <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z"/>
                        </svg>
                        Gabung Channel
                    </a>
                </div>
            </motion.div>
        </>
    );
} 