import ProductForm from '../../ProductForm';
import VariantManager from '../../VariantManager';
import { getProductById } from '@/app/lib/products';
import { notFound } from 'next/navigation';

export const metadata = { title: 'Edit Product | Admin' };

export default async function EditProductPage({ params }: { params: { id: string } }) {
  const product = await getProductById(params.id);
  
  if (!product) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Edit Product</h2>
        <p className="text-sm text-gray-500">Update product details and manage variants.</p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Core Details</h3>
            <ProductForm product={product} />
          </div>
        </div>
        
        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Product Variants</h3>
            <div className="text-sm text-gray-500 mb-6">
              Manage sizes, colors, and licensing options for this product.
            </div>
            <VariantManager productId={product.id.toString()} variants={product.options || []} />
          </div>
        </div>
      </div>
    </div>
  );
}
