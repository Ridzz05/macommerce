import Link from 'next/link';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-[#FFFBF2] pt-20 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back Navigation */}
        <div className="mb-8">
          <Link 
            href="/" 
            className="inline-flex items-center text-sm font-medium text-[#8B7355] hover:text-[#5C4B37] transition-colors"
          >
            <ArrowLeftIcon className="w-4 h-4 mr-2" />
            Kembali ke Beranda
          </Link>
        </div>

        {/* Header */}
        <div className="bg-[#FDF6E3] border border-[#EDE3CD] rounded-2xl p-6 sm:p-10 mb-8 shadow-sm">
          <h1 className="text-3xl font-bold text-[#5C4B37] mb-4">Syarat & Ketentuan</h1>
          <p className="text-[#8B7355] leading-relaxed">
            Terakhir diperbarui: 31 Januari 2026
          </p>
        </div>

        {/* Content */}
        <div className="space-y-8 text-[#5C4B37] leading-relaxed">
          <section className="bg-white/50 border border-[#EDE3CD]/50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EDE3CD] flex items-center justify-center text-sm font-bold">1</span>
              Pendahuluan
            </h2>
            <p className="text-[#8B7355]">
              Selamat datang di MaCommerce. Dengan mengakses dan menggunakan platform ini, Anda menyetujui untuk mematuhi dan terikat oleh syarat dan ketentuan berikut. Jika Anda tidak setuju dengan bagian mana pun dari syarat ini, mohon untuk tidak menggunakan layanan kami.
            </p>
          </section>

          <section className="bg-white/50 border border-[#EDE3CD]/50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EDE3CD] flex items-center justify-center text-sm font-bold">2</span>
              Layanan Kami
            </h2>
            <p className="text-[#8B7355] mb-3">
              MaCommerce bertindak sebagai platform kurasi dan penemuan produk. Kami:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#8B7355] ml-2">
              <li>Menampilkan rekomendasi produk digital dan fisik terpilih.</li>
              <li>Mengarahkan pengguna ke platform pihak ketiga (seperti WhatsApp, Instagram, atau Marketplace lain) untuk penyelesaian transaksi.</li>
              <li>Tidak memproses pembayaran langsung di dalam website ini untuk sebagian besar transaksi.</li>
            </ul>
          </section>

          <section className="bg-white/50 border border-[#EDE3CD]/50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EDE3CD] flex items-center justify-center text-sm font-bold">3</span>
              Pembelian & Pembayaran
            </h2>
            <p className="text-[#8B7355]">
              Segala transaksi yang terjadi setelah Anda diarahkan keluar dari platform MaCommerce tunduk pada syarat dan ketentuan platform tujuan (misalnya WhatsApp penjual atau Marketplace terkait). Kami tidak bertanggung jawab atas:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#8B7355] mt-3 ml-2">
              <li>Kegagalan pembayaran di platform pihak ketiga.</li>
              <li>Kualitas produk yang tidak sesuai harapan (kecuali produk milik internal MaCommerce).</li>
              <li>Pengiriman barang fisik yang dilakukan oleh pihak ketiga.</li>
            </ul>
          </section>

          <section className="bg-white/50 border border-[#EDE3CD]/50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EDE3CD] flex items-center justify-center text-sm font-bold">4</span>
              Produk Digital
            </h2>
            <p className="text-[#8B7355]">
              Untuk produk digital (jika ada) yang ditransaksikan langsung melalui panduan kami:
            </p>
            <ul className="list-disc list-inside space-y-2 text-[#8B7355] mt-3 ml-2">
              <li>Produk bersifat non-refundable (tidak dapat dikembalikan) setelah akses diberikan.</li>
              <li>Dilarang keras menyebarluaskan, menjual kembali, atau membagikan akses produk digital tanpa izin tertulis.</li>
            </ul>
          </section>

          <section className="bg-white/50 border border-[#EDE3CD]/50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EDE3CD] flex items-center justify-center text-sm font-bold">5</span>
              Kebijakan Privasi
            </h2>
            <p className="text-[#8B7355]">
              Kami menghargai privasi Anda. Data yang mungkin kami kumpulkan (seperti cookies untuk analitik) digunakan semata-mata untuk meningkatkan pengalaman pengguna. Kami tidak menjual data Anda kepada pihak ketiga.
            </p>
          </section>

          <section className="bg-white/50 border border-[#EDE3CD]/50 rounded-xl p-6">
            <h2 className="text-xl font-bold mb-4 flex items-center gap-3">
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-[#EDE3CD] flex items-center justify-center text-sm font-bold">6</span>
              Perubahan Ketentuan
            </h2>
            <p className="text-[#8B7355]">
              Kami berhak mengubah syarat dan ketentuan ini sewaktu-waktu tanpa pemberitahuan sebelumnya. Pengguna diharapkan untuk memeriksa halaman ini secara berkala.
            </p>
          </section>
        </div>

        {/* Footer Note */}
        <div className="mt-12 text-center border-t border-[#EDE3CD] pt-8">
          <p className="text-sm text-[#8B7355]">
            Masih ada pertanyaan? Hubungi kami melalui <a href="https://instagram.com/macommerce_id" target="_blank" rel="noopener noreferrer" className="font-semibold underline decoration-dotted hover:text-[#5C4B37]">Instagram</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
