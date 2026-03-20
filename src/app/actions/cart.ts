'use server';

import { createClient } from '@/lib/supabase/server';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';

type CartItemInput = {
  variant_id: string;
  quantity: number;
};

// Sync cart items from KV database to user cart_items in Postgres
export async function syncCartFromKV(userId: string) {
  const cookieStore = await cookies();
  const guestCartId = cookieStore.get('guest_cart_id')?.value;

  if (!guestCartId) return;

  const guestCart: CartItemInput[] | null = await kv.get(`cart:${guestCartId}`);
  
  if (!guestCart || guestCart.length === 0) return;

  const supabase = await createClient();

  const cartItemsToInsert = guestCart.map(item => ({
    user_id: userId,
    variant_id: item.variant_id,
    quantity: item.quantity
  }));

  // Perform bulk upsert. Postgres constraint UNIQUE(user_id, variant_id) must be met
  const { error } = await supabase
    .from('cart_items')
    .upsert(cartItemsToInsert, { 
      onConflict: 'user_id,variant_id',
      ignoreDuplicates: false 
    });

  if (error) {
    console.error('Error syncing cart:', error.message);
    return;
  }

  // Clear guest KV logic after successful cart sync
  await kv.del(`cart:${guestCartId}`);
  cookieStore.delete('guest_cart_id');
}
