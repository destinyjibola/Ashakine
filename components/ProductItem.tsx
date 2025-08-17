import React, { useState } from "react";
import Image from "next/image";
import { FiEdit2, FiTrash2, FiPhone } from "react-icons/fi";
import { Product } from "@/types";

interface ProductItemProps {
  product: Product;
  handleDeleteProduct: (productId: string) => void;
  setEditingProduct: (product: Product | null) => void;
  showContactButton?: boolean;
}

const ProductItem = ({
  product,
  handleDeleteProduct,
  setEditingProduct,
  showContactButton = false,
}: ProductItemProps) => {
  const [isHovered, setIsHovered] = useState(false);

  const hasDiscount = product.discount > 0;
  const currentPrice = parseFloat(product.price.toString());
  const formerPrice = parseFloat(product.formerPrice?.toString() || "0");

  return (
    <div 
      className="relative bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image Section */}
      <div className="relative w-full h-48 bg-gray-100 overflow-hidden">
        {product.image?.url ? (
          <Image
            src={product.image.url}
            alt={product.image.altText || `${product.name} image`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className={`object-cover transition-transform duration-300 ${isHovered ? 'scale-105' : 'scale-100'}`}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <span className="text-sm font-medium text-gray-400">No Image Available</span>
          </div>
        )}
        
        {/* Discount Badge */}
        {hasDiscount && (
          <div className="absolute top-3 right-3 bg-red-500 text-white text-xs font-bold px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>

      {/* Content Section */}
      <div className="p-4">
        {/* Product Title */}
        <h3 className="text-lg font-bold text-gray-900 mb-1 line-clamp-1" title={product.name}>
          {product.name}
        </h3>
        
    
        {/* Description */}
        {/* <p className="text-sm text-gray-600 mb-4 line-clamp-2" title={product.description}>
          {product.description}
        </p> */}
        
        {/* Price Section */}
        <div className="flex md:flex-row flex-col md:items-center items-start md:justify-between justify-start">
          <div className="flex items-baseline gap-2">
            {/* Current Price */}
            <span className="text-xl font-bold text-gray-900">
              ₦{currentPrice.toFixed(2)}
            </span>
            
            {/* Former Price with slash */}
            {hasDiscount && formerPrice > 0 && (
              <span className="text-sm text-gray-500 line-through">
                ${formerPrice.toFixed(2)}
              </span>
            )}
          </div>
          
          {/* Phone Number */}
          {product.phoneNumber && (
            <div className="flex items-center text-sm text-gray-600">
              <FiPhone className="mr-1" />
              <span>{product.phoneNumber}</span>
            </div>
          )}
        </div>

        {/* Buy Button - Conditionally Rendered */}
        {showContactButton && product.phoneNumber && (
          <div className="mt-4">
            <a 
              href={`https://wa.me/${product.phoneNumber.replace(/[^\d+]/g, '')}`}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full block text-center bg-green-500 hover:bg-green-600 text-white font-medium py-2 px-4 rounded-lg transition-colors"
            >
              Buy Now (WhatsApp)
            </a>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className={`absolute top-3 left-3 flex gap-2 transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <button
          onClick={() => setEditingProduct(product)}
          className="bg-white/90 hover:bg-white text-gray-700 p-2 rounded-lg shadow-sm transition-colors"
          aria-label="Edit product"
        >
          <FiEdit2 className="w-4 h-4" />
        </button>
        <button
          onClick={() => handleDeleteProduct(product._id)}
          className="bg-white/90 hover:bg-white text-red-500 p-2 rounded-lg shadow-sm transition-colors"
          aria-label="Delete product"
        >
          <FiTrash2 className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default ProductItem;