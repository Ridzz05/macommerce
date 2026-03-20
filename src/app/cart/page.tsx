import { getCart } from '@/app/actions/cart';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import CartClient from './CartClient';

export const dynamic = 'force-dynamic';

export default async function CartPage() {
    const cartItems = await getCart();
    
    // Check if cart is empty early
    if (cartItems.length === 0) {
        return <CartClient initialItems={[]} />;
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const variantIds = cartItems.map(item => item.variant_id);

    // Fetch variants mapping to these IDs
    const { data: variants, error } = await supabase
        .from('product_variants')
        .select(`
            *,
            products (*)
        `)
        .in('id', variantIds);

    if (error) {
        console.error('Error fetching variants for cart:', error);
    }

    // Combine
    const enrichedItems = cartItems.map(item => {
        const variantInfo = variants?.find(v => v.id === item.variant_id);
        const basePrice = Number(variantInfo?.products?.base_price || 0);
        const additionalPrice = Number(variantInfo?.additional_price || 0);
        
        return {
            variant_id: item.variant_id,
            quantity: item.quantity,
            productName: variantInfo?.products?.name || 'Produk Tidak Ditemukan',
            variantName: variantInfo?.name || '',
            price: basePrice + additionalPrice,
            imageUrl: variantInfo?.products?.image_url || '/placeholder.png',
            sku: variantInfo?.sku || ''
        };
    }).filter(item => item.productName !== 'Produk Tidak Ditemukan'); // Filter out dangling items

    return <CartClient initialItems={enrichedItems} />;
}
