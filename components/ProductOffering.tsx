"use client";
import { useState } from "react";
import { Product } from "@/types";
import Image from "next/image";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";
import Modal from "@/components/Modal";

interface ProductOfferingProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductSkeleton = () => (
  <div className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
    <div className="bg-gray-200 h-60 w-full"></div>
    <div className="p-5 space-y-3">
      <div className="h-4 bg-gray-200 rounded w-3/4"></div>
      <div className="h-3 bg-gray-200 rounded w-full"></div>
      <div className="h-3 bg-gray-200 rounded w-1/2"></div>
      <div className="h-10 bg-gray-200 rounded mt-4"></div>
    </div>
  </div>
);

const ErrorDisplay = ({ error }: { error: string }) => (
  <div className="text-center bg-red-50 rounded-xl py-12 px-6 max-w-2xl mx-auto">
    <h3 className="text-xl font-medium text-red-600 mb-2">
      Could not load products
    </h3>
    <p className="text-red-500">{error}</p>
    <button
      onClick={() => window.location.reload()}
      className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
    >
      Try Again
    </button>
  </div>
);

const ProductCard = ({ product }: { product: Product }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <div className="bg-white rounded-xl overflow-hidden p-2 shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col h-full">
        <div className="relative h-[8rem] sm:h-48 w-full bg-gray-50">
          {product.image && (
            <Image
              src={product.image.url}
              alt={product.name}
              fill
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              priority={false}
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
            />
          )}
          {product.discount > 0 && (
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 bg-red-500 text-white text-xs sm:text-sm font-bold px-2 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-sm">
              Save {product.discount}%
            </div>
          )}
        </div>

        <div className="flex-grow p-2 sm:p-3">
          <h3 className="md:text-lg text-sm sm:text-base font-semibold text-gray-900 mb-1 sm:mb-2">
            {product.name}
          </h3>
        </div>

        <div className="px-2 pb-2 sm:px-3 sm:pb-3">
          <div className="flex items-center justify-between mb-2 sm:mb-4">
            <div>
              <span className="text-base sm:text-xl font-bold text-gray-900">
                ₦{product.price}
              </span>
              {product.formerPrice && (
                <span className="text-xs sm:text-sm text-gray-400 line-through ml-1 sm:ml-2">
                  ₦{product.formerPrice}
                </span>
              )}
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full flex items-center justify-center gap-1 sm:gap-2 bg-gray-900 text-white py-2 sm:py-3 px-2 rounded-lg hover:bg-gray-800 transition-colors font-medium text-xs tracking-wider"
            aria-label={`View details for ${product.name}`}
          >
            <FiShoppingCart className="text-xs sm:text-base" />
            <span>View Product</span>
            <FiArrowRight className="text-xs sm:text-base" />
          </button>
        </div>
      </div>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        <div className="flex flex-col gap-4">
          <h2 className="text-xl font-bold text-gray-900">{product.name}</h2>
          {product.image && (
            <div className="relative h-64 w-full">
              <Image
                src={product.image.url}
                alt={product.name}
                fill
                className="object-contain"
                priority={false}
                sizes="(max-width: 640px) 100vw, 400px"
              />
            </div>
          )}
          <p className="text-gray-700 text-base">{product.description}</p>
          <div className="flex items-center justify-between">
            <div>
              <span className="text-lg font-bold text-gray-900">
                ₦{product.price}
              </span>
              {product.formerPrice && (
                <span className="text-sm text-gray-400 line-through ml-2">
                  ₦{product.formerPrice}
                </span>
              )}
            </div>
            {product.discount > 0 && (
              <span className="bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full">
                Save {product.discount}%
              </span>
            )}
          </div>
          <a
            href={`https://wa.me/${product.phoneNumber}?text=${encodeURIComponent(
              `Hello, coming from Spinly I'm interested in this discount deal for ${product.name}, ₦${product.price}. Product image: ${product.image?.url || 'No image available'}`
            )}`}
            className="w-full text-sm md:text-base flex items-center justify-center gap-2 bg-gray-900 text-white py-2 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium"
            aria-label={`Contact vendor via WhatsApp for ${product.name}`}
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiShoppingCart className="text-base" />
            <span>Get Product</span>
            <FiArrowRight className="text-base" />
          </a>
        </div>
      </Modal>
    </>
  );
};

const ProductOffering: React.FC<ProductOfferingProps> = ({
  products,
  isLoading,
  error,
}) => {
  if (products.length === 0 && !isLoading && !error) {
    return null;
  }

  return (
    <section className="w-full max-w-6xl mx-auto py-8 sm:py-16 sm:px-4 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-8 sm:mb-16">
        <h2 className="text-lg md:text-2xl font-bold text-center mb-4 sm:mb-6">
          Product Offerings
        </h2>
      </div>

      {isLoading ? (
        <div className="grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
          {[...Array(4)].map((_, i) => (
            <ProductSkeleton key={i} />
          ))}
        </div>
      ) : error ? (
        <ErrorDisplay error={error} />
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 md:gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductOffering;