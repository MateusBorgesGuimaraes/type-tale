"use client";

import { useAuth } from "@/hooks/use-auth";
import { UpdateCommentFormData, updateCommentSchema } from "@/schemas/comment";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dispatch, SetStateAction, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import CustomTextarea from "../custom-textarea/custom-textarea";
import { ButtonForm } from "../button-form/button-form";
import { updateCommentAction } from "@/actions/comments";
import { Comment, CommentWithoutRating } from "@/types/comment";

interface UpdateCommentFormProps {
  comment: Comment | CommentWithoutRating;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateCommentForm({
  comment,
  setIsOpen,
}: UpdateCommentFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
  } = useForm<UpdateCommentFormData>({
    resolver: zodResolver(updateCommentSchema),
    defaultValues: {
      body: comment.body,
    },
  });

  const bodyValue = watch("body");

  const onSubmit = async (data: UpdateCommentFormData) => {
    if (!user && user !== comment.user.id) {
      toast.error("You can only edit your own comment.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await updateCommentAction(
        data.body,
        comment.id,
        comment.targetType,
        comment.targetId,
      );

      if (result.statusCode !== 200) {
        const errorMsg = result.message || "Error in update your comment";
        toast.error(errorMsg);
        return;
      }

      toast.success(result.message || "Comment updated successfully!");
      reset();
      setIsOpen(false);
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
