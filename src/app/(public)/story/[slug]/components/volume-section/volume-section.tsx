"use client";

import { useState, useMemo } from "react";
import ChapterHeader from "../chapters-header/chapters-header";
import { VolumeChapters } from "../volume-chapters/volume-chapters";
import { StoryChapters } from "@/types/chapter";

type VolumeSectionProps = {
  volumns: StoryChapters;
};

export default function VolumeSection({ volumns }: VolumeSectionProps) {
  const [listOrderStart, setListOrderStart] = useState(true);

  const lastChapter = useMemo(() => {
    if (volumns.story.chaptersCount === 0) return "No chapter";
    const lastVolume = volumns.volumes[volumns.volumes.length - 1];
    return lastVolume.chapters[lastVolume.chapters.length - 1];
  }, [volumns]);

  return (
    <>
      <ChapterHeader
        listOrderStart={listOrderStart}
        action={setListOrderStart}
        lastChapter={lastChapter}
      />
      {volumns.story.chaptersCount > 0 ? (
        volumns.volumes.map((volume, index) => (
          <div
            key={volume.volume.id}
            className="w-full flex justify-center mt-6"
          >
            <VolumeChapters
              startTop={listOrderStart}
              volume={volume}
              volumeOrder={index + 1}
            />
          </div>
        ))
      ) : (
        <p>No chapters published yet</p>
      )}
    </>
  );
}
