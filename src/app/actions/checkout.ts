'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { getCart, clearCart } from './cart';

// Create Order logic
export async function createOrder(formData: FormData) {
  const name = formData.get('name') as string;
  const phone = formData.get('whatsapp') as string;
  const email = formData.get('email') as string;
  const note = formData.get('note') as string;

  if (!name || !phone) {
    return { error: 'Nama dan Nomor WhatsApp wajib diisi' };
  }

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const cartItems = await getCart();

  if (!cartItems || cartItems.length === 0) {
    return { error: 'Keranjang belanja kosong' };
  }

  // Get user if logged in
  const { data: { user } } = await supabase.auth.getUser();

  // 1. Fetch variant prices to calculate true total (prevent client-side manipulation)
  const variantIds = cartItems.map(item => item.variant_id);
  const { data: variants, error: variantsError } = await supabase
    .from('product_variants')
    .select(`
        *,
        products (base_price, name)
    `)
    .in('id', variantIds);

  if (variantsError || !variants) {
    return { error: 'Gagal mengambil data produk' };
  }

  // Calculate total amount
  let totalAmount = 0;
  const orderItemsData = [];
  const reportItems = []; // For whatsapp formatting

  for (const item of cartItems) {
    const variant = variants.find(v => v.id === item.variant_id);
    if (!variant) continue;

    const basePrice = Number(variant.products?.base_price || 0);
    const additionalPrice = Number(variant.additional_price || 0);
    const price = basePrice + additionalPrice;
    
    totalAmount += price * item.quantity;
    
    orderItemsData.push({
      variant_id: item.variant_id,
      quantity: item.quantity,
      price_at_time: price
    });

    reportItems.push({
      productName: variant.products?.name,
      variantName: variant.name,
      quantity: item.quantity,
      price: price
    });
  }

  if (orderItemsData.length === 0) {
    return { error: 'Produk tidak valid' };
  }

  // 2. Insert into orders table
  const { data: order, error: orderError } = await supabase
    .from('orders')
    .insert({
      user_id: user ? user.id : null,
      status: 'pending',
      total_amount: totalAmount,
      customer_name: name,
      customer_phone: phone,
      shipping_address: email ? `Email: ${email}` : null // Using string text field to save info
    })
    .select()
    .single();

  if (orderError || !order) {
    console.error('Order Error:', orderError);
    return { error: 'Gagal membuat pesanan' };
  }

  // 3. Insert into order_items
  const mappedOrderItems = orderItemsData.map(oi => ({
    order_id: order.id,
    variant_id: oi.variant_id,
    quantity: oi.quantity,
    price_at_time: oi.price_at_time
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(mappedOrderItems);

  if (itemsError) {
    console.error('Order Items Error:', itemsError);
    return { error: 'Gagal merekam detail pesanan' };
  }

  // 4. Clear the cart
  await clearCart();

  return { success: true, orderId: order.id, items: reportItems, total: totalAmount };
}
