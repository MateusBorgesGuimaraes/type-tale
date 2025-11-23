"use client";

import { ButtonForm } from "../button-form/button-form";
import CustomInput from "../custom-input/custom-input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { toast } from "sonner";
import { updateVolumeSchema, UpdateVolumeSchemaData } from "@/schemas/volume";
import CustomTextarea from "../custom-textarea/custom-textarea";
import { Volume } from "@/types/volume";
import { updateVolumeAction } from "@/actions/volume";

type UpdateVolumeFormProps = {
  volume: Volume;
  storyId: string;
  setIsOpenAction: Dispatch<SetStateAction<boolean>>;
};

export default function UpdateVolumeForm({
  volume,
  setIsOpenAction,
  storyId,
}: UpdateVolumeFormProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    setValue,
  } = useForm<UpdateVolumeSchemaData>({
    resolver: zodResolver(updateVolumeSchema),
    defaultValues: {
      title: volume.title,
      description: volume.description,
    },
  });

  const titleValue = watch("title");
  const descriptionValue = watch("description");

  const onSubmit = async (data: UpdateVolumeSchemaData) => {
    try {
      setIsLoading(true);

      const result = await updateVolumeAction(data, volume.id, storyId);

      if (result.statusCode !== 200) {
        const errorMsg = result.message || "Error in update your volume";
        toast.error(errorMsg);
        return;
      }

      toast.success(result.message || "Volume updated successfully!");
      reset();
      setIsOpenAction(false);
    } catch (error: any) {
      const errorMsg =
        error?.message || "Unexpected error while editing your comment.";
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
          {isLoading ? "UPDATING..." : "UPDATE"}
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
