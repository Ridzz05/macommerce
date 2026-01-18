import Image from 'next/image'
import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="mt-12 border-t border-[#EDE3CD] bg-[#FDF6E3]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 grid gap-6 sm:grid-cols-2">
        <div>
          <p className="text-sm font-semibold text-[#5C4B37]">MaCommerce</p>
          <p className="mt-2 text-xs text-[#8B7355]">
            Smart discovery brand—curated picks, not random products.
          </p>
          <p className="mt-2 text-xs text-[#8B7355]">
            Kami bukan marketplace. MaCommerce adalah ruang kurasi yang mengarahkan ke toko resmi atau TikTok Shop affiliate.
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
          </div>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B7355] hover:text-[#5C4B37]"
              aria-label="Instagram"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M7 3h10a4 4 0 014 4v10a4 4 0 01-4 4H7a4 4 0 01-4-4V7a4 4 0 014-4zm0 2a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2H7zm5 3.5a4.5 4.5 0 110 9 4.5 4.5 0 010-9zm0 2a2.5 2.5 0 100 5 2.5 2.5 0 000-5zm5.25-3.05a1.05 1.05 0 110 2.1 1.05 1.05 0 010-2.1z" />
              </svg>
            </a>
            <a
              href="https://tiktok.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B7355] hover:text-[#5C4B37]"
              aria-label="TikTok"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5" fill="currentColor">
                <path d="M17.5 6.2c-1.1-.7-1.9-1.7-2.2-3.2h-2.1v11.1a2.6 2.6 0 11-2.6-2.6c.3 0 .6 0 .9.1v-2.1a4.7 4.7 0 00-1-.1A4.7 4.7 0 109 14.1V3h4.2c.2 1.5 1 2.8 2.3 3.7 1 .7 2.2 1.1 3.5 1.2V6.2c-.7 0-1.7-.2-2.5-.7z" />
              </svg>
            </a>
            <a
              href="https://tokopedia.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B7355] hover:text-[#5C4B37]"
              aria-label="Tokopedia"
            >
              <Image
                src="/images/marketplace/tokopedia.webp"
                alt="Tokopedia"
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
