'use client';

import { useState } from 'react';
import { createVariant, deleteVariant } from '@/app/actions/admin';
import { ProductOption } from '@/app/lib/products';
import { Trash2, Plus } from 'lucide-react';

export default function VariantManager({ productId, variants }: { productId: string, variants: ProductOption[] }) {
  const [isAdding, setIsAdding] = useState(false);
  
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setIsAdding(true);
    const result = await createVariant(productId, formData);
    setIsAdding(false);
    
    if (result.error) {
      alert(result.error);
    } else {
      (e.target as HTMLFormElement).reset();
    }
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm('Delete this variant?')) return;
    const result = await deleteVariant(id, productId);
    if (result.error) alert(result.error);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-3">
        {variants.length === 0 ? (
          <div className="p-4 border border-dashed rounded bg-gray-50 dark:bg-gray-900/50 text-center text-sm text-gray-500">
            No variants configured.
          </div>
        ) : (
          <div className="border rounded-md divide-y dark:border-gray-700 dark:divide-gray-700">
            {variants.map(v => (
              <div key={v.id} className="flex items-center justify-between p-3 bg-white dark:bg-gray-800">
                <div>
                  <div className="font-medium text-sm">{v.label}</div>
                  <div className="text-xs text-gray-500">
                    SKU: {v.sku || '-'} | +Rp {v.price.toLocaleString('id-ID')} | Stock: {v.stock}
                  </div>
                </div>
                <button 
                  onClick={() => handleDelete(v.id!)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t dark:border-gray-700">
        <h4 className="font-medium text-sm mb-3">Add New Variant</h4>
        <form onSubmit={handleAdd} className="grid grid-cols-2 gap-3">
          <input required name="name" placeholder="Name (e.g. Size M)" className="col-span-2 text-sm border p-2 rounded dark:bg-gray-900 dark:border-gray-700" />
          <input name="sku" placeholder="SKU (Optional)" className="text-sm border p-2 rounded dark:bg-gray-900 dark:border-gray-700" />
          <input required type="number" name="additionalPrice" placeholder="Additional Price (Rp)" defaultValue={0} className="text-sm border p-2 rounded dark:bg-gray-900 dark:border-gray-700" />
          <input required type="number" name="stock" placeholder="Stock" defaultValue={10} className="text-sm border p-2 rounded dark:bg-gray-900 dark:border-gray-700" />
          
          <button type="submit" disabled={isAdding} className="flex items-center justify-center gap-2 bg-gray-900 dark:bg-gray-100 text-white dark:text-gray-900 p-2 rounded font-medium text-sm disabled:opacity-50">
            <Plus size={16} /> {isAdding ? 'Adding...' : 'Add Variant'}
          </button>
        </form>
      </div>
    </div>
  );
}
