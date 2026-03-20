import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// We use the basic supabase client here without cookies to avoid opting out of ISR/Static caching.
// This is for public reads only.
export const supabasePublic = createClient(supabaseUrl, supabaseKey);

export type Category = 'Digital Product' | 'Jasa Online' | 'Growth Tools';

export interface CategoryInfo {
    name: Category;
    icon: string;
}

export const categoryInfo: CategoryInfo[] = [
    {
        name: 'Digital Product',
        icon: 'M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z'
    },
    {
        name: 'Jasa Online',
        icon: 'M8.25 6.75h7.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z'
    },
    {
        name: 'Growth Tools',
        icon: 'M15.59 14.37a6 6 0 01-5.84 7.38v-4.8m5.84-2.58a14.98 14.98 0 006.16-12.12A14.98 14.98 0 009.631 8.41m5.96 5.96a14.926 14.926 0 01-5.841 2.58m-.119-8.54a6 6 0 00-7.381 5.84h4.8m2.581-5.84a14.927 14.927 0 00-2.58 5.84m2.699 2.7c-.103.021-.207.041-.311.06a15.09 15.09 0 01-2.448-2.448 14.9 14.9 0 01.06-.312m-2.24 2.39a4.493 4.493 0 00-1.757 4.306 4.493 4.493 0 004.306-1.758M16.5 9a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z'
    }
];

export const categories: Category[] = categoryInfo.map(cat => cat.name);

export interface ProductOption {
    id?: string;
    label: string;
    price: number;
    value?: string | number;
    sku?: string;
    stock?: number;
}

export interface Product {
    id: string | number;
    name: string;
    slug?: string;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    images?: string[];
    category: Category;
    description: string;
    features: string[];
    demoUrl?: string;
    options?: ProductOption[];
}

export async function getProducts(): Promise<Product[]> {
  try {
    const { data: products, error } = await supabasePublic
      .from('products')
      .select(`
        *,
        product_variants (*)
      `)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error.message || error);
      return [];
    }

    if (!products) return [];

    return products.map((p: any) => ({
      id: p.id,
      name: p.name,
      slug: p.slug,
      description: p.description,
      price: Number(p.base_price),
      imageUrl: p.image_url,
      category: p.category,
      features: p.features || ['Detail produk unggulan', 'Kualitas terjamin'], // Fallback if missing column
      images: p.images || [],
      options: (p.product_variants || []).map((v: any) => ({
        id: v.id,
        label: v.name,
        price: Number(v.additional_price),
        sku: v.sku,
        stock: v.stock_quantity
      }))
    }));
  } catch (err) {
    console.error('Fatal fetch error:', err);
    return [];
  }
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find(p => p.slug === slug || slugify(p.name) === slug) || null;
}

export async function getProductById(id: string | number): Promise<Product | null> {
    const products = await getProducts();
    return products.find(p => p.id === id) || null;
}

export function slugify(value: string) {
  return value.toLowerCase().trim().replace(/\\s+/g, '-');
}
