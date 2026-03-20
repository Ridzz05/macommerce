'use client';

import { deleteProduct } from '@/app/actions/admin';
import { Trash2 } from 'lucide-react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DeleteProductButton({ id, name }: { id: string | number, name: string }) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete "${name}"? This cannot be undone.`)) {
      return;
    }
    
    setIsDeleting(true);
    const result = await deleteProduct(id);
    
    if (result.error) {
      alert(`Failed to delete: ${result.error}`);
      setIsDeleting(false);
    } else {
      router.refresh();
    }
  };

  return (
    <button 
      onClick={handleDelete}
      disabled={isDeleting}
      className="p-2 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-md transition-colors disabled:opacity-50"
      title="Delete product"
    >
      <Trash2 size={16} />
    </button>
  );
}
