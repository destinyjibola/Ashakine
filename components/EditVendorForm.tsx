"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import { Vendor } from "@/types";

interface VendorFormData {
  name: string;
  url: string;
  email?: string;
  logo?: FileList;
}

interface EditVendorFormProps {
  vendor: Vendor;
  vendorError: string | null;
  vendorLoading: boolean;
  handleUpdateVendor: (
    e: React.FormEvent,
    vendorId: string,
    data: VendorFormData,
    logo: File | null,
    resetLogo: () => void
  ) => void;
  setEditingVendor: (vendor: Vendor | null) => void;
}

const EditVendorForm = ({
  vendor,
  vendorError,
  vendorLoading,
  handleUpdateVendor,
  setEditingVendor,
}: EditVendorFormProps) => {
  const [newVendorLogo, setNewVendorLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(vendor.logo?.url || null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<VendorFormData>({
    defaultValues: {
      name: vendor.name,
      url: vendor.url,
      email: vendor.email || "",
      logo: undefined,
    },
    mode: "onChange",
  });

  const resetLogo = useCallback(() => {
    setNewVendorLogo(null);
    setLogoPreview(vendor.logo?.url || null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("logo", undefined as any, { shouldValidate: true });
  }, [setValue, vendor.logo?.url]);

  const handleInputChange = useCallback(
    (field: keyof VendorFormData, value: string) => {
      const debounced = debounce(() => {
        setValue(field, value, { shouldValidate: true });
      }, 50);
      debounced();
    },
    [setValue]
  );

  const onSubmit = (data: VendorFormData) => {
    handleUpdateVendor(
      { preventDefault: () => {} } as React.FormEvent,
      vendor._id,
      data,
      newVendorLogo,
      resetLogo
    );
    reset();
    resetLogo();
    // Removed setEditingVendor(null) to close modal only after success
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className=""
      aria-labelledby="edit-vendor-form-title"
    >
      <h2 id="edit-vendor-form-title" className="text-lg font-medium text-gray-800 mb-4">
        Edit Vendor
      </h2>

      <div className="space-y-2">
        {/* Vendor Name */}
        <div>
          <label
            htmlFor="vendorName"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Vendor Name *
          </label>
          <Controller
            name="name"
            control={control}
            rules={{
              required: "Vendor name is required",
              minLength: {
                value: 2,
                message: "Vendor name must be at least 2 characters",
              },
            }}
            render={({ field }) => (
              <input
                type="text"
                id="vendorName"
                value={field.value}
                onChange={(e) => {
                  handleInputChange("name", e.target.value);
                  field.onChange(e);
                }}
                placeholder="Enter company name"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.name ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors.name}
                aria-describedby={errors.name ? "vendorName-error" : undefined}
              />
            )}
          />
          {errors.name && (
            <p id="vendorName-error" className="mt-1 text-sm text-red-600">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Vendor URL */}
        <div>
          <label
            htmlFor="vendorUrl"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Website URL *
          </label>
          <Controller
            name="url"
            control={control}
            rules={{
              required: "Website URL is required",
              pattern: {
                value: /^(https?:\/\/)([\w-]+\.)+[\w-]+(\/[\w-./?%&=]*)?$/i,
                message: "Enter a valid URL (e.g., https://example.com)",
              },
            }}
            render={({ field }) => (
              <input
                type="url"
                id="vendorUrl"
                value={field.value}
                onChange={(e) => {
                  handleInputChange("url", e.target.value);
                  field.onChange(e);
                }}
                placeholder="https://example.com"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.url ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors.url}
                aria-describedby={errors.url ? "vendorUrl-error" : undefined}
              />
            )}
          />
          {errors.url && (
            <p id="vendorUrl-error" className="mt-1 text-sm text-red-600">
              {errors.url.message}
            </p>
          )}
        </div>

        {/* Vendor Email */}
        <div>
          <label
            htmlFor="vendorEmail"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Contact Email
          </label>
          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                message: "Enter a valid email address",
              },
            }}
            render={({ field }) => (
              <input
                type="email"
                id="vendorEmail"
                value={field.value || ""}
                onChange={(e) => {
                  handleInputChange("email", e.target.value);
                  field.onChange(e);
                }}
                placeholder="contact@example.com"
                className={`w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
                  errors.email ? "border-red-500" : "border-gray-300"
                }`}
                aria-invalid={!!errors.email}
                aria-describedby={errors.email ? "vendorEmail-error" : undefined}
              />
            )}
          />
          {errors.email && (
            <p id="vendorEmail-error" className="mt-1 text-sm text-red-600">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Logo Upload */}
        <div>
          <label
            htmlFor="vendorLogo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Logo
          </label>
          <div className="space-y-2">
            <label
              className={`
                flex flex-col items-center justify-center px-6 py-8 border-2 border-dashed rounded-md cursor-pointer
                ${logoPreview ? "border-green-500 bg-green-50" : "border-gray-300 hover:border-gray-400"}
                transition-colors duration-200
              `}
            >
              <div className="flex flex-col items-center text-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-10 w-10 text-gray-400 mb-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <p className="text-sm text-gray-600 mb-1">
                  {newVendorLogo ? newVendorLogo.name : "Click to upload logo"}
                </p>
                <p className="text-xs text-gray-500">PNG, JPG, JPEG up to 2MB</p>
              </div>
              <Controller
                name="logo"
                control={control}
                rules={{
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
                    id="vendorLogo"
                    accept="image/png,image/jpeg,image/jpg"
                    ref={fileInputRef}
                    onChange={(e) => {
                      const file = e.target.files?.[0] || null;
                      setNewVendorLogo(file);
                      field.onChange(e.target.files);
                      if (file) {
                        const reader = new FileReader();
                        reader.onload = () => setLogoPreview(reader.result as string);
                        reader.readAsDataURL(file);
                      } else {
                        setLogoPreview(vendor.logo?.url || null);
                      }
                    }}
                    className="sr-only"
                    aria-describedby={errors.logo ? "vendorLogo-error" : undefined}
                  />
                )}
              />
            </label>
            {errors.logo && (
              <p id="vendorLogo-error" className="mt-1 text-sm text-red-600">
                {errors.logo.message}
              </p>
            )}
            {logoPreview && (
              <div className="flex items-center space-x-4 p-3 bg-gray-50 rounded-md">
                <div className="relative w-16 h-16 overflow-hidden rounded-md border border-gray-200">
                  <Image
                    src={logoPreview}
                    alt="Logo preview"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <button
                  type="button"
                  onClick={resetLogo}
                  className="text-sm text-red-600 hover:text-red-800"
                >
                  Remove
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Submit and Cancel Buttons */}
        <div className="pt-2 flex space-x-4">
          <button
            type="submit"
            disabled={vendorLoading || !isValid}
            className={`flex-1 flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
              vendorLoading || !isValid
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            }`}
          >
            {vendorLoading ? (
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
                Updating Vendor...
              </>
            ) : (
              "Update Vendor"
            )}
          </button>
          <button
            type="button"
            onClick={() => {
              setEditingVendor(null);
              resetLogo();
            }}
            className="flex-1 py-2.5 px-4 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Cancel
          </button>
        </div>

        {/* Error Message */}
        {vendorError && (
          <div
            className="p-3 text-sm text-red-700 bg-red-50 rounded-md border border-red-200"
            role="alert"
          >
            {vendorError}
          </div>
        )}
      </div>
    </form>
  );
};

export default EditVendorForm;