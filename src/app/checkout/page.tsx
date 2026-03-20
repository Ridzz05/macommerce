import { getCart } from '@/app/actions/cart';
import { createClient } from '@/lib/supabase/server';
import { cookies } from 'next/headers';
import CheckoutClient from './CheckoutClient';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function CheckoutPage() {
    const cartItems = await getCart();
    
    if (cartItems.length === 0) {
        redirect('/cart'); // Redirect back if empty
    }

    const cookieStore = await cookies();
    const supabase = createClient(cookieStore);
    const variantIds = cartItems.map(item => item.variant_id);

    // Fetch variants mapping to these IDs
    const { data: variants } = await supabase
        .from('product_variants')
        .select(`
            *,
            products (*)
        `)
        .in('id', variantIds);

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
            imageUrl: variantInfo?.products?.image_url || '/placeholder.png'
        };
    }).filter(item => item.productName !== 'Produk Tidak Ditemukan');

    if (enrichedItems.length === 0) {
        redirect('/cart');
    }

    // Get contact info from data
    const contactInfo = {
        whatsapp: '6281234567890' // Can be hardcoded or from DB
    };
    
    // Fallback if the user actually has a session, we can prefill data
    const { data: { user } } = await supabase.auth.getUser();

    return (
        <CheckoutClient 
            initialItems={enrichedItems} 
            userEmail={user?.email} 
            adminWhatsapp={contactInfo.whatsapp}
        />
    );
}
