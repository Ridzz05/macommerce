'use client';

import { createProduct, updateProduct } from '@/app/actions/admin';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { Product } from '@/app/lib/products';

export default function ProductForm({ product }: { product?: Product }) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    const formData = new FormData(e.currentTarget);
    const result = product 
      ? await updateProduct(product.id.toString(), formData)
      : await createProduct(formData);
      
    if (result.error) {
      alert(`Error: ${result.error}`);
      setIsSubmitting(false);
    } else {
      router.push('/admin/products');
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Product Name</label>
          <input required name="name" defaultValue={product?.name} className="w-full border-gray-300 border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="e.g. Masterclass E-Commerce" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Base Price (Rp)</label>
          <input required type="number" name="basePrice" defaultValue={product?.price} className="w-full border-gray-300 border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Discount Price (Rp) - Optional</label>
          <input type="number" name="discountPrice" defaultValue={product?.discountPrice} className="w-full border-gray-300 border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Leave blank if no discount" />
        </div>

        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Category</label>
          <select required name="category" defaultValue={product?.category || 'Digital Product'} className="w-full border-gray-300 border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500">
            <option value="Digital Product">Digital Product</option>
            <option value="Jasa Online">Jasa Online</option>
            <option value="Growth Tools">Growth Tools</option>
          </select>
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Image URL</label>
          <input required name="imageUrl" defaultValue={product?.imageUrl} placeholder="https://..." className="w-full border-gray-300 border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" />
        </div>
        
        <div className="col-span-2">
          <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Description</label>
          <textarea required name="description" defaultValue={product?.description} rows={5} className="w-full border-gray-300 border px-3 py-2 rounded-md dark:bg-gray-900 dark:border-gray-600 focus:outline-none focus:ring-2 focus:ring-indigo-500" placeholder="Describe the item..."></textarea>
        </div>
      </div>
      
      <div className="flex justify-end gap-3 pt-4 mt-6 border-t border-gray-200 dark:border-gray-700">
        <button type="button" onClick={() => router.back()} className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          Cancel
        </button>
        <button type="submit" disabled={isSubmitting} className="px-5 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 transition disabled:opacity-50">
          {isSubmitting ? 'Saving...' : (product ? 'Update Data' : 'Save Product')}
        </button>
      </div>
    </form>
  );
}
