"use client";

import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomTextarea from "../custom-textarea/custom-textarea";
import { ButtonForm } from "../button-form/button-form";
import { updateStorySchema, UpdateStorySchema } from "@/schemas/story";
import { updateStory } from "@/lib/api/stories";
import { NotebookPenIcon, ImageIcon } from "lucide-react";
import CustomInput from "../custom-input/custom-input";
import { GENRES, STATUS_OPTIONS, Story, STORY_TYPE } from "@/types/stories";
import { CustomRadioGroup } from "../custom-radio-button/custom-radio-button";
import { CustomSelect } from "../custom-select/custom-select";
import { CustomTagsInput } from "../custom-tags-input/custom-tags-input";
import { transformLinkImage } from "@/lib/utils/transform-link-image";
import GeneralImageEditModal from "../general-image-edit-modal/general-image-edit-modal";

interface EditStoryFormProps {
  story: Story;
}

export default function EditStoryForm({ story }: EditStoryFormProps) {
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
  } = useForm<UpdateStorySchema>({
    resolver: zodResolver(updateStorySchema),
    defaultValues: {
      title: story.title,
      coverUrl: story.coverUrl,
      language: story.language,
      mainGenre: story.mainGenre,
      status: story.status,
      storyType: story.storyType,
      synopsis: story.synopsis,
      tags: story.tags,
    },
  });

  const titleValue = watch("title");
  const coverUrlValue = watch("coverUrl");
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

  const onSubmit = async (data: UpdateStorySchema) => {
    if (!user || user.id !== story.author.id) {
      toast.error("You can only edit your own stories.");
      return;
    }

    try {
      setIsLoading(true);
      const result = await updateStory(story.id, data);
      if (result.statusCode !== 200) {
        const errorMsg = result.message || "Error updating your story.";
        toast.error(errorMsg);
        return;
      }

      toast.success(result.message || "Story updated successfully!");
      reset(data);
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Unexpected error while updating story.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[664px] w-full">
        <h1 className="text-gray-800 flex gap-3 items-center mb-6">
          <NotebookPenIcon /> <p className="font-semibold">EDIT STORY</p>
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <CustomInput
            {...register("title")}
            label="BOOK NAME"
            type="text"
            errorMessage={errors.title?.message}
            showClearButton={true}
            value={titleValue}
            onClear={() => setValue("title", "")}
            disabled={isLoading}
          />

          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              STORY COVER
            </label>
            <div className="flex gap-4 items-start flex-col">
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
                className="flex items-center gap-2 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
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
            options={STORY_TYPE}
            value={storyTypeValue}
            orientation="horizontal"
            errorMessage={errors.storyType?.message}
            disabled={isLoading}
            {...register("storyType")}
          />

          <CustomSelect
            label="Main Genre"
            value={mainGenreValue}
            options={GENRES}
            placeholder="Select a genre"
            errorMessage={errors.mainGenre?.message}
            disabled={isLoading}
            {...register("mainGenre")}
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
                disabled={isLoading}
              />
            )}
          />

          <CustomTextarea
            {...register("synopsis")}
            label="Synopsis"
            errorMessage={errors.synopsis?.message}
            value={synopsisValue}
            disabled={isLoading}
          />

          <CustomRadioGroup
            label="STORY STATUS"
            value={statusValue}
            options={STATUS_OPTIONS}
            orientation="horizontal"
            errorMessage={errors.status?.message}
            disabled={isLoading}
            {...register("status")}
          />

          <div className="flex gap-2 justify-end">
            <ButtonForm
              onClick={() => reset()}
              variant="secondary"
              sizes="sm"
              disabled={isLoading}
              type="button"
            >
              CANCEL
            </ButtonForm>
            <ButtonForm disabled={isLoading} sizes="sm" type="submit">
              {isLoading ? "UPDATING..." : "UPDATE"}
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
