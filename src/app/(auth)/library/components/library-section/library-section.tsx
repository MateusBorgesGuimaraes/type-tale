"use client";

import { useEffect, useMemo, useState } from "react";
import StoryCardProgress from "@/components/ui/story-card-progress/story-card-progress";
import LibraryHeader from "../library-header/library-header";
import { ButtonForm } from "@/components/ui/button-form/button-form";
import { Trash2Icon } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import { getAllStoriesInUserLibrary } from "@/lib/api/library";
import { toast } from "sonner";
import { AddedLibraryStoriesInfos } from "@/types/library";
import { removeStoriesBulk } from "@/actions/library";

export default function LibrarySection() {
  const { user } = useAuth();
  const [isEditMode, setIsEditMode] = useState(false);
  const [order, setOrder] = useState<"newest" | "oldest">("newest");
  const [stories, setStories] = useState<AddedLibraryStoriesInfos[] | null>(
    null,
  );
  const [errorMessage, setErrorMessage] = useState<string | string[]>("");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  useEffect(() => {
    if (user) {
      const getUserBooksInLibrary = async () => {
        const { data } = await getAllStoriesInUserLibrary();
        if ("message" in data && "statusCode" in data) {
          toast.error(data.message);
          setErrorMessage(data.message);
          return;
        }
        if (Array.isArray(data)) {
          setStories(data);
        }
      };
      getUserBooksInLibrary();
    }
  }, []);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedIds([]);
  };

  const handleToggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDelete = async () => {
    if (selectedIds.length === 0) return;

    try {
      const response = await removeStoriesBulk({ storyIds: selectedIds });
      if (response?.message) {
        toast.success(
          `${selectedIds.length > 1 ? "Stories" : "Story"} successfully removed`,
        );
        setStories(
          (prev) => prev?.filter((s) => !selectedIds.includes(s.storyId)) ?? [],
        );
      } else {
        toast.error("Failed to remove stories");
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err.message || "Error removing stories");
    } finally {
      setSelectedIds([]);
      setIsEditMode(false);
    }
  };

  const oldestStories = () => {
    if (!stories) return null;
    return [...stories].sort((a, b) => {
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });
  };

  const currentStoryOrder = order === "newest" ? stories : oldestStories();

  return (
    <section>
      <LibraryHeader
        order={order}
        changeOrder={setOrder}
        isEditMode={isEditMode}
        onToggleEditMode={handleToggleEditMode}
      />

      {isEditMode && selectedIds.length > 0 && (
        <div className="sticky top-0 z-10 bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-4 flex justify-between items-center">
          <p className="text-red-700 dark:text-red-300 font-semibold">
            {selectedIds.length}{" "}
            {selectedIds.length === 1 ? "story" : "stories"} selected
          </p>
          <ButtonForm
            disabled={false}
            className="flex gap-1 items-center"
            onClick={handleDelete}
            variant="danger"
            sizes="sm"
            type="button"
          >
            <Trash2Icon className="w-4 h-4" />
            Delete
          </ButtonForm>
        </div>
      )}

      {currentStoryOrder && currentStoryOrder.length > 0 ? (
        <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
          {currentStoryOrder.map((story) => (
            <StoryCardProgress
              key={story.storyId}
              coverUrl={story.coverUrl}
              lastChapterInfos={story.lastChapterInfos}
              readingProgress={story.readingProgress}
              storySlug={story.storySlug}
              storyTitle={story.storyTitle}
              id={story.storyId}
              isEditMode={isEditMode}
              isSelected={selectedIds.includes(story.storyId)}
              onToggleSelect={handleToggleSelect}
            />
          ))}
        </div>
      ) : (
        <p>
          {errorMessage.length > 0
            ? errorMessage
            : "No stories found in library"}{" "}
        </p>
      )}
    </section>
  );
}
