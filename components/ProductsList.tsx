import React from "react";
import { Event, Product, Vendor } from "@/types";
import ProductItem from "./ProductItem";


interface ProductsListProps {
  event: Event | null;
  products: Product[];
  handleDeleteProduct: (productId: string) => void;
  setEditingProduct: (product: Product | null) => void;
}

const ProductsList = ({
  event,
  products,
  handleDeleteProduct,
  setEditingProduct,
}: ProductsListProps) => (
  <div className="mt-4">
    {!event ? (
      <div className="bg-gray-100 rounded-xl p-8 text-center border border-gray-300">
        <p className="text-gray-500">Loading event...</p>
      </div>
    ) : products.length === 0 ? (
      <div className="bg-gray-100 rounded-xl p-8 text-center border border-gray-300">
        <p className="text-gray-500">No products added yet</p>
      </div>
    ) : (
      <div className="mt-6">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Products ({products.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {products.map((product) => (
            <ProductItem
              key={product._id}
              product={product}
              handleDeleteProduct={handleDeleteProduct}
              setEditingProduct={setEditingProduct}
            />
          ))}
        </div>
      </div>
    )}
  </div>
);

export default ProductsList;