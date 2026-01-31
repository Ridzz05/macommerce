import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#EDE3CD] bg-[#FDF6E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[#5C4B37]">MaCommerce</p>
          <p className="mt-2 text-xs text-[#8B7355]">
            Platform kurasi premium untuk Digital Product, Jasa Online, dan Growth Tools.
          </p>
          <p className="mt-2 text-xs text-[#8B7355]">
             Kami menyederhanakan proses penemuan produk berkualitas dan menghubungkan Anda langsung dengan solusi terbaik melalui WhatsApp & Instagram.
          </p>
        </div>

        <div className="sm:justify-self-end">
          <p className="text-xs font-semibold text-[#5C4B37]">Tautan</p>
          <div className="mt-2 flex flex-col gap-2 text-xs text-[#8B7355]">
            <Link href="/about" className="hover:text-[#5C4B37]">
              Tentang
            </Link>
            <Link href="/about#contact" className="hover:text-[#5C4B37]">
              Hubungi Kami
            </Link>
            <Link href="/terms" className="hover:text-[#5C4B37]">
              Syarat & Ketentuan
            </Link>
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://instagram.com/macommerce_id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B7355] hover:text-[#5C4B37]"
              aria-label="Instagram"
            >
               <Image
                src="/images/marketplace/ig.svg"
                alt="Instagram"
                width={20}
                height={20}
                className="object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
