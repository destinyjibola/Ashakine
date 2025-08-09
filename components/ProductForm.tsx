"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import { FiImage, FiUpload, FiX } from "react-icons/fi";

export interface ProductFormData {
  name: string;
  description: string;
  price: string;
  formerPrice: string;
  discount: string;
  phoneNumber: string;
  image?: FileList;
}

interface ProductFormProps {
  eventId: string;
  productError: string | null;
  productLoading: boolean;
  handleAddProduct: (
    e: React.FormEvent,
    data: ProductFormData,
    image: File | null,
    resetImage: () => void
  ) => void;
  productsCount?: number; // Added to track current number of products
}

const ProductForm = ({
  eventId,
  productError,
  productLoading,
  handleAddProduct,
  productsCount = 0,
}: ProductFormProps) => {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxProducts = 3;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: "",
      description: "",
      price: "",
      formerPrice: "",
      discount: "",
      phoneNumber: "",
      image: undefined,
    },
    mode: "onChange",
  });

  const resetImage = useCallback(() => {
    setProductImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("image", undefined as any, { shouldValidate: true });
  }, [setValue]);

  const handleInputChange = useCallback(
    (field: keyof ProductFormData, value: string) => {
      const debounced = debounce(() => {
        setValue(field, value, { shouldValidate: true });
      }, 50);
      debounced();
    },
    [setValue]
  );

  const onSubmit = (data: ProductFormData) => {
    if (productsCount >= maxProducts) return;
    handleAddProduct(
      { preventDefault: () => {} } as React.FormEvent,
      data,
      productImage,
      resetImage
    );
    reset();
    resetImage();
  };

  return (
    <div className="space-y-6 md:px-6 py-6 px-3 bg-white rounded-xl shadow-sm border border-gray-100">
      {productsCount >= maxProducts ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-700">
            Maximum of {maxProducts} products reached. Contact admin to add more.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-6"
          aria-labelledby="add-product-form-title"
        >
          <div className="space-y-1">
            <h2 id="add-product-form-title" className="text-2xl font-semibold text-gray-900">
              Add New Product
            </h2>
            <p className="text-sm text-gray-500">
              Fill in the details below to add a new product to your event
            </p>
          </div>

          <div className="space-y-5">
            {/* Product Name */}
            <div>
              <label
                htmlFor="productName"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Product Name <span className="text-red-500">*</span>
              </label>
              <Controller
                name="name"
                control={control}
                rules={{
                  required: "Product name is required",
                  minLength: {
                    value: 2,
                    message: "Product name must be at least 2 characters",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="text"
                    id="productName"
                    value={field.value}
                    onChange={(e) => {
                      handleInputChange("name", e.target.value);
                      field.onChange(e);
                    }}
                    placeholder="Enter product name"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.name ? "border-red-400" : "border-gray-300 hover:border-gray-400"
                    }`}
                    aria-invalid={!!errors.name}
                    aria-describedby={errors.name ? "productName-err" : undefined}
                  />
                )}
              />
              {errors.name && (
                <p id="productName-err" className="mt-1.5 text-sm text-red-600">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* WhatsApp Phone Number */}
            <div>
              <label
                htmlFor="phoneNumber"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                WhatsApp Phone Number <span className="text-red-500">*</span>
              </label>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{
                  required: "WhatsApp phone number is required",
                  pattern: {
                    value: /^\+?[1-9]\d{1,14}$/,
                    message: "Enter a valid phone number (e.g., +1234567890)",
                  },
                }}
                render={({ field }) => (
                  <input
                    type="tel"
                    id="phoneNumber"
                    value={field.value}
                    onChange={(e) => {
                      handleInputChange("phoneNumber", e.target.value);
                      field.onChange(e);
                    }}
                    placeholder="+1234567890"
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.phoneNumber ? "border-red-400" : "border-gray-300 hover:border-gray-400"
                    }`}
                    aria-invalid={!!errors.phoneNumber}
                    aria-describedby={errors.phoneNumber ? "phoneNumber-err" : undefined}
                  />
                )}
              />
              <p className="mt-1.5 text-xs text-gray-500">
                This must be your active WhatsApp number as users who want to get the product will be directed to WhatsApp.
              </p>
              {errors.phoneNumber && (
                <p id="phoneNumber-err" className="mt-1.5 text-sm text-red-600">
                  {errors.phoneNumber.message}
                </p>
              )}
            </div>

            {/* Product Description */}
            <div>
              <label
                htmlFor="productDescription"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Description <span className="text-red-500">*</span>
              </label>
              <Controller
                name="description"
                control={control}
                rules={{
                  required: "Description is required",
                  minLength: {
                    value: 10,
                    message: "Description must be at least 10 characters",
                  },
                }}
                render={({ field }) => (
                  <textarea
                    id="productDescription"
                    value={field.value}
                    onChange={(e) => {
                      handleInputChange("description", e.target.value);
                      field.onChange(e);
                    }}
                    placeholder="Enter product description"
                    rows={4}
                    className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                      errors.description ? "border-red-400" : "border-gray-300 hover:border-gray-400"
                    }`}
                    aria-invalid={!!errors.description}
                    aria-describedby={errors.description ? "productDescription-err" : undefined}
                  />
                )}
              />
              {errors.description && (
                <p id="productDescription-err" className="mt-1.5 text-sm text-red-600">
                  {errors.description.message}
                </p>
              )}
            </div>

            {/* Price and Former Price and Discount */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Price */}
              <div>
                <label
                  htmlFor="productPrice"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Controller
                    name="price"
                    control={control}
                    rules={{
                      required: "Price is required",
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Enter a valid price (e.g., 10.99)",
                      },
                      min: {
                        value: 0.01,
                        message: "Price must be greater than 0",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        type="number"
                        id="productPrice"
                        min="0"
                        step="0.01"
                        value={field.value}
                        onChange={(e) => {
                          handleInputChange("price", e.target.value);
                          field.onChange(e);
                        }}
                        placeholder="0.00"
                        className={`w-full pl-8 pr-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                          errors.price ? "border-red-400" : "border-gray-300 hover:border-gray-400"
                        }`}
                        aria-invalid={!!errors.price}
                        aria-describedby={errors.price ? "productPrice-err" : undefined}
                      />
                    )}
                  />
                </div>
                {errors.price && (
                  <p id="productPrice-err" className="mt-1.5 text-sm text-red-600">
                    {errors.price.message}
                  </p>
                )}
              </div>

              {/* Former Price */}
              <div>
                <label
                  htmlFor="productFormerPrice"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Former Price <span className="text-red-500">*</span>
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">$</span>
                  <Controller
                    name="formerPrice"
                    control={control}
                    rules={{
                      required: "Former price is required",
                      pattern: {
                        value: /^\d+(\.\d{1,2})?$/,
                        message: "Enter a valid price (e.g., 10.99)",
                      },
                      min: {
                        value: 0.01,
                        message: "Former price must be greater than 0",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        type="number"
                        id="productFormerPrice"
                        min="0"
                        step="0.01"
                        value={field.value}
                        onChange={(e) => {
                          handleInputChange("formerPrice", e.target.value);
                          field.onChange(e);
                        }}
                        placeholder="0.00"
                        className={`w-full pl-8 pr-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                          errors.formerPrice ? "border-red-400" : "border-gray-300 hover:border-gray-400"
                        }`}
                        aria-invalid={!!errors.formerPrice}
                        aria-describedby={errors.formerPrice ? "productFormerPrice-err" : undefined}
                      />
                    )}
                  />
                </div>
                {errors.formerPrice && (
                  <p id="productFormerPrice-err" className="mt-1.5 text-sm text-red-600">
                    {errors.formerPrice.message}
                  </p>
                )}
              </div>

              {/* Discount */}
              <div>
                <label
                  htmlFor="productDiscount"
                  className="block text-sm font-medium text-gray-700 mb-1.5"
                >
                  Discount
                </label>
                <div className="relative">
                  <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">%</span>
                  <Controller
                    name="discount"
                    control={control}
                    rules={{
                      pattern: {
                        value: /^[0-9]*$/,
                        message: "Enter a valid percentage",
                      },
                      max: {
                        value: 100,
                        message: "Discount cannot exceed 100%",
                      },
                      min: {
                        value: 0,
                        message: "Discount cannot be negative",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        type="number"
                        id="productDiscount"
                        min="0"
                        max="100"
                        value={field.value}
                        onChange={(e) => {
                          handleInputChange("discount", e.target.value);
                          field.onChange(e);
                        }}
                        placeholder="0"
                        className={`w-full px-4 py-2.5 text-sm border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all ${
                          errors.discount ? "border-red-400" : "border-gray-300 hover:border-gray-400"
                        }`}
                        aria-invalid={!!errors.discount}
                        aria-describedby={errors.discount ? "productDiscount-err" : undefined}
                      />
                    )}
                  />
                </div>
                {errors.discount && (
                  <p id="productDiscount-err" className="mt-1.5 text-sm text-red-600">
                    {errors.discount.message}
                  </p>
                )}
              </div>
            </div>

            {/* Image Upload */}
            <div>
              <label
                htmlFor="productImage"
                className="block text-sm font-medium text-gray-700 mb-1.5"
              >
                Product Image <span className="text-red-500">*</span>
              </label>
              <div className="space-y-2">
                <label
                  className={`
                    flex flex-col items-center justify-center px-6 py-10 border-2 border-dashed rounded-xl cursor-pointer
                    ${
                      imagePreview 
                        ? "border-green-400 bg-green-50" 
                        : "border-gray-300 hover:border-gray-400 bg-gray-50"
                    }
                    transition-colors duration-200 relative overflow-hidden
                  `}
                >
                  <div className="flex flex-col items-center text-center z-10">
                    {imagePreview ? (
                      <>
                        <div className="w-12 h-12 mb-3 rounded-full bg-green-100 flex items-center justify-center">
                          <FiUpload className="h-5 w-5 text-green-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          {productImage?.name || "Change image"}
                        </p>
                      </>
                    ) : (
                      <>
                        <div className="w-12 h-12 mb-3 rounded-full bg-blue-100 flex items-center justify-center">
                          <FiImage className="h-5 w-5 text-blue-600" />
                        </div>
                        <p className="text-sm font-medium text-gray-700 mb-1">
                          Click to upload product image
                        </p>
                      </>
                    )}
                    <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 2MB</p>
                  </div>
                  <Controller
                    name="image"
                    control={control}
                    rules={{
                      required: "Product image is required",
                      validate: {
                        fileType: (files) =>
                          !files ||
                          !files[0] ||
                          ["image/png", "image/jpeg", "image/jpg"].includes(files[0].type) ||
                          "Only PNG, JPG, or JPEG files are allowed",
                        fileSize: (files) =>
                          !files ||
                          !files[0] ||
                          files[0].size <= 2 * 1024 * 1024 ||
                          "File size must not exceed 2MB",
                      },
                    }}
                    render={({ field }) => (
                      <input
                        type="file"
                        id="productImage"
                        accept="image/png,image/jpeg,image/jpg"
                        ref={fileInputRef}
                        onChange={(e) => {
                          const file = e.target.files?.[0] || null;
                          setProductImage(file);
                          field.onChange(e.target.files);
                          if (file) {
                            const reader = new FileReader();
                            reader.onload = () => setImagePreview(reader.result as string);
                            reader.readAsDataURL(file);
                          } else {
                            setImagePreview(null);
                          }
                        }}
                        className="sr-only"
                        aria-describedby={errors.image ? "productImage-err" : undefined}
                      />
                    )}
                  />
                </label>
                {errors.image && (
                  <p id="productImage-err" className="mt-1.5 text-sm text-red-600">
                    {errors.image.message}
                  </p>
                )}
                {imagePreview && (
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center space-x-3">
                      <div className="relative w-16 h-16 overflow-hidden rounded-lg border border-gray-200">
                        <Image
                          src={imagePreview}
                          alt="Product preview"
                          layout="fill"
                          objectFit="cover"
                          className="bg-white"
                        />
                      </div>
                      <div>
                        <p className="text-sm font-medium text-gray-900 line-clamp-1">
                          {productImage?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {(productImage?.size || 0) / 1000} KB
                        </p>
                      </div>
                    </div>
                    <button
                      type="button"
                      onClick={resetImage}
                      className="p-1.5 rounded-full hover:bg-gray-100 text-gray-500 hover:text-red-500 transition-colors"
                      aria-label="Remove image"
                    >
                      <FiX className="h-4 w-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={productLoading || !isValid || productsCount >= maxProducts}
                className={`w-full flex justify-center items-center py-3 px-4 rounded-lg text-sm font-medium text-white transition-all duration-200 ${
                  productLoading || !isValid || productsCount >= maxProducts
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 shadow-sm"
                }`}
              >
                {productLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Adding Product...
                  </>
                ) : (
                  "Add Product"
                )}
              </button>
            </div>

            {/* Error Message */}
            {productError && (
              <div
                className="p-3 text-sm text-red-700 bg-red-50 rounded-lg border border-red-200 flex items-start"
                role="alert"
              >
                <svg className="h-5 w-5 text-red-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                    clipRule="evenodd"
                  />
                </svg>
                <span>{productError}</span>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default ProductForm;