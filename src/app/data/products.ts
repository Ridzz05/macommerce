export type Category = 'Digital Product' | 'Jasa Online' | 'Growth Tools';

interface CategoryInfo {
    name: Category;
    icon: string;
}

export interface ProductOption {
    label: string;
    price: number;
    value: string | number;
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
    options?: ProductOption[];
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

export const products: Product[] = [
    {
        id: 1,
        name: "TikTok Views Booster",
        price: 10000,
        imageUrl: "/images/products/tiktok-views.jpg", // Placeholder image path
        category: "Growth Tools",
        description: "Increase your TikTok visibility with our premium views package. Safe, fast, and reliable.",
        features: ["Instant Delivery", "High Retention", "24/7 Support", "No Password Required"],
        marketplace: {},
        options: [
            { label: "100 Views", price: 10000, value: "100_views" },
            { label: "200 Views", price: 20000, value: "200_views" },
            { label: "500 Views", price: 45000, value: "500_views" },
            { label: "Custom", price: 0, value: "custom" }
        ]
    },
    {
        id: 2,
        name: "TikTok Likes Booster",
        price: 1000,
        imageUrl: "/images/products/tiktok-views.jpg", // Re-using placeholder for now
        category: "Growth Tools",
        description: "Boost your engagement with real likes.",
        features: ["High Quality", "Real Users", "Fast Delivery"],
        marketplace: {},
        options: [
            { label: "100 Likes", price: 15000, value: "100_likes" },
            { label: "500 Likes", price: 70000, value: "500_likes" }
        ]
    }
];
