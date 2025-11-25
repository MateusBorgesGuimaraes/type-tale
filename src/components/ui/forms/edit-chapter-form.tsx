"use client";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import { ButtonForm } from "../button-form/button-form";

import { ScrollTextIcon } from "lucide-react";
import CustomInput from "../custom-input/custom-input";
import { CustomRadioGroup } from "../custom-radio-button/custom-radio-button";
import { chapterSchema, ChapterSchema } from "@/schemas/chapter";
import { CustomEditor } from "../custom-editor/custom-editor";
import { getChapterByIdOrSlug, updateChapter } from "@/lib/api/chapters";
import { Chapter } from "@/types/chapter";

type ChapterFormProps = {
  chapter: Chapter;
};

export default function EditChapterForm({ chapter }: ChapterFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    control,
    setValue,
  } = useForm<ChapterSchema>({
    resolver: zodResolver(chapterSchema),
    defaultValues: {
      title: chapter.title,
      content: chapter.content,
      isDraft: chapter.isDraft,
    },
  });

  const titleValue = watch("title");
  const contentValue = watch("content");
  const isDraftValue = watch("isDraft");

  const onSubmit = async (data: ChapterSchema) => {
    if (!user) {
      toast.error("You need to be logged in to edit a chapter.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await updateChapter(chapter.id, data);

      if (result.statusCode !== 201) {
        const errorMsg = result.message || "Error when updated your chapter.";
        toast.error(errorMsg);
        return;
      }

      toast.success(result.message || "Chapter successfully updated!");
      reset();
    } catch (error: any) {
      const errorMsg =
        error?.response?.data?.message ||
        error?.message ||
        "Unexpected error while updated chapter.";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="max-w-[1100px] w-full">
        <h1 className="text-gray-800 flex gap-3 items-center mb-6">
          <ScrollTextIcon /> <p className="font-semibold">UPDATED CHAPTER</p>
        </h1>
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
          <CustomInput
            {...register("title")}
            label="CHAPTER TITLE"
            type="text"
            required
            errorMessage={errors.title?.message}
            showClearButton={true}
            value={titleValue}
            onClear={() => setValue("title", "")}
            disabled={isLoading}
          />

          <Controller
            name="isDraft"
            control={control}
            render={({ field }) => (
              <CustomRadioGroup
                label="STATUS"
                required
                options={[
                  { value: "true", label: "Draft" },
                  { value: "false", label: "Published" },
                ]}
                value={String(isDraftValue)}
                onChange={field.onChange}
                orientation="horizontal"
                errorMessage={errors.isDraft?.message}
                name="isDraft"
                valueAsBoolean={true}
              />
            )}
          />

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
                placeholder="Write your story here... Use the toolbar to format text, add tables for stats, etc."
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
    </>
  );
}
