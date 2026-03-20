import { Product } from '../lib/products'
import ProductCardClient from './ProductCard'
import { ProductGridClient } from './ProductGridClient'

interface ProductGridProps {
    products: Product[];
    filteredCategory: string | null;
}

// Server Component
const ProductGrid = ({ products, filteredCategory }: ProductGridProps) => {
    return (
        <ProductGridClient
            products={products}
            filteredCategory={filteredCategory}
        />
    );
};

export default ProductGrid; 