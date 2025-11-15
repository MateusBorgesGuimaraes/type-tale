"use client";

import { useAuth } from "@/hooks/use-auth";
import { saveReadingProgressAction } from "@/actions/reading-progress";
import { toast } from "sonner";
import { useCallback, useRef } from "react";

type UseReadingProgressProps = {
  storyId: string;
  chapterId: string;
};

export function useReadingProgress({
  storyId,
  chapterId,
}: UseReadingProgressProps) {
  const { user } = useAuth();
  const hasShownToast = useRef(false);
  const isUpdating = useRef(false);

  const updateProgress = useCallback(
    async (force: boolean = false) => {
      if (!user || isUpdating.current) {
        return null;
      }

      isUpdating.current = true;

      try {
        const response = await saveReadingProgressAction({
          storyId,
          chapterId,
          force,
        });

        if (response.statusCode === 200 && response.data) {
          const {
            updated,
            needsConfirmation,
            currentChapter,
            requestedChapter,
          } = response.data;

          if (updated) {
            hasShownToast.current = false;
            return response;
          }

          if (
            needsConfirmation &&
            currentChapter &&
            requestedChapter &&
            !hasShownToast.current
          ) {
            hasShownToast.current = true;

            toast(
              `You're currently reading "${currentChapter.chapterId.title}". Do you want to jump to "${requestedChapter.title}"?`,
              {
                action: {
                  label: "Yes, update",
                  onClick: async () => {
                    hasShownToast.current = false;
                    await updateProgress(true);
                  },
                },
                cancel: {
                  label: "Cancel",
                  onClick: () => {
                    hasShownToast.current = false;
                  },
                },
                duration: 10000,
              },
            );
            return response;
          }
        }

        return response;
      } finally {
        isUpdating.current = false;
      }
    },
    [user, storyId, chapterId],
  );

  return { updateProgress };
}
