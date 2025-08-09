"use client";
import React, { useState, useRef, useCallback } from "react";
import Image from "next/image";
import { useForm, Controller } from "react-hook-form";
import { debounce } from "lodash";
import { FiX } from "react-icons/fi";

interface VendorFormData {
  name: string;
  url: string;
  email?: string;
  logo?: FileList;
}

interface VendorFormProps {
  newVendor: { name: string; url: string; email: string };
  setNewVendor: React.Dispatch<
    React.SetStateAction<{ name: string; url: string; email: string }>
  >;
  vendorError: string | null;
  vendorLoading: boolean;
  handleAddVendor: (
    e: React.FormEvent,
    logo: File | null,
    resetLogo: () => void
  ) => void;
  vendorsCount?: number; // Added to track current number of vendors
}

const VendorForm = ({
  newVendor,
  setNewVendor,
  vendorError,
  vendorLoading,
  handleAddVendor,
  vendorsCount = 0,
}: VendorFormProps) => {
  const [newVendorLogo, setNewVendorLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const maxVendors = 3;

  const {
    control,
    handleSubmit,
    formState: { errors, isValid },
    setValue,
    reset,
  } = useForm<VendorFormData>({
    defaultValues: {
      name: newVendor.name,
      url: newVendor.url,
      email: newVendor.email || "",
      logo: undefined,
    },
    mode: "onChange",
  });

  const resetLogo = useCallback(() => {
    setNewVendorLogo(null);
    setLogoPreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
    setValue("logo", undefined as any, { shouldValidate: true });
  }, [setValue]);

  const handleInputChange = useCallback(
    (field: keyof VendorFormData, value: string) => {
      const debounced = debounce(() => {
        setNewVendor((prev) => ({ ...prev, [field]: value }));
        setValue(field, value, { shouldValidate: true });
      }, 50);
      debounced();
    },
    [setNewVendor, setValue]
  );

  const onSubmit = (data: VendorFormData) => {
    if (vendorsCount >= maxVendors) return;
    handleAddVendor(
      { preventDefault: () => {} } as React.FormEvent,
      newVendorLogo,
      resetLogo
    );
    reset();
    resetLogo();
  };

  return (
    <div className="space-y-4 md:px-6 py-6 px-3 bg-white rounded-xl shadow-sm border border-gray-100">
      {vendorsCount >= maxVendors ? (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
          <p className="text-yellow-700">
            Maximum of {maxVendors} partners reached. Contact admin to add more.
          </p>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          aria-labelledby="add-vendor-form-title"
        >
          <h2 id="add-vendor-form-title" className="text-lg font-medium text-gray-800 mb-4">
            Add New Partners
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
                    aria-describedby={errors.name ? "vendorName-err" : undefined}
                  />
                )}
              />
              {errors.name && (
                <p id="vendorName-err" className="mt-1 text-sm text-red-600">
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
                Website/social media url *
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
                    aria-describedby={errors.url ? "vendorUrl-err" : undefined}
                  />
                )}
              />
              {errors.url && (
                <p id="vendorUrl-err" className="mt-1 text-sm text-red-600">
                  {errors.url.message}
                </p>
              )}
            </div>

            {/* Vendor Email */}
            {/* <div>
              <label
                htmlFor="vendorEmail"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Email
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
                    aria-describedby={errors.email ? "vendorEmail-err" : undefined}
                  />
                )}
              />
              {errors.email && (
                <p id="vendorEmail-err" className="mt-1 text-sm text-red-600">
                  {errors.email.message}
                </p>
              )}
            </div> */}

            {/* Logo Upload */}
            <div>
              <label
                htmlFor="vendorLogo"
                className="block text-sm font-medium text-gray-700 mb-1"
              >
                Logo *
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
                      required: "Vendor logo is required",
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
                            setLogoPreview(null);
                          }
                        }}
                        className="sr-only"
                        aria-describedby={errors.logo ? "vendorLogo-err" : undefined}
                      />
                    )}
                  />
                </label>
                {errors.logo && (
                  <p id="vendorLogo-err" className="mt-1 text-sm text-red-600">
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

            {/* Submit Button */}
            <div className="pt-2">
              <button
                type="submit"
                disabled={vendorLoading || !isValid || vendorsCount >= maxVendors}
                className={`w-full flex justify-center items-center py-2.5 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white transition-colors duration-200 ${
                  vendorLoading || !isValid || vendorsCount >= maxVendors
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
                    Adding Vendor...
                  </>
                ) : (
                  "Add"
                )}
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
      )}
    </div>
  );
};

export default VendorForm;