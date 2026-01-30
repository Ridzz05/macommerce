export interface ProductOption {
    label: string;
    price: number;
    value: string | number;
}

export interface ProductCardProps {
    name: string;
    price: number;
    imageUrl: string;
    images?: string[];
    category?: string;
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

export interface ProductCardServerProps extends Omit<ProductCardProps, 'marketplace' | 'demoUrl' | 'description' | 'features'> {
    onDetailClick: () => void;
    onBeliClick: () => void;
} 
