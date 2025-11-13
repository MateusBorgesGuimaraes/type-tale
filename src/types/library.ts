export type IsInLibrary = {
  inLibrary: boolean;
};

export type AddedLibrary = {
  id: string;
  storyId: string;
  storyTitle: string;
  coverUrl: string;
};

export type AddedLibraryStoriesInfos = {
  id: string;
  storyId: string;
  storyTitle: string;
  coverUrl: string;
  lastChapterInfos: {
    lastChapterReadId: string;
    lastChapterReadTitle: string;
    lastChapterReadSlug: string;
  } | null;
  readingProgress: {
    totalChapters: number;
    actualChapter: number;
  } | null;
};
