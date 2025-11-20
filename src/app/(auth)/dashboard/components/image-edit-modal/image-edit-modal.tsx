"use client";

import ImageUpload from "@/components/ui/image-upload/image-upload";
import Modal from "@/components/ui/modal/modal";
import { transformLinkImage } from "@/lib/utils/transform-link-image";

interface ImageEditModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentImageUrl?: string;
  onUploadSuccess: (url: string) => void;
  onUploadError?: (error: string) => void;
}

export default function ImageEditModal({
  isOpen,
  onClose,
  currentImageUrl,
  onUploadSuccess,
  onUploadError,
}: ImageEditModalProps) {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="User Avatar"
      subtitle="Edit user image profile"
    >
      <ImageUpload
        type="avatar"
        currentImageUrl={transformLinkImage(
          currentImageUrl || "/mock-user.jpg",
        )}
        onUploadSuccess={onUploadSuccess}
        onUploadError={onUploadError}
        maxSizeMB={5}
        acceptedFormats={["image/png", "image/jpeg", "image/webp"]}
      />
    </Modal>
  );
}
