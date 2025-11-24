"use client";
import { useAuth } from "@/hooks/use-auth";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomTextarea from "../custom-textarea/custom-textarea";
import { ButtonForm } from "../button-form/button-form";

import { ScrollTextIcon } from "lucide-react";
import CustomInput from "../custom-input/custom-input";
import { CustomRadioGroup } from "../custom-radio-button/custom-radio-button";
import { chapterSchema, ChapterSchema } from "@/schemas/chapter";
import { CustomEditor } from "../custom-editor/custom-editor";

type ChapterFormProps = {
  volumeId: string;
};

export default function ChapterForm({ volumeId }: ChapterFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

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
      title: "",
      content: "",
      isDraft: false,
    },
  });

  const titleValue = watch("title");
  const contentValue = watch("content");
  const isDraftValue = watch("isDraft");

  const onSubmit = async (data: ChapterSchema) => {
    console.log("data", data);
  };

  return (
    <>
      <div className="max-w-[1100px] w-full">
        <h1 className="text-gray-800 flex gap-3 items-center mb-6">
          <ScrollTextIcon /> <p className="font-semibold">CREATE CHAPTER</p>
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
              {isLoading ? "CREATING..." : "CREATE"}
            </ButtonForm>
          </div>
        </form>
      </div>
    </>
  );
}
