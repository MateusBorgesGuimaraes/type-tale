"use client";

import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ButtonForm } from "../button-form/button-form";
import { ImageIcon, TvMinimalIcon } from "lucide-react";
import CustomInput from "../custom-input/custom-input";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import GeneralImageEditModal from "../general-image-edit-modal/general-image-edit-modal";
import {
  updateAnnouncementSchema,
  UpdateAnnouncementSchema,
} from "@/schemas/annoucement";
import { updateAnnouncement } from "@/lib/api/annoucements";
import { revalidateAnnouncements } from "@/actions/announcements";
import { CustomEditor } from "../custom-editor/custom-editor";
import { AnnouncementComplete } from "@/types/annoucements";

type EditAnnouncementFormProps = {
  announcement: AnnouncementComplete;
};

export default function EditAnnouncementForm({
  announcement,
}: EditAnnouncementFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isImageModalOpen, setIsImageModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
    setValue,
  } = useForm<UpdateAnnouncementSchema>({
    resolver: zodResolver(updateAnnouncementSchema),
    defaultValues: {
      title: announcement.title,
      image: announcement.image,
      content: announcement.content,
      isActive: announcement.isActive,
    },
  });

  const titleValue = watch("title");
  const imageValue = watch("image");
  const contentValue = watch("content");
  const isActiveValue = watch("isActive");

  const handleImageUploadSuccess = async (url: string) => {
    try {
      setUploadError(null);
      setValue("image", url);

      toast.success("Image uploaded successfully!");

      setTimeout(() => {
        setIsImageModalOpen(false);
      }, 1500);
    } catch (err: any) {
      const errorMsg = err.message || "Error uploading iamge.";
      toast.error(errorMsg);
      setUploadError(errorMsg);
    }
  };

  const handleImageUploadError = (error: string) => {
    setUploadError(error);
    toast.error(error);
  };

  const onSubmit = async (data: UpdateAnnouncementSchema) => {
    if (!user) {
      toast.error("You need to be logged in to create a announcement.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await updateAnnouncement(announcement.id, data);

      if (result.statusCode !== 200) {
        const errorMsg = result.message || "Error to update your announcement.";
        toast.error(errorMsg);
        return;
      }

      await revalidateAnnouncements(announcement.id);

      toast.success(result.message || "Announcement successfully updated!");
      reset(data);
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Unexpected error while update announcement.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[1100px] w-full">
        <h1 className="text-gray-800 flex gap-3 items-center mb-6">
          <TvMinimalIcon /> <p className="font-semibold">UPDATE ANNOUNCEMENT</p>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <CustomInput
            {...register("title")}
            label="ANNOUNCEMENT TITLE"
            type="text"
            required
            errorMessage={errors.title?.message}
            showClearButton={true}
            value={titleValue}
            onClear={() => setValue("title", "")}
            disabled={isLoading}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              UPDATE IMAGE <span className="text-red-500">*</span>
            </label>
            <div className="flex items-start gap-4 flex-col">
              {imageValue && (
                <div className="relative w-64 h-36 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                  <img
                    src={transformLinkImage(imageValue)}
                    alt="Highligth banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsImageModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                disabled={isLoading}
              >
                <ImageIcon size={18} />
                {imageValue ? "Change Image" : "Upload Image"}
              </button>
            </div>
            {errors.image && (
              <p className="mt-1 text-sm text-red-500">
                {errors.image.message}
              </p>
            )}
          </div>

          <Controller
            name="content"
            control={control}
            render={({ field }) => (
              <CustomEditor
                label="CONTENT"
                required
                value={contentValue}
                onChange={field.onChange}
                errorMessage={errors.content?.message}
                disabled={isLoading}
                placeholder="Write the announcement here... Use the toolbar to format text, add tables for stats, etc."
              />
            )}
          />

          <div className="flex gap-2 justify-end">
            <ButtonForm disabled={isLoading} sizes="sm" type="submit">
              {isLoading ? "SAVING..." : "SAVE CHANGES"}
            </ButtonForm>
          </div>
        </form>
      </div>

      <GeneralImageEditModal
        title="Annoucenment image"
        subtitle="Upload the image image for your announcement"
        type="announcement"
        isOpen={isImageModalOpen}
        onClose={() => setIsImageModalOpen(false)}
        currentImageUrl={imageValue || undefined}
        onUploadSuccess={handleImageUploadSuccess}
        onUploadError={handleImageUploadError}
      />
    </>
  );
}
