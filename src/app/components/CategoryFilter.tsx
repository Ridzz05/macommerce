import { Category, categories } from '../data/products';
import { CategoryFilterClient } from './CategoryFilterClient';

interface CategoryFilterProps {
    selectedCategory: string | null;
    onCategoryChange: (category: string | null) => void;
}

// Server Component
const CategoryFilter = ({ selectedCategory, onCategoryChange }: CategoryFilterProps) => {
    return (
        <CategoryFilterClient
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
            categories={categories}
        />
    );
};

export default CategoryFilter; 