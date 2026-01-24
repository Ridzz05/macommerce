export type Category = 'Digital Product' | 'Jasa Online';

interface CategoryInfo {
    name: Category;
    icon: string;
}

export interface Product {
    id: number;
    name: string;
    price: number;
    imageUrl: string;
    images?: string[];
    category: Category;
    description: string;
    features: string[];
    demoUrl?: string;
    marketplace: {
        tokopedia?: string;
        lazada?: string;
        tiktokshop?: string;
    };
}

export const categoryInfo: CategoryInfo[] = [
    {
        name: 'Digital Product',
        icon: 'M4.5 12a7.5 7.5 0 1115 0 7.5 7.5 0 01-15 0z'
    },
    {
        name: 'Jasa Online',
        icon: 'M8.25 6.75h7.5a1.5 1.5 0 011.5 1.5v7.5a1.5 1.5 0 01-1.5 1.5h-7.5a1.5 1.5 0 01-1.5-1.5v-7.5a1.5 1.5 0 011.5-1.5z'
    }
];

export const categories: Category[] = categoryInfo.map(cat => cat.name);

export const products: Product[] = [];
