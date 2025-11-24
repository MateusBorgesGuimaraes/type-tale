"use client";

import { useState, useRef, ChangeEvent } from "react";
import { Upload, X, Check, AlertCircle, ImageIcon, Save } from "lucide-react";
import { uploadImage } from "@/lib/api/uploads";

type ImageType = "announcement" | "banner" | "cover" | "avatar";

interface ImageUploadProps {
  type: ImageType;
  onUploadSuccess?: (url: string) => void;
  onUploadError?: (error: string) => void;
  maxSizeMB?: number;
  acceptedFormats?: string[];
  currentImageUrl?: string;
  className?: string;
}

export default function ImageUpload({
  type,
  onUploadSuccess,
  onUploadError,
  maxSizeMB = 5,
  acceptedFormats = ["image/png", "image/jpeg", "image/webp"],
  currentImageUrl,
  className = "",
}: ImageUploadProps) {
  const [preview, setPreview] = useState<string | null>(
    currentImageUrl || null,
  );
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = (file: File): string | null => {
    if (!acceptedFormats.includes(file.type)) {
      return `Format not allowed. Use: ${acceptedFormats.map((f) => f.split("/")[1]).join(", ")}`;
    }

    const maxSizeBytes = maxSizeMB * 1024 * 1024;
    if (file.size > maxSizeBytes) {
      return `File too large. Maximum.: ${maxSizeMB}MB`;
    }

    return null;
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError(null);
    setSuccess(false);

    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setSelectedFile(file);

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreview(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSaveImage = async () => {
    if (!selectedFile) return;

    setUploading(true);
    setError(null);

    try {
      const result = await uploadImage(selectedFile, type);

      setSuccess(true);
      setSelectedFile(null);
      onUploadSuccess?.(result.data.url);

      setTimeout(() => setSuccess(false), 3000);
    } catch (err: any) {
      const errorMsg = err.message || "Error uploading image.";

      setError(errorMsg);
      setPreview(currentImageUrl || null);
      setSelectedFile(null);
      onUploadError?.(errorMsg);
    } finally {
      setUploading(false);
    }
  };

  const handleCancel = () => {
    setPreview(currentImageUrl || null);
    setSelectedFile(null);
    setError(null);
    setSuccess(false);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const getImageDimensions = () => {
    switch (type) {
      case "avatar":
        return "w-40 h-40 rounded-full mx-auto";
      case "banner":
        return "w-full h-48 rounded-xl";
      case "cover":
        return "sm:w-64 sm:h-96 w-48 h-72 rounded-xl mx-auto";
      case "announcement":
        return "w-full h-64 rounded-xl";
      default:
        return "w-64 h-64 rounded-xl mx-auto";
    }
  };

  const hasChanges = selectedFile !== null;

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="relative">
        {preview ? (
          <div className="space-y-3 ">
            <div
              className={`relative ${getImageDimensions()} overflow-hidden border-2 ${hasChanges ? "border-blue-400 dark:border-blue-500" : "border-gray-200 dark:border-gray-700"} shadow-lg group`}
            >
              <img
                src={preview}
                alt="Preview"
                className="w-full h-full object-cover"
              />

              {uploading && (
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/90 to-purple-600/90 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-white text-center">
                    <div className="relative w-16 h-16 mx-auto mb-3">
                      <div className="absolute inset-0 border-4 border-white/30 rounded-full"></div>
                      <div className="absolute inset-0 border-4 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                    </div>
                    <p className="text-sm font-medium">Sending image...</p>
                  </div>
                </div>
              )}
            </div>

            {!uploading && (
              <div className="flex gap-3">
                {hasChanges ? (
                  <>
                    <button
                      onClick={handleSaveImage}
                      className="flex-1 px-4 py-2.5 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-medium rounded-lg transition-all hover:shadow-lg flex items-center justify-center gap-2"
                    >
                      <Save size={18} />
                      Save Image
                    </button>
                    <button
                      onClick={handleCancel}
                      className="px-4 py-2.5 bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-300 font-medium rounded-lg transition-all"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <label className="flex-1">
                    <div className="w-full px-4 py-2.5 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white font-medium rounded-lg cursor-pointer transition-all hover:shadow-lg text-center">
                      <span className="flex items-center justify-center gap-2">
                        <ImageIcon size={18} />
                        Choose another image
                      </span>
                    </div>
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept={acceptedFormats.join(",")}
                      onChange={handleFileChange}
                      className="hidden"
                      disabled={uploading}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        ) : (
          <label
            className={`${getImageDimensions()} border-2 border-dashed border-gray-300 dark:border-gray-600 hover:border-blue-400 dark:hover:border-blue-500 flex flex-col items-center justify-center cursor-pointer transition-all bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 hover:shadow-lg group`}
          >
            <div className="text-center p-6">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                <Upload size={28} className="text-white" />
              </div>
              <p className="text-base font-medium text-gray-700 dark:text-gray-300 mb-2">
                Click to select an image.
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                PNG, JPEG or WEBP (máx. {maxSizeMB}MB)
              </p>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              accept={acceptedFormats.join(",")}
              onChange={handleFileChange}
              className="hidden"
              disabled={uploading}
            />
          </label>
        )}
      </div>

      {error && (
        <div className="flex items-start gap-3 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg shadow-sm">
          <AlertCircle
            size={20}
            className="text-red-500 flex-shrink-0 mt-0.5"
          />
          <div className="flex-1">
            <p className="text-sm font-medium text-red-700 dark:text-red-400">
              {error}
            </p>
          </div>
        </div>
      )}

      {success && (
        <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 border-l-4 border-green-500 rounded-lg shadow-sm">
          <Check size={20} className="text-green-500" />
          <p className="text-sm font-medium text-green-700 dark:text-green-400">
            Upload successful!
          </p>
        </div>
      )}
    </div>
  );
}
