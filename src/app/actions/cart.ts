'use server';

import { createClient } from '@/lib/supabase/server';
import { kv } from '@vercel/kv';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

export type CartItemInput = {
  variant_id: string;
  quantity: number;
};

// --- Core Helper Functions ---

async function getGuestCartId() {
  const cookieStore = await cookies();
  let guestCartId = cookieStore.get('guest_cart_id')?.value;
  
  if (!guestCartId) {
    guestCartId = await crypto.randomUUID();
    cookieStore.set('guest_cart_id', guestCartId, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      maxAge: 60 * 60 * 24 * 30, // 30 days
      path: '/'
    });
  }
  return guestCartId;
}

// --- Cart Operations ---

export async function getCart(): Promise<CartItemInput[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // Authenticated Cart from Postgres
    const { data, error } = await supabase
      .from('cart_items')
      .select('variant_id, quantity')
      .eq('user_id', user.id);
      
    if (error) {
      console.error('Error fetching auth cart:', error);
      return [];
    }
    return data || [];
  } else {
    // Guest Cart from KV
    const guestCartId = await getGuestCartId();
    const guestCart = await kv.get<CartItemInput[]>(`cart:${guestCartId}`);
    return guestCart || [];
  }
}

export async function addToCart(variantId: string, quantity: number = 1) {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    // Add to Postgres
    const { data: existing } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('user_id', user.id)
      .eq('variant_id', variantId)
      .single();

    if (existing) {
      await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + quantity })
        .eq('user_id', user.id)
        .eq('variant_id', variantId);
    } else {
      await supabase
        .from('cart_items')
        .insert({ user_id: user.id, variant_id: variantId, quantity });
    }
  } else {
    // Add to KV
    const guestCartId = await getGuestCartId();
    const guestCart = (await kv.get<CartItemInput[]>(`cart:${guestCartId}`)) || [];
    
    const existingIndex = guestCart.findIndex(item => item.variant_id === variantId);
    if (existingIndex > -1) {
      guestCart[existingIndex].quantity += quantity;
    } else {
      guestCart.push({ variant_id: variantId, quantity });
    }
    
    await kv.set(`cart:${guestCartId}`, guestCart);
  }
  
  revalidatePath('/');
}

export async function updateCartItemQuantity(variantId: string, quantity: number) {
  if (quantity <= 0) {
    return removeFromCart(variantId);
  }

  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('cart_items')
      .update({ quantity })
      .eq('user_id', user.id)
      .eq('variant_id', variantId);
  } else {
    const guestCartId = await getGuestCartId();
    const guestCart = (await kv.get<CartItemInput[]>(`cart:${guestCartId}`)) || [];
    
    const existingIndex = guestCart.findIndex(item => item.variant_id === variantId);
    if (existingIndex > -1) {
      guestCart[existingIndex].quantity = quantity;
      await kv.set(`cart:${guestCartId}`, guestCart);
    }
  }
  
  revalidatePath('/');
}

export async function removeFromCart(variantId: string) {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id)
      .eq('variant_id', variantId);
  } else {
    const guestCartId = await getGuestCartId();
    let guestCart = (await kv.get<CartItemInput[]>(`cart:${guestCartId}`)) || [];
    guestCart = guestCart.filter(item => item.variant_id !== variantId);
    await kv.set(`cart:${guestCartId}`, guestCart);
  }
  
  revalidatePath('/');
}

export async function clearCart() {
  const supabase = createClient(await cookies());
  const { data: { user } } = await supabase.auth.getUser();

  if (user) {
    await supabase
      .from('cart_items')
      .delete()
      .eq('user_id', user.id);
  } else {
    const guestCartId = await getGuestCartId();
    await kv.del(`cart:${guestCartId}`);
  }
  
  revalidatePath('/');
}

// Sync cart items from KV database to user cart_items in Postgres
export async function syncCartFromKV(userId: string) {
  const cookieStore = await cookies();
  const guestCartId = cookieStore.get('guest_cart_id')?.value;

  if (!guestCartId) return;

  const guestCart: CartItemInput[] | null = await kv.get(`cart:${guestCartId}`);
  
  if (!guestCart || guestCart.length === 0) return;

  const supabase = createClient(cookieStore);

  // Perform bulk upsert manually to avoid onConflict errors easily
  for (const item of guestCart) {
    const { data: existing } = await supabase
      .from('cart_items')
      .select('quantity')
      .eq('user_id', userId)
      .eq('variant_id', item.variant_id)
      .single();

    if (existing) {
      await supabase
        .from('cart_items')
        .update({ quantity: existing.quantity + item.quantity })
        .eq('user_id', userId)
        .eq('variant_id', item.variant_id);
    } else {
      await supabase
        .from('cart_items')
        .insert({ user_id: userId, variant_id: item.variant_id, quantity: item.quantity });
    }
  }

  // Clear guest KV logic after successful cart sync
  await kv.del(`cart:${guestCartId}`);
  cookieStore.delete('guest_cart_id');
}
