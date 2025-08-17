"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Event, NewPrizeData, Winner, Vendor, Product } from "@/types";
import { useAuth } from "@/hooks/AuthContext";
import { FiCopy, FiShare2 } from "react-icons/fi";
import EventHeader from "@/components/EventHeader";
import EventDetails from "@/components/EventDetails";
import VendorForm from "@/components/VendorForm";
import EditVendorModal from "@/components/EditVendorModal";
import VendorsList from "@/components/VendorsList";
import PrizeForm from "@/components/PrizeForm";
import PrizesList from "@/components/PrizesList";
import ProductForm, { ProductFormData } from "@/components/ProductForm";
import ProductsList from "@/components/ProductsList";

import QRCodePreviewModal from "@/components/QRCodePreviewModal";
import EventStatus from "@/components/EventStatus";
import QRCode from "qrcode";
import jsPDF from "jspdf";
import EditProductModal from "@/components/EditProductFormModal";

export default function EventDetailsPage({
  params,
}: {
  params: { eventId: string };
}) {
  const { token, loading: authLoading, logout } = useAuth();
  const [event, setEvent] = useState<Event | null>(null);
  const [vendors, setVendors] = useState<Vendor[] | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [winners, setWinners] = useState<Winner[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [newPrize, setNewPrize] = useState<string>("");
  const [newMaxWins, setNewMaxWins] = useState<number>(1);
  const [newRedeemInfo, setNewRedeemInfo] = useState<string>("");
  const [selectedVendor, setSelectedVendor] = useState<string | null>(null);
  const [newVendor, setNewVendor] = useState<{
    name: string;
    url: string;
    email: string;
  }>({
    name: "",
    url: "",
    email: "",
  });
  const [editingVendor, setEditingVendor] = useState<Vendor | null>(null);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [editingPrizeId, setEditingPrizeId] = useState<string | null>(null);
  const [editPrizeName, setEditPrizeName] = useState<string>("");
  const [editMaxWins, setEditMaxWins] = useState<number>(1);
  const [editRedeemInfo, setEditRedeemInfo] = useState<string>("");
  const [prizeLoading, setPrizeLoading] = useState<boolean>(false);
  const [prizeError, setPrizeError] = useState<string | null>(null);
  const [addVendorLoading, setAddVendorLoading] = useState<boolean>(false);
  const [addVendorError, setAddVendorError] = useState<string | null>(null);
  const [editVendorLoading, setEditVendorLoading] = useState<boolean>(false);
  const [editVendorError, setEditVendorError] = useState<string | null>(null);
  const [addProductLoading, setAddProductLoading] = useState<boolean>(false);
  const [addProductError, setAddProductError] = useState<string | null>(null);
  const [editProductLoading, setEditProductLoading] = useState<boolean>(false);
  const [editProductError, setEditProductError] = useState<string | null>(null);
  const [copied, setCopied] = useState<boolean>(false);
  const [qrLoading, setQrLoading] = useState<boolean>(false);
  const [qrError, setQrError] = useState<string | null>(null);
  const [isQRModalOpen, setIsQRModalOpen] = useState<boolean>(false);
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string | null>(null);
  const [eventStatusLoading, setEventStatusLoading] = useState<boolean>(false);
  const [eventStatusError, setEventStatusError] = useState<string | null>(null);
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<string>("prizes");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const prizesPerPage = 5;
  const currentPrizes =
    event?.prizes?.slice(
      (currentPage - 1) * prizesPerPage,
      currentPage * prizesPerPage
    ) || [];
  const totalPages = event?.prizes
    ? Math.ceil(event.prizes.length / prizesPerPage)
    : 0;

  const copySpinWheelLink = () => {
    const spinWheelUrl = `${window.location.origin}/${event?.slug}`;
    navigator.clipboard.writeText(spinWheelUrl);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateQRCodePDF = async () => {
    setQrLoading(true);
    setQrError(null);
    try {
      const spinWheelUrl = `${window.location.origin}/${params.eventId}`;
      const qrDataUrl = await QRCode.toDataURL(spinWheelUrl, {
        width: 150,
        margin: 1,
      });
      setQrCodeDataUrl(qrDataUrl);
      setIsQRModalOpen(true);
    } catch (err) {
      setQrError("Failed to generate QR code");
    } finally {
      setQrLoading(false);
    }
  };

  const downloadPDF = () => {
    if (qrCodeDataUrl && event) {
      const pdf = new jsPDF();
      pdf.setFont("Arial", "bold");
      pdf.setFontSize(20);
      pdf.text(event.name, 105, 20, { align: "center" });
      pdf.addImage(qrCodeDataUrl, "PNG", 80, 50, 50, 50);
      pdf.setFont("Arial", "normal");
      pdf.setFontSize(14);
      pdf.text("Scan and Spin to Win Prizes", 105, 110, { align: "center" });
      pdf.save(`${event.name}-spin-wheel-qr.pdf`);
      setIsQRModalOpen(false);
    }
  };

  const handleToggleActive = async (isActive: boolean) => {
    setEventStatusLoading(true);
    setEventStatusError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ isActive }),
        }
      );

      if (response.status === 401) {
        logout();
        setEventStatusError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update event status");
      }

      const updatedEvent: Event = await response.json();
      setEvent(updatedEvent);
    } catch (err) {
      setEventStatusError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setEventStatusLoading(false);
    }
  };

  const handleSetTimer = async (startTime: string, endTime: string) => {
    setEventStatusLoading(true);
    setEventStatusError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ startTime, endTime, isActive: false }),
        }
      );

      if (response.status === 401) {
        logout();
        setEventStatusError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to set event timer");
      }

      const updatedEvent: Event = await response.json();
      setEvent(updatedEvent);
    } catch (err) {
      setEventStatusError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setEventStatusLoading(false);
    }
  };

  const handleClearTimer = async () => {
    setEventStatusLoading(true);
    setEventStatusError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ startTime: null, endTime: null }),
        }
      );

      if (response.status === 401) {
        logout();
        setEventStatusError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to clear event timer");
      }

      const updatedEvent: Event = await response.json();
      setEvent(updatedEvent);
    } catch (err) {
      setEventStatusError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setEventStatusLoading(false);
    }
  };

  const handleAddVendor = async (
    e: React.FormEvent,
    logo: File | null,
    resetLogo: () => void
  ) => {
    e.preventDefault();
    if (vendors && vendors.length >= 3) return;
    setAddVendorLoading(true);
    setAddVendorError(null);

    try {
      if (!logo) {
        throw new Error("Vendor logo is required");
      }

      const reader = new FileReader();
      const logoBase64 = await new Promise<string>((resolve) => {
        reader.onload = () => resolve(reader.result as string);
        reader.readAsDataURL(logo);
      });

      const vendorData = {
        name: newVendor.name,
        url: newVendor.url,
        email: newVendor.email,
        logo: logoBase64,
        eventId: params.eventId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vendors`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vendorData),
        }
      );

      if (response.status === 401) {
        logout();
        setAddVendorError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add vendor");
      }

      const newVendorData: Vendor = await response.json();
      setVendors(vendors ? [...vendors, newVendorData] : [newVendorData]);
      setNewVendor({ name: "", url: "", email: "" });
      resetLogo();
    } catch (err) {
      setAddVendorError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setAddVendorLoading(false);
    }
  };

  const handleUpdateVendor = async (
    e: React.FormEvent,
    vendorId: string,
    data: { name: string; url: string; email?: string },
    logo: File | null,
    resetLogo: () => void
  ) => {
    e.preventDefault();
    setEditVendorLoading(true);
    setEditVendorError(null);

    try {
      let logoBase64: string | null = null;
      if (logo) {
        const reader = new FileReader();
        logoBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(logo);
        });
      }

      const vendorData = {
        name: data.name,
        url: data.url,
        email: data.email || undefined,
        image: logoBase64,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vendors/${vendorId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(vendorData),
        }
      );

      if (response.status === 401) {
        logout();
        setEditVendorError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update vendor");
      }

      const updatedVendor: Vendor = await response.json();
      setVendors(
        vendors
          ? vendors.map((v) => (v._id === vendorId ? updatedVendor : v))
          : [updatedVendor]
      );
      resetLogo();
      setEditingVendor(null);
    } catch (err) {
      setEditVendorError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setEditVendorLoading(false);
    }
  };

  const handleDeleteVendor = async (vendorId: string) => {
    if (!window.confirm("Are you sure you want to delete this vendor?")) return;
    // setAddVendorLoading(true);
    setAddVendorError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/vendors/${vendorId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        logout();
        setAddVendorError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete vendor");
      }

      setVendors(
        vendors ? vendors.filter((vendor) => vendor._id !== vendorId) : null
      );
      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedResponse.status === 401) {
        logout();
        setAddVendorError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!updatedResponse.ok) {
        const errorData = await updatedResponse.json();
        throw new Error(errorData.message || "Failed to fetch updated event");
      }

      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
    } catch (err) {
      setAddVendorError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      // setAddVendorLoading(false);
    }
  };

  const handleAddPrize = async (e: React.FormEvent) => {
    e.preventDefault();
    setPrizeLoading(true);
    setPrizeError(null);

    try {
      const prizeData: NewPrizeData = {
        prize: newPrize,
        maxWins: newMaxWins,
        winCount: 0,
        redeemInfo: newRedeemInfo,
        eventId: params.eventId,
        vendorId: selectedVendor || undefined,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prizes`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(prizeData),
        }
      );

      if (response.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add prize");
      }

      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedResponse.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!updatedResponse.ok) {
        const errorData = await updatedResponse.json();
        throw new Error(errorData.message || "Failed to fetch updated event");
      }

      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
      setNewPrize("");
      setNewMaxWins(1);
      setNewRedeemInfo("");
      setSelectedVendor(null);
    } catch (err) {
      setPrizeError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setPrizeLoading(false);
    }
  };

  const handleEditPrize = async (e: React.FormEvent, prizeId: string) => {
    e.preventDefault();
    setPrizeLoading(true);
    setPrizeError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prizes/${prizeId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            prize: editPrizeName,
            maxWins: editMaxWins,
            redeemInfo: editRedeemInfo,
          }),
        }
      );

      if (response.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update prize");
      }

      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedResponse.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!updatedResponse.ok) {
        const errorData = await updatedResponse.json();
        throw new Error(errorData.message || "Failed to fetch updated event");
      }

      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
      setEditingPrizeId(null);
      setEditPrizeName("");
      setEditMaxWins(1);
      setEditRedeemInfo("");
    } catch (err) {
      setPrizeError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setPrizeLoading(false);
    }
  };

  const handleDeletePrize = async (prizeId: string) => {
    if (!window.confirm("Are you sure you want to delete this prize?")) return;
    // setPrizeLoading(true);
    setPrizeError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/prizes/${prizeId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete prize");
      }

      const updatedResponse = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (updatedResponse.status === 401) {
        logout();
        setPrizeError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!updatedResponse.ok) {
        const errorData = await updatedResponse.json();
        throw new Error(errorData.message || "Failed to fetch updated event");
      }

      const updatedData: Event = await updatedResponse.json();
      setEvent(updatedData);
    } catch (err) {
      setPrizeError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      // setPrizeLoading(false);
    }
  };

  const handleAddProduct = async (
    e: React.FormEvent,
    data: ProductFormData,
    image: File | null,
    resetImage: () => void
  ) => {
    e.preventDefault();
    if (products.length >= 3) {
      setAddProductError("Maximum of 3 products reached for this event");
      return;
    }
    setAddProductLoading(true);
    setAddProductError(null);

    try {
      let imageBase64: string | null = null;
      if (image) {
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(image);
        });
      }

      const productData = {
        name: data.name,
        // description: data.description,
        price: parseFloat(data.price),
        formerPrice: parseFloat(data.formerPrice),
        discount: data.discount ? parseInt(data.discount) : 0,
        phoneNumber: data.phoneNumber,
        image: imageBase64,
        eventId: params.eventId,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.status === 401) {
        logout();
        setAddProductError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to add product");
      }

      const createdProduct: Product = await response.json();
      setProducts([...products, createdProduct]);
      resetImage();
    } catch (err) {
      setAddProductError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setAddProductLoading(false);
    }
  };


  const handleUpdateProduct = async (
    e: React.FormEvent,
    productId: string,
    data: ProductFormData,
    image: File | null,
    resetImage: () => void
  ) => {
    e.preventDefault();
    setEditProductLoading(true);
    setEditProductError(null);

    try {
      let imageBase64: string | null = null;
      if (image) {
        const reader = new FileReader();
        imageBase64 = await new Promise<string>((resolve) => {
          reader.onload = () => resolve(reader.result as string);
          reader.readAsDataURL(image);
        });
      }

      const productData = {
        name: data.name,
        // description: data.description,
        price: data.price, // Keep as string to match ProductFormData and Product interface
        formerPrice: data.formerPrice, // Keep as string
        discount: data.discount ? parseInt(data.discount) : 0,
        phoneNumber: data.phoneNumber,
        image: imageBase64,
      };

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(productData),
        }
      );

      if (response.status === 401) {
        logout();
        setEditProductError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update product");
      }

      const updatedProduct: Product = await response.json();

      // Validate the updated product
      if (!updatedProduct._id || !updatedProduct.name) {
        throw new Error("Invalid product data received from server");
      }

      // Ensure price and formerPrice are strings to match Product interface
      const normalizedProduct: Product = {
        ...updatedProduct,
        price: String(updatedProduct.price),
        formerPrice: String(updatedProduct.formerPrice),
        image: updatedProduct.image || undefined,
        vendor:
          typeof updatedProduct.vendor === "string"
            ? updatedProduct.vendor
            : updatedProduct.vendor || "",
        event:
          typeof updatedProduct.event === "string"
            ? updatedProduct.event
            : updatedProduct.event || params.eventId,
      };

      // Update the products state
      setProducts((prevProducts) =>
        prevProducts.map((p) =>
          p._id === productId
            ? {
                ...p,
                ...normalizedProduct,
                image: normalizedProduct.image || p.image, // Preserve existing image if not updated
                vendor: normalizedProduct.vendor || p.vendor, // Preserve existing vendor
                event: normalizedProduct.event || p.event, // Preserve existing event
              }
            : p
        )
      );

      // Optional: Refetch products to ensure consistency
      try {
        const productsResponse = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}/products`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );

        if (productsResponse.status === 401) {
          logout();
          setEditProductError("Session expired. Please log in again.");
          router.push("/auth/login");
          return;
        }

        if (!productsResponse.ok) {
          console.warn("Failed to refetch products, using local state");
        } else {
          const productsData: Product[] = await productsResponse.json();
          setProducts(
            productsData.map((p) => ({
              ...p,
              price: String(p.price),
              formerPrice: String(p.formerPrice),
            }))
          );
        }
      } catch (refetchErr) {
        console.warn("Refetch error:", refetchErr);
      }

      resetImage();
      setEditingProduct(null);
    } catch (err) {
      setEditProductError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      setEditProductLoading(false);
    }
  };

  // const handleUpdateProduct = async (
  //   e: React.FormEvent,
  //   productId: string,
  //   data: ProductFormData,
  //   image: File | null,
  //   resetImage: () => void
  // ) => {
  //   e.preventDefault();
  //   setEditProductLoading(true);
  //   setEditProductError(null);

  //   try {
  //     let imageBase64: string | null = null;
  //     if (image) {
  //       const reader = new FileReader();
  //       imageBase64 = await new Promise<string>((resolve) => {
  //         reader.onload = () => resolve(reader.result as string);
  //         reader.readAsDataURL(image);
  //       });
  //     }

  //     const productData = {
  //       name: data.name,
  //       description: data.description,
  //       price: parseFloat(data.price),
  //       formerPrice: parseFloat(data.formerPrice),
  //       discount: data.discount ? parseInt(data.discount) : 0,
  //       phoneNumber: data.phoneNumber,
  //       image: imageBase64,
  //     };

  //     const response = await fetch(
  //       `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
  //       {
  //         method: "PUT",
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //         body: JSON.stringify(productData),
  //       }
  //     );

  //     if (response.status === 401) {
  //       logout();
  //       setEditProductError("Session expired. Please log in again.");
  //       router.push("/auth/login");
  //       return;
  //     }

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       throw new Error(errorData.message || "Failed to update product");
  //     }

  //     const updatedProduct: Product = await response.json();
  //     setProducts(
  //       products.map((p) => (p._id === productId ? updatedProduct : p))
  //     );
  //     resetImage();
  //     setEditingProduct(null);
  //   } catch (err) {
  //     setEditProductError(
  //       err instanceof Error ? err.message : "An unknown error occurred"
  //     );
  //   } finally {
  //     setEditProductLoading(false);
  //   }
  // };

  const handleDeleteProduct = async (productId: string) => {
    if (!window.confirm("Are you sure you want to delete this product?")) return;
    // setAddProductLoading(true);
    setAddProductError(null);

    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/products/${productId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      if (response.status === 401) {
        logout();
        setAddProductError("Session expired. Please log in again.");
        router.push("/auth/login");
        return;
      }

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to delete product");
      }

      setProducts(products.filter((product) => product._id !== productId));
    } catch (err) {
      setAddProductError(
        err instanceof Error ? err.message : "An unknown error occurred"
      );
    } finally {
      // setAddProductLoading(false);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [eventResponse, winnersResponse, productsResponse] =
          await Promise.all([
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/winners/${params.eventId}`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            ),
            fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/api/events/${params.eventId}/products`,
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                  "Content-Type": "application/json",
                },
              }
            ),
          ]);

        if (
          eventResponse.status === 401 ||
          winnersResponse.status === 401 ||
          productsResponse.status === 401
        ) {
          logout();
          setError("Session expired. Please log in again.");
          router.push("/auth/login");
          return;
        }

        if (!eventResponse.ok) {
          const errorData = await eventResponse.json();
          throw new Error(
            errorData.message ||
              `Failed to fetch event (Status: ${eventResponse.status})`
          );
        }
        if (!winnersResponse.ok) {
          const errorData = await winnersResponse.json();
          throw new Error(
            errorData.message ||
              `Failed to fetch winners (Status: ${winnersResponse.status})`
          );
        }
        if (!productsResponse.ok) {
          const errorData = await productsResponse.json();
          throw new Error(
            errorData.message ||
              `Failed to fetch products (Status: ${productsResponse.status})`
          );
        }

        const eventData: Event = await eventResponse.json();
        const winnersData: Winner[] = await winnersResponse.json();
        const productsData: Product[] = await productsResponse.json();
        setEvent(eventData);
        setVendors(
          Array.isArray(eventData.vendors) &&
            eventData.vendors.every((v) => typeof v !== "string")
            ? eventData.vendors
            : null
        );
        setProducts(productsData);
        setWinners(winnersData);
      } catch (err) {
        console.error("Fetch error:", err);
        setError(
          err instanceof Error ? err.message : "An unknown error occurred"
        );
      } finally {
        setLoading(false);
      }
    };

    if (!authLoading && token) {
      fetchData();
    } else if (!authLoading && !token) {
      setError("No authentication token available");
      setLoading(false);
      router.push("/auth/login");
    }
  }, [params.eventId, token, authLoading, router, logout]);

  if (authLoading) return <div className="p-6 text-gray-800">Loading...</div>;
  if (loading)
    return <div className="p-6 text-gray-800">Loading event details...</div>;
  if (error) return <div className="p-6 text-red-500">Error: {error}</div>;
  if (!event) return <div className="p-6 text-gray-800">Event not found</div>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white shadow-sm">
        <EventHeader
          event={event}
          vendors={vendors}
          winners={winners}
          onBack={() => router.push("/admin/events")}
          copySpinWheelLink={copySpinWheelLink}
          copied={copied}
          openQRCodeModal={generateQRCodePDF}
          qrLoading={qrLoading}
        />
      </div>

      <div className="pb-8 px-1 max-w-7xl mx-auto mt-[1rem]">
        {(qrError || eventStatusError || addProductError || editProductError) && (
          <div className="mb-6">
            {qrError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                {qrError}
              </div>
            )}
            {eventStatusError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                {eventStatusError}
              </div>
            )}
            {addProductError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                {addProductError}
              </div>
            )}
            {editProductError && (
              <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded">
                {editProductError}
              </div>
            )}
          </div>
        )}

        <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
          <div className="border-b border-gray-200">
            <nav className="flex overflow-x-auto">
              <button
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "activate"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("activate")}
              >
                Activate Spinwheel
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "prizes"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("prizes")}
              >
                Prizes ({event.prizes.length})
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "partners"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("partners")}
              >
                Partners ({vendors?.length ?? 0})
              </button>
              <button
                className={`px-6 py-4 font-medium text-sm whitespace-nowrap ${
                  activeTab === "products"
                    ? "border-b-2 border-blue-600 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab("products")}
              >
                Products ({products.length})
              </button>
            </nav>
          </div>

          <div className="md:p-6 p-3">
            {activeTab === "prizes" && (
              <div className="space-y-6">
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <h2 className="text-xl font-semibold text-gray-900 mt-2">
                    Prize Management
                  </h2>
                  {event.prizes.length > 0 && (
                    <div className="text-sm text-gray-500">
                      Showing {currentPrizes.length} of {event.prizes.length} prizes
                    </div>
                  )}
                </div>

                {event.type === "Vendor" && (!vendors || vendors.length === 0) ? (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-700">
                      Please add a vendor before adding prizes.
                    </p>
                  </div>
                ) : (
                  <div className="bg-gray-50 rounded-lg">
                    <PrizeForm
                      event={event}
                      newPrize={newPrize}
                      setNewPrize={setNewPrize}
                      newMaxWins={newMaxWins}
                      setNewMaxWins={setNewMaxWins}
                      newRedeemInfo={newRedeemInfo}
                      setNewRedeemInfo={setNewRedeemInfo}
                      prizeLoading={prizeLoading}
                      prizeError={prizeError}
                      handleAddPrize={handleAddPrize}
                      selectedVendor={selectedVendor}
                      setSelectedVendor={setSelectedVendor}
                    />
                  </div>
                )}

                <PrizesList
                  event={event}
                  currentPrizes={currentPrizes}
                  editingPrizeId={editingPrizeId}
                  editPrizeName={editPrizeName}
                  setEditPrizeName={setEditPrizeName}
                  editMaxWins={editMaxWins}
                  setEditMaxWins={setEditMaxWins}
                  editRedeemInfo={editRedeemInfo}
                  setEditRedeemInfo={setEditRedeemInfo}
                  handleEditPrize={handleEditPrize}
                  handleDeletePrize={handleDeletePrize}
                  setEditingPrizeId={setEditingPrizeId}
                  currentPage={currentPage}
                  totalPages={totalPages}
                  setCurrentPage={setCurrentPage}
                  vendors={vendors}
                  selectedVendor={selectedVendor}
                  setSelectedVendor={setSelectedVendor}
                />
              </div>
            )}

            {activeTab === "partners" && (
              <div className="space-y-6">
                <h2 className="text-xl mt-2 font-semibold text-gray-900">
                  Partners & Sponsors
                </h2>
                <div className="rounded-lg">
                  <VendorForm
                    newVendor={newVendor}
                    setNewVendor={setNewVendor}
                    vendorError={addVendorError}
                    vendorLoading={addVendorLoading}
                    handleAddVendor={handleAddVendor}
                    vendorsCount={vendors?.length ?? 0}
                  />
                </div>
                <VendorsList
                  event={event}
                  vendors={vendors}
                  handleDeleteVendor={handleDeleteVendor}
                  setEditingVendor={setEditingVendor}
                />
              </div>
            )}

            {activeTab === "products" && (
              <div className="space-y-6">
                <h2 className="text-xl mt-2 font-semibold text-gray-900">
                  Product Management
                </h2>
                {event.type === "Vendor" && (!vendors || vendors.length === 0) ? (
                  <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 rounded">
                    <p className="text-yellow-700">
                      Please add a vendor before adding products.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-lg">
                    <ProductForm
                      eventId={params.eventId}
                      productError={addProductError}
                      productLoading={addProductLoading}
                      handleAddProduct={handleAddProduct}
                      productsCount={products.length}
                    />
                  </div>
                )}
                <ProductsList
                  event={event}
                  products={products}
                  handleDeleteProduct={handleDeleteProduct}
                  setEditingProduct={setEditingProduct}
                />
              </div>
            )}

            {activeTab === "activate" && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  Spinwheel Activation
                </h2>
                <div className="bg-gray-50 p-6 rounded-lg">
                  <EventStatus
                    event={event}
                    handleToggleActive={handleToggleActive}
                    handleSetTimer={handleSetTimer}
                    handleClearTimer={handleClearTimer}
                    eventStatusLoading={eventStatusLoading}
                    eventStatusError={eventStatusError}
                  />
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {editingVendor && (
        <EditVendorModal
          isOpen={!!editingVendor}
          onClose={() => setEditingVendor(null)}
          vendor={editingVendor}
          vendorError={editVendorError}
          vendorLoading={editVendorLoading}
          handleUpdateVendor={handleUpdateVendor}
          setEditingVendor={setEditingVendor}
        />
      )}

      {editingProduct && (
        <EditProductModal
          isOpen={!!editingProduct}
          onClose={() => setEditingProduct(null)}
          product={editingProduct}
          productError={editProductError}
          productLoading={editProductLoading}
          handleUpdateProduct={handleUpdateProduct}
          setEditingProduct={setEditingProduct}
        />
      )}

      <QRCodePreviewModal
        isOpen={isQRModalOpen}
        onClose={() => setIsQRModalOpen(false)}
        qrCodeDataUrl={qrCodeDataUrl}
        eventName={event.name}
        downloadPDF={downloadPDF}
      />
    </div>
  );
}