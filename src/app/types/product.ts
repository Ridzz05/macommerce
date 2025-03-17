export interface ProductCardProps {
    name: string;
    price: number;
    imageUrl: string;
    category?: string;
    description: string;
    features: string[];
    demoUrl?: string;
    marketplace: {
        shopee?: string;
        tokopedia?: string;
        lazada?: string;
        tiktokshop?: string;
    };
}

export interface ProductCardServerProps extends Omit<ProductCardProps, 'marketplace' | 'demoUrl' | 'description' | 'features'> {
    onDetailClick: () => void;
    onBeliClick: () => void;
} 