import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FDF6E3] flex items-center justify-center px-4">
      <div className="text-center max-w-md">
        {/* 404 Icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-24 h-24 rounded-full bg-[#EDE3CD]/60 flex items-center justify-center">
            <svg className="w-12 h-12 text-[#C8956C]" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
          </div>
        </div>

        {/* Text */}
        <h1 className="text-6xl font-bold text-[#C8956C] mb-2">404</h1>
        <h2 className="text-xl font-semibold text-[#5C4B37] mb-3">
          Halaman Tidak Ditemukan
        </h2>
        <p className="text-sm text-[#8B7355] mb-8 leading-relaxed">
          Maaf, halaman yang kamu cari tidak ada atau sudah dipindahkan.
          Yuk kembali ke beranda dan temukan produk menarik! 😊
        </p>

        {/* CTA */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#C8956C] to-[#A67548] text-white font-medium text-sm shadow-md hover:shadow-lg hover:scale-105 transition-all duration-300"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
          </svg>
          Kembali ke Beranda
        </Link>
      </div>
    </div>
  )
}
