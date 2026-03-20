import Link from 'next/link';
import { Package, ShoppingCart, LayoutDashboard, Settings } from 'lucide-react';

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="w-64 bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 font-bold text-lg border-b border-gray-200 dark:border-gray-700">
          Admin Dashboard
        </div>
        <nav className="flex-1 p-4 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium transition-colors">
            <LayoutDashboard size={18} /> Overview
          </Link>
          <Link href="/admin/products" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium transition-colors">
            <Package size={18} /> Products
          </Link>
          <Link href="/admin/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium transition-colors">
            <ShoppingCart size={18} /> Orders
          </Link>
        </nav>
        <div className="p-4 border-t border-gray-200 dark:border-gray-700">
          <Link href="/admin/settings" className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 text-sm font-medium text-gray-600 dark:text-gray-300 transition-colors">
            <Settings size={18} /> Settings
          </Link>
        </div>
      </aside>
      
      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between px-6 md:px-8">
          <h1 className="font-semibold text-gray-800 dark:text-gray-100">macommerce</h1>
          <div className="flex items-center gap-4">
            <span className="text-sm text-gray-500">Administrator</span>
            <Link href="/" className="text-sm font-medium text-indigo-600 hover:text-indigo-800 transition-colors">
              Back to Store &rarr;
            </Link>
          </div>
        </header>
        
        {/* Page Content */}
        <div className="p-6 md:p-8 flex-1 overflow-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
