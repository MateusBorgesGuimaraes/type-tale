"use client";

import { useState } from "react";
import ChapterHeader from "../chapters-header/chapters-header";
import { VolumeChapters } from "../volume-chapters/volume-chapters";
import { StoryChapters } from "@/types/chapter";

type VolumeSectionProps = {
  volumns: StoryChapters;
};

export default function VolumeSection({ volumns }: VolumeSectionProps) {
  const [listOrderStart, setListOrderStart] = useState(true);

  const lastChapter =
    volumns.story.chaptersCount > 0
      ? volumns.volumes[volumns.volumes.length - 1].chapters[
          volumns.volumes[volumns.volumes.length - 1].chapters.length - 1
        ]
      : "No chapter";

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
