'use server';

import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import { revalidatePath } from 'next/cache';

async function verifyAdmin() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);
  const { data: { user } } = await supabase.auth.getUser();
  const adminEmails = process.env.ADMIN_EMAILS?.split(',') || [];
  
  if (!user?.email || !adminEmails.includes(user.email)) {
    throw new Error('Unauthorized');
  }
  return supabase;
}

function slugify(value: string) {
  return value.toLowerCase().trim().replace(/\s+/g, '-');
}

export async function deleteProduct(id: string | number) {
  try {
    const supabase = await verifyAdmin();
    const { error } = await supabase.from('products').delete().eq('id', id);
    
    if (error) {
      console.error('Delete product error:', error);
      return { error: error.message };
    }
    
    revalidatePath('/');
    revalidatePath('/admin/products');
    return { success: true };
  } catch (error: any) {
    return { error: error.message };
  }
}

export async function createProduct(formData: FormData) {
  try {
    const supabase = await verifyAdmin();
    const productData = {
      name: formData.get('name') as string,
      slug: slugify(formData.get('name') as string),
      description: formData.get('description') as string,
      base_price: Number(formData.get('basePrice')),
      discount_price: formData.get('discountPrice') ? Number(formData.get('discountPrice')) : null,
      image_url: formData.get('imageUrl') as string,
      category: formData.get('category') as string,
    };
    
    const { data, error } = await supabase.from('products').insert([productData]).select('id').single();
    if (error) return { error: error.message };
    
    revalidatePath('/');
    revalidatePath('/admin/products');
    return { success: true, id: data.id };
  } catch (error: any) { 
    return { error: error.message }; 
  }
}

export async function updateProduct(id: string, formData: FormData) {
  try {
    const supabase = await verifyAdmin();
    const productData = {
      name: formData.get('name') as string,
      slug: slugify(formData.get('name') as string),
      description: formData.get('description') as string,
      base_price: Number(formData.get('basePrice')),
      discount_price: formData.get('discountPrice') ? Number(formData.get('discountPrice')) : null,
      image_url: formData.get('imageUrl') as string,
      category: formData.get('category') as string,
    };
    
    const { error } = await supabase.from('products').update(productData).eq('id', id);
    if (error) return { error: error.message };
    
    revalidatePath('/');
    revalidatePath('/admin/products');
    revalidatePath(`/admin/products/${id}/edit`);
    return { success: true };
  } catch (error: any) { 
    return { error: error.message }; 
  }
}

export async function createVariant(productId: string, formData: FormData) {
  try {
    const supabase = await verifyAdmin();
    const variantData = {
      product_id: productId,
      name: formData.get('name') as string,
      sku: formData.get('sku') as string || null,
      additional_price: Number(formData.get('additionalPrice')),
      stock_quantity: Number(formData.get('stock')),
    };
    
    const { error } = await supabase.from('product_variants').insert([variantData]);
    if (error) return { error: error.message };
    
    revalidatePath(`/admin/products/${productId}/edit`);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) { return { error: error.message }; }
}

export async function updateVariant(id: string, productId: string, formData: FormData) {
  try {
    const supabase = await verifyAdmin();
    const variantData = {
      name: formData.get('name') as string,
      sku: formData.get('sku') as string || null,
      additional_price: Number(formData.get('additionalPrice')),
      stock_quantity: Number(formData.get('stock')),
    };
    
    const { error } = await supabase.from('product_variants').update(variantData).eq('id', id);
    if (error) return { error: error.message };
    
    revalidatePath(`/admin/products/${productId}/edit`);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) { return { error: error.message }; }
}

export async function deleteVariant(id: string, productId: string) {
  try {
    const supabase = await verifyAdmin();
    const { error } = await supabase.from('product_variants').delete().eq('id', id);
    if (error) return { error: error.message };
    
    revalidatePath(`/admin/products/${productId}/edit`);
    revalidatePath('/');
    return { success: true };
  } catch (error: any) { return { error: error.message }; }
}

export async function updateOrderStatus(id: string, status: string) {
  try {
    const supabase = await verifyAdmin();
    const { error } = await supabase.from('orders').update({ status }).eq('id', id);
    if (error) return { error: error.message };
    
    revalidatePath('/admin/orders');
    revalidatePath('/admin');
    return { success: true };
  } catch (error: any) { return { error: error.message }; }
}
