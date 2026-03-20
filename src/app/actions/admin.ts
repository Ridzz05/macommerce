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
