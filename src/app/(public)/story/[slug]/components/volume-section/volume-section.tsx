"use client";

import { useState } from "react";
import ChapterHeader from "../chapters-header/chapters-header";
import { VolumeChapters } from "../volume-chapters/volume-chapters";

export default function VolumeSection() {
  const [listOrderStart, setListOrderStart] = useState(true);
  return (
    <>
      <ChapterHeader
        listOrderStart={listOrderStart}
        action={setListOrderStart}
      />
      <div className="w-full flex justify-center mt-6">
        <VolumeChapters startTop={listOrderStart} />
      </div>
    </>
  );
}
