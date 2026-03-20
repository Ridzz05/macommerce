'use client';

import { updateOrderStatus } from '@/app/actions/admin';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function OrderStatusUpdater({ 
  orderId, 
  currentStatus 
}: { 
  orderId: string; 
  currentStatus: string; 
}) {
  const [isUpdating, setIsUpdating] = useState(false);
  const router = useRouter();

  const handleUpdate = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsUpdating(true);
    
    const formData = new FormData(e.currentTarget);
    const newStatus = formData.get('status') as string;
    
    const result = await updateOrderStatus(orderId, newStatus);
    
    setIsUpdating(false);
    if (result.error) alert(result.error);
    else router.refresh();
  };

  return (
    <form onSubmit={handleUpdate} className="flex items-center gap-3">
      <select 
        name="status" 
        defaultValue={currentStatus}
        className="border px-3 py-1.5 rounded-md text-sm dark:bg-gray-800 dark:border-gray-700"
      >
        <option value="pending">Pending</option>
        <option value="processing">Processing</option>
        <option value="completed">Completed</option>
        <option value="cancelled">Cancelled</option>
      </select>
      <button 
        type="submit" 
        disabled={isUpdating}
        className="bg-indigo-600 hover:bg-indigo-700 text-white text-sm px-4 py-1.5 rounded-md disabled:opacity-50"
      >
        {isUpdating ? 'Updating...' : 'Update Status'}
      </button>
    </form>
  );
}
