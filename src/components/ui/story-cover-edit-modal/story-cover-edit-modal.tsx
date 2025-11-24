"use client";

import ImageUpload from "@/components/ui/image-upload/image-upload";
import Modal from "@/components/ui/modal/modal";
import { transformLinkImage } from "@/lib/utils/transform-link-image";

interface StoryCoverEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
}

export default function StoryCoverEditModal({
  isOpen,
  onClose,
  currentImageUrl,
  onUploadSuccess,
  onUploadError,
}: StoryCoverEditModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Story Cover"
      subtitle="Upload the cover image for your story"
    >
      <ImageUpload
        type="cover"
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
