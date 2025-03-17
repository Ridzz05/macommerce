export interface ProductCardProps {
    name: string;
    price: number;
    imageUrl: string;
    category?: string;
    demoUrl?: string;
    marketplace: {
        shopee?: string;
        tokopedia?: string;
        lazada?: string;
        tiktokshop?: string;
    };
}

export interface ProductCardServerProps extends Omit<ProductCardProps, 'marketplace' | 'demoUrl'> {
    onDetailClick: () => void;
    onBeliClick: () => void;
} 