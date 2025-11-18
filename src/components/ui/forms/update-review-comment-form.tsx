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
import { Rating } from "@smastrom/react-rating";
import { formatMessage } from "@/lib/utils/format-message";
import { Comment } from "@/types/comment";
import { updateRatingAction } from "@/actions/rating";

interface UpdateReviewCommentFormProps {
  comment: Comment;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

export default function UpdateReviewCommentForm({
  setIsOpen,
  comment,
}: UpdateReviewCommentFormProps) {
  const { user } = useAuth();
  const [isLoading, setIsLoading] = useState(false);

  const [writingQuality, setWritingQuality] = useState(
    comment.rating.writingQuality,
  );
  const [updateStability, setUpdateStability] = useState(
    comment.rating.updateStability,
  );
  const [plotDevelopment, setPlotDevelopment] = useState(
    comment.rating.plotDevelopment,
  );
  const [charactersBuilding, setCharactersBuilding] = useState(
    comment.rating.charactersBuilding,
  );
  const [worldBuilding, setWorldBuilding] = useState(
    comment.rating.worldBuilding,
  );

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
    if (!user || user.id !== comment.user.id) {
      toast.error("You can only update your own rating.");
      return;
    }

    if (
      writingQuality === 0 ||
      updateStability === 0 ||
      plotDevelopment === 0 ||
      charactersBuilding === 0 ||
      worldBuilding === 0
    ) {
      toast.error("Please rate all categories before submitting.");
      return;
    }

    setIsLoading(true);

    try {
      const ratings = {
        writingQuality,
        updateStability,
        plotDevelopment,
        charactersBuilding,
        worldBuilding,
      };

      const [commentResult, ratingResult] = await Promise.all([
        updateCommentAction(
          data.body,
          comment.id,
          comment.targetType,
          comment.targetId,
        ),
        updateRatingAction(ratings, comment.targetId),
      ]);

      const resComment = commentResult.data;
      const resRating = ratingResult.data;

      if (!commentResult.success || !ratingResult.success) {
        if (!commentResult.success && !ratingResult.success) {
          const errorMsg =
            formatMessage(
              `${resComment?.message || "Error updating comment"} and ${resRating?.message || "Error updating rating"}`,
            ) || "Error updating your comment and rating";
          toast.error(errorMsg);
          return;
        }

        if (!commentResult.success) {
          const errorMsg =
            formatMessage(resComment?.message) || "Error updating your comment";
          toast.error(errorMsg);
          return;
        }

        if (!ratingResult.success) {
          const errorMsg =
            formatMessage(resRating?.message) || "Error updating your rating";
          toast.error(errorMsg);
          return;
        }
      }

      const successMsg =
        formatMessage(
          `${resComment?.message || "Comment updated"} and ${resRating?.message || "Rating updated"}`,
        ) || "Comment and rating updated successfully!";
      toast.success(successMsg);

      reset();
      setWritingQuality(0);
      setUpdateStability(0);
      setPlotDevelopment(0);
      setCharactersBuilding(0);
      setWorldBuilding(0);
      setIsOpen(false);
    } catch (error: any) {
      console.error("Error updating comment/rating:", error);
      toast.error(
        error?.message || "An unexpected error occurred. Please try again.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="sm:w-[480px] w-[calc(100vw-84px)]">
      <ul className="flex flex-col sm:gap-3 gap-1 border border-gray-300 rounded-sm sm:px-6 sm:py-6 sx:px-4 sx:py-4 px-2 py-2 mb-4">
        <li className="flex sm:gap-2 gap-1 sx:flex-row flex-col justify-between items-center">
          <p>Writing Quality</p>
          <span className="border border-gray-300 border-dashed flex-1 sm:block hidden"></span>
          <Rating
            style={{ maxWidth: "120px" }}
            value={writingQuality}
            onChange={setWritingQuality}
            isDisabled={isLoading}
          />
        </li>
        <li className="flex sm:gap-2 gap-1 sx:flex-row flex-col justify-between items-center">
          <p>Stability of Updates</p>
          <span className="border border-gray-300 border-dashed flex-1 sm:block hidden"></span>
          <Rating
            style={{ maxWidth: "120px" }}
            value={updateStability}
            onChange={setUpdateStability}
            isDisabled={isLoading}
          />
        </li>
        <li className="flex sm:gap-2 gap-1 sx:flex-row flex-col justify-between items-center">
          <p>Story Development</p>
          <span className="border border-gray-300 border-dashed flex-1 sm:block hidden"></span>
          <Rating
            style={{ maxWidth: "120px" }}
            value={plotDevelopment}
            onChange={setPlotDevelopment}
            isDisabled={isLoading}
          />
        </li>
        <li className="flex sm:gap-2 gap-1 sx:flex-row flex-col justify-between items-center">
          <p>Character Design</p>
          <span className="border border-gray-300 border-dashed flex-1 sm:block hidden"></span>
          <Rating
            style={{ maxWidth: "120px" }}
            value={charactersBuilding}
            onChange={setCharactersBuilding}
            isDisabled={isLoading}
          />
        </li>
        <li className="flex sm:gap-2 gap-1 sx:flex-row flex-col justify-between items-center">
          <p>World Background</p>
          <span className="border border-gray-300 border-dashed flex-1 sm:block hidden"></span>
          <Rating
            style={{ maxWidth: "120px" }}
            value={worldBuilding}
            onChange={setWorldBuilding}
            isDisabled={isLoading}
          />
        </li>
      </ul>

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
    </div>
  );
}
