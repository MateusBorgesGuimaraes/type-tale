"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import EditStoryForm from "@/components/ui/forms/edit-story-form";
import { toast } from "sonner";
import { Story } from "@/types/stories";

type EditStoryPageProps = {
  story: Story;
};

export default function EditStoryPage({ story }: EditStoryPageProps) {
  const router = useRouter();
  const { user } = useAuth();

  useEffect(() => {
    if (user && story.author.id !== user.id) {
      toast.error("You don't have permission to edit this story.");
      router.push(`/`);
    }
  }, []);

  if (!story) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">Story not found.</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600 dark:text-gray-400">User not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <EditStoryForm story={story} />
      </div>
    </div>
  );
}
