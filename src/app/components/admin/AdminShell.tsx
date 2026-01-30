import Link from 'next/link'
import Image from 'next/image'

interface AdminShellProps {
  title: string
  subtitle?: string
  children: React.ReactNode
  action?: React.ReactNode
  showBackLink?: boolean
  backHref?: string
  hideHeader?: boolean
}

const navItems = [
  { label: 'Traffic Pengunjung', href: '#', disabled: true },
  { label: 'Data Penjualan', href: '#', disabled: true },
  { label: 'Produk Populer', href: '#', disabled: true },
  { label: 'Kelola Produk', href: '/admin/products', disabled: false },
]

export default function AdminShell({
  title,
  subtitle,
  children,
  action,
  showBackLink = true,
  backHref = '/',
  hideHeader = false,
}: AdminShellProps) {
  return (
    <div className="min-h-screen bg-[#FFFBF2]">
      <div className="flex">
        <aside className="hidden lg:flex w-64 flex-col border-r border-[#EDE3CD] bg-[#FDF6E3] min-h-screen px-5 py-6">
          <Link href="/" className="flex items-center gap-2 mb-8">
            <div className="relative w-9 h-9">
              <Image
                src="/images/logo/macommerce.png"
                alt="MaCommerce"
                fill
                sizes="36px"
                className="object-contain"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-sm font-semibold text-[#5C4B37]">MaCommerce</span>
              <span className="text-xs text-[#8B7355]">Admin</span>
            </div>
          </Link>

          <nav className="space-y-1 text-sm">
            {navItems.map((item) => {
              const isDisabled = item.disabled
              return (
                <Link
                  key={item.label}
                  href={isDisabled ? '#' : item.href}
                  className={`flex items-center justify-between rounded-lg px-3 py-2 transition-colors ${
                    isDisabled
                      ? 'text-[#B7A58B] cursor-not-allowed pointer-events-none'
                      : 'text-[#5C4B37] hover:bg-[#EDE3CD]'
                  }`}
                  aria-disabled={isDisabled}
                  tabIndex={isDisabled ? -1 : 0}
                >
                  <span>{item.label}</span>
                  {isDisabled && (
                    <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#EDE3CD] text-[#8B7355]">
                      Segera
                    </span>
                  )}
                </Link>
              )
            })}
          </nav>

          <div className="mt-auto pt-6 border-t border-[#EDE3CD] text-xs text-[#8B7355]">
            Curated discovery admin console.
          </div>
        </aside>

        <div className="flex-1 min-w-0">
          {!hideHeader && (
            <header className="sticky top-0 z-40 bg-[#FFFBF2]/90 backdrop-blur border-b border-[#EDE3CD]">
              <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                <div>
                  <h1 className="text-xl font-semibold text-[#5C4B37]">{title}</h1>
                  {subtitle && <p className="text-sm text-[#8B7355] mt-1">{subtitle}</p>}
                </div>
                <div className="flex items-center gap-2">
                  {showBackLink ? (
                    <Link
                      href={backHref}
                      className="px-3 py-2 rounded-lg border border-[#EDE3CD] text-xs font-medium text-[#5C4B37] hover:bg-[#F5ECD6] transition-colors"
                    >
                      Kembali ke situs
                    </Link>
                  ) : null}
                  {action ? <div className="flex items-center gap-2">{action}</div> : null}
                </div>
              </div>
            </header>
          )}

          <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            {children}
          </main>
        </div>
      </div>
    </div>
  )
}
