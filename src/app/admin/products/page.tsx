import AdminProductsClient from './AdminProductsClient'
import { AdminProtectedRoute } from '@/app/components/AdminProtectedRoute'
import AdminShell from '@/app/components/admin/AdminShell'

export const dynamic = 'force-dynamic'

export default function AdminProductsPage() {
  return (
    <AdminProtectedRoute>
      <AdminShell
        title="Produk"
        hideHeader
        showBackLink={false}
      >
        <AdminProductsClient />
      </AdminShell>
    </AdminProtectedRoute>
  )
}
  
