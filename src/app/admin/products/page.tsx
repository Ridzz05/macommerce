import { getProducts } from '@/app/lib/products';
import Link from 'next/link';
import { Plus, Edit } from 'lucide-react';
import Image from 'next/image';
import DeleteProductButton from './DeleteProductButton';

export const metadata = {
  title: 'Manage Products | Admin',
};

// Force dynamic so admin sees latest products
export const dynamic = 'force-dynamic';

export default async function AdminProductsPage() {
  const products = await getProducts();

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Products</h2>
          <p className="text-sm text-gray-500 mt-1">Manage your store products and variants.</p>
        </div>
        <Link 
          href="/admin/products/new" 
          className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md font-medium transition-colors"
        >
          <Plus size={18} />
          Add Product
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm text-left">
            <thead className="bg-gray-50 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700">
              <tr>
                <th className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">Product</th>
                <th className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">Category</th>
                <th className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">Price</th>
                <th className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100">Variants</th>
                <th className="px-6 py-4 font-medium text-gray-900 dark:text-gray-100 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {products.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-10 text-center text-gray-500">
                    No products found. Start by adding a new one.
                  </td>
                </tr>
              ) : (
                products.map((product) => (
                  <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 relative flex-shrink-0 bg-gray-100 dark:bg-gray-700 rounded overflow-hidden">
                          {product.imageUrl ? (
                            <Image src={product.imageUrl} alt={product.name} fill className="object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gray-200 dark:bg-gray-800"></div>
                          )}
                        </div>
                        <div>
                          <div className="font-medium text-gray-900 dark:text-gray-100">{product.name}</div>
                          <div className="text-xs text-gray-500">{product.slug}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-900/30 dark:text-indigo-400">
                        {product.category}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span className="font-medium">Rp {product.price.toLocaleString('id-ID')}</span>
                      {product.discountPrice && (
                        <div className="text-xs text-red-500 line-through">Rp {product.discountPrice.toLocaleString('id-ID')}</div>
                      )}
                    </td>
                    <td className="px-6 py-4 text-gray-500">
                      {product.options?.length || 0} variants
                    </td>
                    <td className="px-6 py-4 text-right">
                      <div className="flex items-center justify-end gap-2">
                        <Link 
                          href={`/admin/products/${product.id}/edit`}
                          className="p-2 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/30 rounded-md transition-colors"
                        >
                          <Edit size={16} />
                        </Link>
                        <DeleteProductButton id={product.id} name={product.name} />
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
