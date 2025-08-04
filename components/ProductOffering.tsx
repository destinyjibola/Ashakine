"use client";
import { Product } from "@/types";
import Image from "next/image";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";

interface ProductOfferingProps {
  products: Product[];
  isLoading: boolean;
  error: string | null;
}

const ProductOffering: React.FC<ProductOfferingProps> = ({
  products,
  isLoading,
  error,
}) => {
  if (products.length === 0 && !isLoading && !error) {
    return null;
  }

  return (
    <section className="w-full max-w-6xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto text-center mb-16">
        <h2 className="md:text-2xl text-xl font-bold text-center mb-6">
          Product Offerings
        </h2>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-xl overflow-hidden shadow-sm animate-pulse">
              <div className="bg-gray-200 h-60 w-full"></div>
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                <div className="h-3 bg-gray-200 rounded w-full"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded mt-4"></div>
              </div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center bg-red-50 rounded-xl py-12 px-6 max-w-2xl mx-auto">
          <h3 className="text-xl font-medium text-red-600 mb-2">
            Could not load product
          </h3>
          <p className="text-red-500">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="mt-4 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <div
              key={product._id}
              className="bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300 group flex flex-col"
            >
              <div className="relative aspect-[4/3] w-full">
                {product.image && (
                  <Image
                    src={product.image.url}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    priority={false}
                  />
                )}
                {product.discount > 0 && (
                  <div className="absolute top-4 right-4 bg-red-500 text-white text-sm font-bold px-3 py-1 rounded-full shadow-sm">
                    Save {product.discount}%
                  </div>
                )}
              </div>

              <div className="p-5 flex-grow flex flex-col">
                <div className="mb-4 flex-grow">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-600 text-sm line-clamp-2">
                    {product.description}
                  </p>
                </div>

                <div className="mt-auto">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="text-xl font-bold text-gray-900">
                        ₦{product.price}
                      </span>
                      {product.formerPrice && (
                        <span className="text-sm text-gray-400 line-through ml-2">
                          ₦{product.formerPrice}
                        </span>
                      )}
                    </div>
                  </div>

                  <a
                    href={`https://wa.me/${product.phoneNumber}?text=${encodeURIComponent(
                      `Hello, coming from Spinly I'm interested in this discount deal for ${product.name}, ₦${product.price}. Product image: ${product.image?.url || 'No image available'}`
                    )}`}
                    className="w-full flex items-center justify-center gap-2 bg-gray-900 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors font-medium text-sm uppercase tracking-wider"
                    aria-label={`Contact vendor via WhatsApp for ${product.name}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <FiShoppingCart className="text-lg" />
                    Get Product
                    <FiArrowRight className="text-lg" />
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductOffering;