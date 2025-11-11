"use client";
import { useAuth } from "@/hooks/use-auth";
import { CommentFormData, commentSchema } from "@/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomTextarea from "../custom-textarea/custom-textarea";
import { ButtonForm } from "../button-form/button-form";
import { createCommentAction } from "@/actions/comments";

interface CommentFormProps {
  targetType: "story" | "chapter" | "announcement";
  targetId: string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function CommentForm({
  targetId,
  targetType,
  setIsOpen,
}: CommentFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
    defaultValues: {
      body: "",
      targetId: targetId,
      targetType: targetType,
    },
  });

  const bodyValue = watch("body");

  const onSubmit = async (data: CommentFormData) => {
    if (!user) {
      toast.error("You need to be logged in to comment.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await createCommentAction(data);

      if (result.statusCode !== 201) {
        const errorMsg = result.message || "Error in post your comment";
        toast.error(errorMsg);
        return;
      }

      toast.success(result.message || "Comment posted successfully!");
      reset();
      setIsOpen(false);
    } catch (error: any) {
      const errorMsg = error?.message || "Unexpected error while commenting";
      toast.error(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-1">
      <CustomTextarea
        required
        {...register("body")}
        label="Comment"
        errorMessage={errors.body?.message}
        value={bodyValue}
        disabled={isLoading}
      />

      <div className="flex gap-2 justify-end">
        <ButtonForm
          onClick={() => setIsOpen(false)}
          variant="secondary"
          sizes="sm"
          disabled={isLoading}
          type="button"
        >
          CANCEL
        </ButtonForm>
        <ButtonForm disabled={isLoading} sizes="sm" type="submit">
          {isLoading ? "SENDING..." : "SEND"}
        </ButtonForm>
      </div>
    </form>
  );
}
