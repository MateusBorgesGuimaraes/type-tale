"use client";

import ImageUpload from "@/components/ui/image-upload/image-upload";
import Modal from "@/components/ui/modal/modal";
import { transformLinkImage } from "@/lib/utils/transform-link-image";

interface GeneralImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
  title: string;
  subtitle: string;
  type: "announcement" | "banner" | "cover" | "avatar";
}

export default function GeneralImageEditModal({
  isOpen,
  onClose,
  currentImageUrl,
  onUploadSuccess,
  onUploadError,
  title,
  subtitle,
  type,
}: GeneralImageEditModalProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={type} subtitle={subtitle}>
      <ImageUpload
        type={type}
        currentImageUrl={
          currentImageUrl ? transformLinkImage(currentImageUrl) : undefined
        }
        onUploadSuccess={onUploadSuccess}
        onUploadError={onUploadError}
        maxSizeMB={5}
        acceptedFormats={["image/png", "image/jpeg", "image/webp"]}
      />
    </Modal>
  );
}
