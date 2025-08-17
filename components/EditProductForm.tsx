"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useForm, Controller, Control } from "react-hook-form";
import { debounce } from "lodash";
import { Product, ProductFormData } from "@/types";
import { FiImage, FiUpload, FiX } from "react-icons/fi";

interface EditProductFormProps {
  product: Product;
  productError: string | null;
  productLoading: boolean;
  handleUpdateProduct: (
    e: React.FormEvent,
    productId: string,
    data: ProductFormData,
    image: File | null,
    resetImage: () => void
  ) => void;
  setEditingProduct: (product: Product | null) => void;
  control: Control<ProductFormData>; // Add control prop
}

const EditProductForm = ({
  product,
  productError,
  productLoading,
  handleUpdateProduct,
  setEditingProduct,
  control,
}: EditProductFormProps) => {
  const [productImage, setProductImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(
    product.image?.url || null
  );
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    formState: { errors },
    setValue,
    reset,
  } = useForm<ProductFormData>({
    defaultValues: {
      name: product.name,
      // description: product.description,
      price: product.price.toString(),
      formerPrice: product.formerPrice.toString(),
      discount: product.discount?.toString() || "",
      phoneNumber: product.phoneNumber,
      image: undefined,
    },
    mode: "onChange",
  });

  const resetImage = useCallback(() => {
    setProductImage(null);
    setImagePreview(product.image?.url || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("image", undefined as any, { shouldValidate: true });
  }, [setValue, product.image?.url]);

  const handleInputChange = useCallback(
    (field: keyof ProductFormData, value: string) => {
      const debounced = debounce(() => {
        setValue(field, value, { shouldValidate: true });
      }, 50);
      debounced();
    },
    [setValue]
  );

  return (
    <div className="space-y-4" aria-labelledby="edit-product-form-title">
      <h2
        id="edit-product-form-title"
        className="text-lg font-medium text-gray-800 mb-4"
      >
        Edit Product
      </h2>

      {/* Product Name */}
      <div>
        <label
          htmlFor="productName"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Name *
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
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.name ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "productName-error" : undefined}
            />
          )}
        />
        {errors.name && (
          <p id="productName-error" className="mt-1 text-sm text-red-600">
            {errors.name.message}
          </p>
        )}
      </div>

      {/* WhatsApp Phone Number */}
      <div>
        <label
          htmlFor="phoneNumber"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          WhatsApp Phone Number *
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
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.phoneNumber ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.phoneNumber}
              aria-describedby={
                errors.phoneNumber ? "phoneNumber-error" : undefined
              }
            />
          )}
        />
        <p className="mt-1 text-xs text-gray-500">
          This must be your active WhatsApp number as users who want to get the
          product will be directed to WhatsApp.
        </p>
        {errors.phoneNumber && (
          <p id="phoneNumber-error" className="mt-1 text-sm text-red-600">
            {errors.phoneNumber.message}
          </p>
        )}
      </div>

      {/* Product Description */}
      {/* <div>
        <label
          htmlFor="productDescription"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Description *
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
              className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                errors.description ? "border-red-500" : "border-gray-300"
              }`}
              aria-invalid={!!errors.description}
              aria-describedby={
                errors.description ? "productDescription-error" : undefined
              }
            />
          )}
        />
        {errors.description && (
          <p id="productDescription-error" className="mt-1 text-sm text-red-600">
            {errors.description.message}
          </p>
        )}
      </div> */}

      {/* Price and Former Price and Discount */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Price */}
        <div>
          <label
            htmlFor="productPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Price *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
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
                  className={`w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.price ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.price}
                  aria-describedby={
                    errors.price ? "productPrice-error" : undefined
                  }
                />
              )}
            />
          </div>
          {errors.price && (
            <p id="productPrice-error" className="mt-1 text-sm text-red-600">
              {errors.price.message}
            </p>
          )}
        </div>

        {/* Former Price */}
        <div>
          <label
            htmlFor="productFormerPrice"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Former Price *
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              $
            </span>
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
                  className={`w-full pl-8 pr-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.formerPrice ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.formerPrice}
                  aria-describedby={
                    errors.formerPrice ? "productFormerPrice-error" : undefined
                  }
                />
              )}
            />
          </div>
          {errors.formerPrice && (
            <p id="productFormerPrice-error" className="mt-1 text-sm text-red-600">
              {errors.formerPrice.message}
            </p>
          )}
        </div>

        {/* Discount */}
        <div>
          <label
            htmlFor="productDiscount"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Discount
          </label>
          <div className="relative">
            <span className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500">
              %
            </span>
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
                  className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                    errors.discount ? "border-red-500" : "border-gray-300"
                  }`}
                  aria-invalid={!!errors.discount}
                  aria-describedby={
                    errors.discount ? "productDiscount-error" : undefined
                  }
                />
              )}
            />
          </div>
          {errors.discount && (
            <p id="productDiscount-error" className="mt-1 text-sm text-red-600">
              {errors.discount.message}
            </p>
          )}
        </div>
      </div>

      {/* Image Upload */}
      <div>
        <label
          htmlFor="productImage"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Product Image
        </label>
        <div className="space-y-2">
          <label
            className={`
              flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-md cursor-pointer
              ${
                imagePreview
                  ? "border-green-500 bg-green-50"
                  : "border-gray-300 hover:border-gray-400"
              }
              transition-colors duration-200
            `}
          >
            <div className="flex flex-col items-center text-center">
              {imagePreview ? (
                <>
                  <div className="w-10 h-10 mb-2 rounded-full bg-green-100 flex items-center justify-center">
                    <FiUpload className="h-5 w-5 text-green-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    {productImage ? productImage.name : "Change image"}
                  </p>
                </>
              ) : (
                <>
                  <div className="w-10 h-10 mb-2 rounded-full bg-blue-100 flex items-center justify-center">
                    <FiImage className="h-5 w-5 text-blue-600" />
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    Click to upload product image
                  </p>
                </>
              )}
              <p className="text-xs text-gray-500">
                PNG, JPG, JPEG up to 2MB
              </p>
            </div>
            <Controller
              name="image"
              control={control}
              rules={{
                validate: {
                  fileType: (files: FileList | undefined) =>
                    !files ||
                    !files[0] ||
                    ["image/png", "image/jpeg", "image/jpg"].includes(
                      files[0].type
                    ) ||
                    "Only PNG, JPG, or JPEG files are allowed",
                  fileSize: (files: FileList | undefined) =>
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
                      reader.onload = () =>
                        setImagePreview(reader.result as string);
                      reader.readAsDataURL(file);
                    } else {
                      setImagePreview(product.image?.url || null);
                    }
                  }}
                  className="sr-only"
                  aria-describedby={
                    errors.image ? "productImage-error" : undefined
                  }
                />
              )}
            />
          </label>
          {errors.image && (
            <p id="productImage-error" className="mt-1 text-sm text-red-600">
              {errors.image.message}
            </p>
          )}
          {imagePreview && (
            <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
              <div className="relative w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                <Image
                  src={imagePreview}
                  alt="Product preview"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
              <button
                type="button"
                onClick={resetImage}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Error Message */}
      {productError && (
        <div
          className="p-3 text-sm text-red-700 bg-red-50 rounded-md border border-red-200"
          role="alert"
        >
          {productError}
        </div>
      )}
    </div>
  );
};

export default EditProductForm;