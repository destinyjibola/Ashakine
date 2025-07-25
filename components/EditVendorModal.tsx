"use client";
import Modal from "@/components/Modal";
import EditVendorForm from "@/components/EditVendorForm";
import { Vendor } from "@/types";

interface EditVendorModalProps {
  isOpen: boolean;
  onClose: () => void;
  vendor: Vendor;
  vendorError: string | null;
  vendorLoading: boolean;
  handleUpdateVendor: (
    e: React.FormEvent,
    vendorId: string,
    data: { name: string; url: string; email?: string },
    logo: File | null,
    resetLogo: () => void
  ) => void;
  setEditingVendor: (vendor: Vendor | null) => void;
}

export default function EditVendorModal({
  isOpen,
  onClose,
  vendor,
  vendorError,
  vendorLoading,
  handleUpdateVendor,
  setEditingVendor,
}: EditVendorModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <EditVendorForm
        vendor={vendor}
        vendorError={vendorError}
        vendorLoading={vendorLoading}
        handleUpdateVendor={handleUpdateVendor}
        setEditingVendor={setEditingVendor}
      />
    </Modal>
  );
}