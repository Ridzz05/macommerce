import { ProductOption } from '../lib/products';

export interface ProductCardProps {
    name: string;
    price: number;
    discountPrice?: number;
    imageUrl: string;
    images?: string[];
    category?: string;
    description: string;
    features: string[];
    demoUrl?: string;
    options?: ProductOption[];
}

export interface ProductCardServerProps extends Omit<ProductCardProps, 'demoUrl' | 'description' | 'features' | 'images'> {
    onDetailClick: () => void;
    onBeliClick: () => void;
    optionsCount?: number;
} 
