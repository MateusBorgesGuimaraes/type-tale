"use client";

import { ButtonForm } from "../button-form/button-form";
import CustomInput from "../custom-input/custom-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { volumeSchema, VolumeSchemaData } from "@/schemas/volume";
import { createVolume } from "@/lib/api/volume";
import CustomTextarea from "../custom-textarea/custom-textarea";
import { createVolumeAction } from "@/actions/volume";

type VolumeFormProps = {
  storyId: string;
  storySlug: string;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
};

export default function VolumeForm({
  storyId,
  setIsOpenAction,
  storySlug,
}: VolumeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<VolumeSchemaData>({
    resolver: zodResolver(volumeSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const titleValue = watch("title");
  const descriptionValue = watch("description");

  const onSubmit = async (data: VolumeSchemaData) => {
    try {
      setIsLoading(true);
      setErrorMessage("");

      const result = await createVolumeAction(data, storyId, storySlug);

      if (result.statusCode !== 201) {
        const errorMsg = result.message || "Error in create the volume";
        toast.error(errorMsg);
        return;
      }

      toast.success(result.message || "Volume created successfully!");
      reset();
      setIsOpenAction(false);
    } catch (error: any) {
      const errorMsg = error?.message || "Unexpected error while create volume";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <CustomInput
        {...register("title")}
        label="title"
        type="text"
        required
        errorMessage={errors.title?.message}
        showClearButton={true}
        value={titleValue}
        onClear={() => setValue("title", "")}
        disabled={isLoading}
      />
      <CustomTextarea
        required
        {...register("description")}
        label="Description"
        errorMessage={errors.description?.message}
        value={descriptionValue}
        disabled={isLoading}
      />
      <div className="flex justify-between gap-2">
        <ButtonForm className="w-full" disabled={isLoading}>
          {isLoading ? "CREATING..." : "CREATE"}
        </ButtonForm>
        <ButtonForm
          onClick={() => setIsOpenAction(false)}
          className="w-full"
          variant="secondary"
          disabled={isLoading}
          type="button"
        >
          CANCEL
        </ButtonForm>
      </div>
    </form>
  );
}
