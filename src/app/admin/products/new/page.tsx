import ProductForm from '../ProductForm';

export const metadata = { title: 'Add New Product | Admin' };

export default function NewProductPage() {
  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <h2 className="text-3xl font-bold tracking-tight">Add New Product</h2>
      <p className="text-sm text-gray-500">Create a new item in your store&apos;s catalog.</p>
      
      <ProductForm />
    </div>
  );
}
