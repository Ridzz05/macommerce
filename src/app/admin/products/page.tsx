import AdminProductsClient from './AdminProductsClient'
import { AdminProtectedRoute } from '@/app/components/AdminProtectedRoute'

export const dynamic = 'force-dynamic'

export default function AdminProductsPage() {
  return (
    <AdminProtectedRoute>
      <div className="pt-20 pb-12 bg-[#FFFBF2]">
        <AdminProductsClient />
      </div>
    </AdminProtectedRoute>
  )
}
  