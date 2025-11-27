"use client";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomTextarea from "../custom-textarea/custom-textarea";
import { ButtonForm } from "../button-form/button-form";
import { storySchema, StorySchema } from "@/schemas/story";
import { createStory } from "@/lib/api/stories";
import { NotebookPenIcon, ImageIcon } from "lucide-react";
import CustomInput from "../custom-input/custom-input";
import { GENRES, LANGUAGES, STATUS_OPTIONS, STORY_TYPE } from "@/types/stories";
import { CustomRadioGroup } from "../custom-radio-button/custom-radio-button";
import { CustomSelect } from "../custom-select/custom-select";
import { CustomTagsInput } from "../custom-tags-input/custom-tags-input";
import StoryCoverEditModal from "../general-image-edit-modal/general-image-edit-modal";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import GeneralImageEditModal from "../general-image-edit-modal/general-image-edit-modal";

export default function StoryForm() {
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
    control,
    setValue,
  } = useForm<StorySchema>({
    resolver: zodResolver(storySchema),
    defaultValues: {
      title: "",
      coverUrl: "",
      language: "",
      mainGenre: "",
      status: "",
      storyType: "",
      synopsis: "",
      tags: [],
    },
  });

  const titleValue = watch("title");
  const coverUrlValue = watch("coverUrl");
  const languageValue = watch("language");
  const mainGenreValue = watch("mainGenre");
  const statusValue = watch("status");
  const storyTypeValue = watch("storyType");
  const synopsisValue = watch("synopsis");
  const tagsValue = watch("tags");

  const handleCoverUploadSuccess = async (url: string) => {
    try {
      setUploadError(null);
      setValue("coverUrl", url);

      toast.success("Cover uploaded successfully!");

      setTimeout(() => {
        setIsCoverModalOpen(false);
      }, 1500);
    } catch (err: any) {
      const errorMsg = err.message || "Error uploading cover.";
      toast.error(errorMsg);
      setUploadError(errorMsg);
    }
  };

  const handleCoverUploadError = (error: string) => {
    setUploadError(error);
    toast.error(error);
  };

  const onSubmit = async (data: StorySchema) => {
    if (!data.coverUrl) {
      toast.error("Please upload the story cover before submitting.");
      return;
    }

    if (!user) {
      toast.error("You need to be logged in to create a story.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await createStory(data);

      if (result.statusCode !== 201) {
        const errorMsg = result.message || "Error when creating your story.";
        toast.error(errorMsg);
        return;
      }

      toast.success(result.message || "Story successfully created!");
      reset();
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Unexpected error while creating story.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[664px] w-full">
        <h1 className="text-gray-800 flex gap-3 items-center mb-6">
          <NotebookPenIcon /> <p className="font-semibold">CREATE STORY</p>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <CustomInput
            {...register("title")}
            label="BOOK NAME"
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
              STORY COVER <span className="text-red-500">*</span>
            </label>
            <div className="flex items-start gap-4 flex-col">
              {coverUrlValue && (
                <div className="relative w-32 h-48 rounded-lg overflow-hidden border-2 border-gray-300 dark:border-gray-600">
                  <img
                    src={transformLinkImage(coverUrlValue)}
                    alt="Story cover preview"
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
                {coverUrlValue ? "Change Cover" : "Upload Cover"}
              </button>
            </div>
            {errors.coverUrl && (
              <p className="mt-1 text-sm text-red-500">
                {errors.coverUrl.message}
              </p>
            )}
          </div>

          <CustomRadioGroup
            label="TYPE"
            required
            options={STORY_TYPE}
            value={storyTypeValue}
            orientation="horizontal"
            errorMessage={errors.storyType?.message}
            {...register("storyType")}
          />

          <CustomSelect
            label="Main Genre"
            required
            value={mainGenreValue}
            options={GENRES}
            placeholder="Select a genre"
            errorMessage={errors.mainGenre?.message}
            {...register("mainGenre")}
          />

          <CustomSelect
            label="Language"
            required
            value={languageValue}
            options={LANGUAGES}
            placeholder="Select a language"
            errorMessage={errors.language?.message}
            {...register("language")}
          />

          <Controller
            name="tags"
            control={control}
            render={({ field }) => (
              <CustomTagsInput
                label="Tags"
                placeholder="Digite uma tag e pressione Enter"
                maxTags={10}
                errorMessage={errors.tags?.message}
                value={tagsValue}
                onChange={field.onChange}
              />
            )}
          />

          <CustomTextarea
            required
            {...register("synopsis")}
            label="Synopsis"
            errorMessage={errors.synopsis?.message}
            value={synopsisValue}
            disabled={isLoading}
          />

          <CustomRadioGroup
            label="STORY STATUS"
            required
            value={statusValue}
            options={STATUS_OPTIONS}
            orientation="horizontal"
            errorMessage={errors.status?.message}
            {...register("status")}
          />

          <div className="flex gap-2 justify-end">
            <ButtonForm disabled={isLoading} sizes="sm" type="submit">
              {isLoading ? "CREATING..." : "CREATE"}
            </ButtonForm>
          </div>
        </form>
      </div>

      <GeneralImageEditModal
        title="Story Cover"
        subtitle="Upload the cover image for your story"
        type="cover"
        isOpen={isCoverModalOpen}
        onClose={() => setIsCoverModalOpen(false)}
        currentImageUrl={coverUrlValue || undefined}
        onUploadSuccess={handleCoverUploadSuccess}
        onUploadError={handleCoverUploadError}
      />
    </>
  );
}
