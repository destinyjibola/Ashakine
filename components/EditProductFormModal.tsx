"use client";
import { useForm } from "react-hook-form";
import ProductModal from "./ProductModal";
import EditProductForm from "@/components/EditProductForm";
import { Product, ProductFormData } from "@/types";

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product;
  productError: string | null;
  productLoading: boolean;
  handleUpdateProduct: (
    e: React.FormEvent,
    productId: string,
    data: ProductFormData,
    image: File | null,
    resetImage: () => void
  ) => Promise<void>;
  setEditingProduct: (product: Product | null) => void;
}

export default function EditProductModal({
  isOpen,
  onClose,
  product,
  productError,
  productLoading,
  handleUpdateProduct,
  setEditingProduct,
}: EditProductModalProps) {
  const {
    handleSubmit,
    control,
    formState: { isValid },
  } = useForm<ProductFormData>({
    defaultValues: {
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      formerPrice: product.formerPrice.toString(),
      discount: product.discount?.toString() || "",
      phoneNumber: product.phoneNumber,
      image: undefined,
    },
    mode: "onChange",
  });

  const onSubmit = async (data: ProductFormData) => {
    await handleUpdateProduct(
      { preventDefault: () => {} } as React.FormEvent,
      product._id,
      data,
      data.image ? data.image[0] : null,
      () => {
        // Reset image logic will be handled in EditProductForm
      }
    );
    onClose();
  };

  return (
    <ProductModal
      isOpen={isOpen}
      onClose={onClose}
      onSubmit={handleSubmit(onSubmit)}
      productLoading={productLoading}
      isFormValid={isValid}
    >
      <EditProductForm
        product={product}
        productError={productError}
        productLoading={productLoading}
        handleUpdateProduct={handleUpdateProduct}
        setEditingProduct={setEditingProduct}
        control={control} // Pass control to EditProductForm
      />
    </ProductModal>
  );
}