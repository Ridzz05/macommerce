'use client';

import { motion } from 'framer-motion';

export default function AboutContent() {
  return (
    <div className="max-w-6xl mx-auto px-4 py-8 sm:py-12">
      {/* Header Section */}
      <div className="text-center mb-8 sm:mb-12">
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl sm:text-3xl font-semibold text-[#5C4B37] mb-3"
        >
          Tentang MaCommerce
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-base sm:text-lg text-[#8B7355]"
        >
          Marketplace yang mengutamakan kepercayaan, kurasi, dan pengalaman belanja yang terasa “aman dari drama”.
        </motion.p>
      </div>

      {/* Main Content */}
      <div className="grid gap-4 sm:gap-6 md:grid-cols-2">
        {/* Visi Section */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-[#FDF6E3] p-4 sm:p-5 rounded-lg border border-[#EDE3CD] hover:border-[#D8C8A7] transition-colors"
        >
          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-3">
            Visi
          </span>
          <p className="text-sm text-[#8B7355] leading-relaxed">
            Menjadi platform commerce terpercaya di Indonesia yang membantu orang belanja dengan keputusan lebih cerdas—
            dari produk harian sampai kebutuhan besar—dengan transparansi, keamanan, dan kenyamanan yang konsisten.
          </p>
        </motion.div>

        {/* Misi Section */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="bg-[#FDF6E3] p-4 sm:p-5 rounded-lg border border-[#EDE3CD] hover:border-[#D8C8A7] transition-colors"
        >
          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-3">
            Misi
          </span>

          <ul className="text-sm text-[#8B7355] space-y-2 leading-relaxed">
            <li className="flex items-start">
              <span className="mr-2 text-[#5C4B37]">•</span>
              Menghadirkan pengalaman belanja yang sederhana, aman, dan jelas dari awal sampai akhir.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#5C4B37]">•</span>
              Mengangkat penjual lokal lewat sistem yang adil, transparan, dan mendukung pertumbuhan UMKM.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#5C4B37]">•</span>
              Mengutamakan kualitas dengan kurasi produk, informasi yang lengkap, dan rekomendasi yang jujur.
            </li>
            <li className="flex items-start">
              <span className="mr-2 text-[#5C4B37]">•</span>
              Membangun komunitas pembeli–penjual yang saling menghargai: cepat, ramah, dan anti ribet.
            </li>
          </ul>
        </motion.div>

        {/* Features Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="md:col-span-2 bg-[#FDF6E3] p-4 sm:p-5 rounded-lg border border-[#EDE3CD] hover:border-[#D8C8A7] transition-colors"
        >
          <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-3">
            Yang Kamu Dapat di MaCommerce
          </span>

          <div className="grid sm:grid-cols-3 gap-3">
            <div className="p-3 rounded-lg bg-white border border-[#EDE3CD]">
              <h3 className="text-sm font-medium text-[#5C4B37] mb-1">Transaksi Lebih Tenang</h3>
              <p className="text-xs text-[#8B7355]">
                Alur belanja dibuat jelas: dari pilih produk, bayar, sampai status pengiriman—minim “kok gini ya?”.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#EDE3CD]">
              <h3 className="text-sm font-medium text-[#5C4B37] mb-1">Kurasi & Rekomendasi</h3>
              <p className="text-xs text-[#8B7355]">
                Fokus ke produk yang worth it, dengan info yang rapi—biar keputusan belanjamu lebih cerdas.
              </p>
            </div>

            <div className="p-3 rounded-lg bg-white border border-[#EDE3CD]">
              <h3 className="text-sm font-medium text-[#5C4B37] mb-1">Dukungan Responsif</h3>
              <p className="text-xs text-[#8B7355]">
                Kalau ada kendala, kamu nggak sendirian. Admin siap bantu cepat dan manusiawi (bukan mode robot).
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 1 }}
        id="contact"
        className="mt-8 sm:mt-12 text-center"
      >
        <span className="inline-block px-2 py-0.5 text-xs font-medium bg-[#EDE3CD] text-[#5C4B37] rounded-full mb-3">
          Kontak
        </span>

        <p className="text-sm text-[#8B7355] mb-4">
          Butuh bantuan, mau kolaborasi, atau punya saran? Chat aja—kami senang dengar masukan.
        </p>

        <motion.a
          href="https://wa.me/6281222827630"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center px-4 py-2 rounded-lg bg-[#5C4B37] text-white text-sm hover:bg-[#3D3224] transition-colors"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.582 2.128 2.182-.573c.978.58 1.911.928 3.145.929 3.178 0 5.767-2.587 5.768-5.766.001-3.187-2.575-5.77-5.764-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.299.045-.677.063-1.092-.069-.252-.08-.575-.187-.988-.365-1.739-.751-2.874-2.502-2.961-2.617-.087-.116-.708-.94-.708-1.793s.448-1.273.607-1.446c.159-.173.346-.217.462-.217l.332.006c.106.005.249-.04.39.298.144.347.491 1.2.534 1.287.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.86s.274.072.376-.043c.101-.116.433-.506.549-.68.116-.173.231-.145.39-.087s1.011.477 1.184.564c.173.087.289.129.332.202.043.073.043.423-.101.828z" />
          </svg>
          Hubungi Admin
        </motion.a>
      </motion.div>
    </div>
  );
}
