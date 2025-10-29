"use client";

import { Story, StoryRecommendation } from "@/types/stories";
import { createContext, useContext } from "react";

type StoryContextType = {
  data: Story;
  storiesRecommendationsData: StoryRecommendation[];
};

const StoryContext = createContext<StoryContextType | null>(null);

export function StoryProvider({
  value,
  children,
}: {
  value: StoryContextType;
  children: React.ReactNode;
}) {
  return (
    <StoryContext.Provider value={value}>{children}</StoryContext.Provider>
  );
}

export function useStory() {
  const context = useContext(StoryContext);
  if (!context) throw new Error("useStory must be used within StoryProvide");
  return context;
}
