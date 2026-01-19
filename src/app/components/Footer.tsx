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
            <a
              href="https://www.tiktok.com/@pawpewslebew"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B7355] hover:text-[#5C4B37]"
              aria-label="TikTok"
            >
              <Image
                src="/images/marketplace/tiktok.svg"
                alt="TikTok"
                width={20}
                height={20}
                className="object-contain"
              />
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
             <a
              href="https://shopee.co.id"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#8B7355] hover:text-[#5C4B37]"
              aria-label="Tokopedia"
            >
              <Image
                src="https://upload.wikimedia.org/wikipedia/commons/f/fe/Shopee.svg"
                alt="Shopee"
                width={45}
                height={45}
                className="object-contain"
              />
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
