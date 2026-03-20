import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import OrderStatusUpdater from './OrderStatusUpdater';
import { ArrowLeft } from 'lucide-react';

export const metadata = { title: 'Order Details | Admin' };

async function getOrderDetails(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  
  // Get main order
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .select('*')
    .eq('id', id)
    .single();
    
  if (orderError || !order) return null;

  // Get order items with product details
  const { data: items, error: itemsError } = await supabase
    .from('order_items')
    .select(`
      *,
      products (name, image_url),
      product_variants (name, sku)
    `)
    .eq('order_id', id);

  return { order, items: items || [] };
}

export default async function AdminOrderDetailsPage({ params }: { params: { id: string } }) {
  const details = await getOrderDetails(params.id);
  
  if (!details) return notFound();
  
  const { order, items } = details;

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4 mb-4">
        <Link href="/admin/orders" className="p-2 bg-white dark:bg-gray-800 rounded-full border border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-700 transition">
          <ArrowLeft size={18} />
        </Link>
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Order #{order.id.slice(0, 8)}</h2>
          <p className="text-sm text-gray-500">
            Placed on {new Date(order.created_at).toLocaleString('id-ID')}
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Order Items</h3>
            <div className="space-y-4 divide-y dark:divide-gray-700">
              {items.map((item: any) => (
                <div key={item.id} className="pt-4 first:pt-0 flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gray-100 dark:bg-gray-700 rounded-md overflow-hidden relative">
                      {item.products?.image_url && (
                        /* eslint-disable-next-line @next/next/no-img-element */
                        <img src={item.products.image_url} alt={item.products.name} className="w-full h-full object-cover" />
                      )}
                    </div>
                    <div>
                      <div className="font-medium">{item.products?.name || 'Unknown Product'}</div>
                      {item.product_variants && (
                        <div className="text-sm text-gray-500">Variant: {item.product_variants.name}</div>
                      )}
                      <div className="text-sm text-gray-500">Qty: {item.quantity} x Rp {Number(item.unit_price).toLocaleString('id-ID')}</div>
                    </div>
                  </div>
                  <div className="font-medium text-right">
                    Rp {Number(item.total_price).toLocaleString('id-ID')}
                  </div>
                </div>
              ))}
            </div>
            
            <div className="mt-6 pt-4 border-t dark:border-gray-700 flex justify-between items-center bg-gray-50 dark:bg-gray-900/50 p-4 rounded-md">
              <span className="font-medium">Total Amount</span>
              <span className="text-xl font-bold text-indigo-600 dark:text-indigo-400">
                Rp {Number(order.total_amount).toLocaleString('id-ID')}
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Update Status</h3>
            <OrderStatusUpdater orderId={order.id} currentStatus={order.status} />
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium mb-4">Customer Info</h3>
            <div className="space-y-3 text-sm">
              <div>
                <span className="block text-gray-500">Name</span>
                <span className="font-medium">{order.customer_name}</span>
              </div>
              <div>
                <span className="block text-gray-500">Email</span>
                <span className="font-medium">{order.customer_email || '-'}</span>
              </div>
              <div>
                <span className="block text-gray-500">Phone</span>
                <span className="font-medium">{order.customer_phone || '-'}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
