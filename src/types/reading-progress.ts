export type SaveReadingProgressType = {
  storyId: string;
  chapterId: string;
  force?: boolean;
};

export type ReadingProgressResponse = {
  statusCode: number;
  data?: {
    updated: boolean;
    needsConfirmation?: boolean;
    currentChapter?: {
      id: string;
      story: {
        id: string;
        title: string;
        slug: string;
        coverUrl: string;
      };
      chapterId: {
        id: string;
        title: string;
        slug: string;
      };
      updatedAt: string;
    };
    requestedChapter?: {
      id: string;
      title: string;
    };
    progress?: {
      id: string;
      story: {
        id: string;
        title: string;
        slug: string;
        coverUrl: string;
      };
      chapterId: {
        id: string;
        title: string;
        slug: string;
      };
      updatedAt: string;
    };
  };
  message?: string;
};
