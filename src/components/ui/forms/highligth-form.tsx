"use client";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ButtonForm } from "../button-form/button-form";
import { ImageIcon, TvMinimalIcon } from "lucide-react";
import CustomInput from "../custom-input/custom-input";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import { highligthSchema, HighligthSchema } from "@/schemas/highligth";
import { createHighligth } from "@/lib/api/highlights";
import GeneralImageEditModal from "../general-image-edit-modal/general-image-edit-modal";
import { revalidateHighlights } from "@/actions/highlights";

export default function HighligthForm() {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [isCoverModalOpen, setIsCoverModalOpen] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<HighligthSchema>({
    resolver: zodResolver(highligthSchema),
    defaultValues: {
      title: "",
      banner: "",
      link: "",
      isActive: false,
    },
  });

  const titleValue = watch("title");
  const bannerValue = watch("banner");
  const linkValue = watch("link");
  const isActiveValue = watch("isActive");

  const handleBannerUploadSuccess = async (url: string) => {
    try {
      setUploadError(null);
      setValue("banner", url);

      toast.success("Banner uploaded successfully!");

      setTimeout(() => {
        setIsCoverModalOpen(false);
      }, 1500);
    } catch (err: any) {
      const errorMsg = err.message || "Error uploading banner.";
      toast.error(errorMsg);
      setUploadError(errorMsg);
    }
  };

  const handleBannerUploadError = (error: string) => {
    setUploadError(error);
    toast.error(error);
  };

  const onSubmit = async (data: HighligthSchema) => {
    if (!data.banner) {
      toast.error("Please upload the highligth banner before submitting.");
      return;
    }

    if (!user) {
      toast.error("You need to be logged in to create a highligth.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await createHighligth(data);

      if (result.statusCode !== 201) {
        const errorMsg =
          result.message || "Error when creating your highligth.";
        toast.error(errorMsg);
        return;
      }

      await revalidateHighlights();

      toast.success(result.message || "Highligth successfully created!");
      reset();
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Unexpected error while creating highligth.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[664px] w-full">
        <h1 className="text-gray-800 flex gap-3 items-center mb-6">
          <TvMinimalIcon /> <p className="font-semibold">CREATE HIGHLIGTH</p>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <CustomInput
            {...register("title")}
            label="HIGHLIGTH TITLE"
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
              HIGHLIGTH BANNER <span className="text-red-500">*</span>
            </label>
            <div className="flex items-start gap-4 flex-col">
              {bannerValue && (
                <div className="relative w-64 h-36 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                  <img
                    src={transformLinkImage(bannerValue)}
                    alt="Highligth banner preview"
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              <button
                type="button"
                onClick={() => setIsCoverModalOpen(true)}
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                disabled={isLoading}
              >
                <ImageIcon size={18} />
                {bannerValue ? "Change Banner" : "Upload Banner"}
              </button>
            </div>
            {errors.banner && (
              <p className="mt-1 text-sm text-red-500">
                {errors.banner.message}
              </p>
            )}
          </div>

          <CustomInput
            {...register("link")}
            label="LINK"
            type="text"
            required
            errorMessage={errors.link?.message}
            showClearButton={true}
            value={linkValue}
            onClear={() => setValue("link", "")}
            disabled={isLoading}
          />

          <div className="flex gap-2 justify-end">
            <ButtonForm disabled={isLoading} sizes="sm" type="submit">
              {isLoading ? "CREATING..." : "CREATE"}
            </ButtonForm>
          </div>
        </form>
      </div>

      <GeneralImageEditModal
        title="Highligth banner"
        subtitle="Upload the banner image for your highligth"
        type="banner"
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        currentImageUrl={bannerValue || undefined}
        onUploadSuccess={handleBannerUploadSuccess}
        onUploadError={handleBannerUploadError}
      />
    </>
  );
}
