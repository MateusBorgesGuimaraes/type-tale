"use client";

import TinyButton from "@/components/ui/tiny-button/tiny-button";
import { VolumeWithChapters } from "@/types/volume";
import { formatDateBR } from "@/utils/format-date-br";
import { CirclePlusIcon } from "lucide-react";
import Link from "next/link";
import CustomCheckbox from "@/components/ui/custom-checkbox/custom-checkbox";
import { useState } from "react";
import Modal from "@/components/ui/modal/modal";
import UpdateVolumeForm from "@/components/ui/forms/update-volume-form";

type VolumeDisplayProps = {
  volumeAndChapter: VolumeWithChapters[];
  storyId: string;
};

export default function VolumeDisplay({
  volumeAndChapter,
  storyId,
}: VolumeDisplayProps) {
  const [editingVolumeId, setEditingVolumeId] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);
  const formatVolumeNumber = (index: number) => {
    return String(index + 1).padStart(3, "0");
  };

  const handlePublishToggle = (chapterId: string, currentStatus: boolean) => {
    //Implementar lógica de publicação/despublicação com backend
  };

  return (
    <>
      {volumeAndChapter.map((volume, index) => (
        <div key={volume.volume.id} className="pt-6">
          <div className="bg-gray-100 mr-[-24px] ml-[-24px] py-3.5 px-4 sm:px-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 sm:gap-0">
            <h2 className="text-gray-500 font-medium text-xs sm:text-sm uppercase">
              VOLUME {formatVolumeNumber(index)} - {volume.volume.title}
            </h2>
            <div className="flex gap-3 sm:gap-6 w-full sm:w-auto">
              <TinyButton className="bg-green-600 hover:bg-green-500 text-xs sm:text-sm flex-1 sm:flex-initial">
                <CirclePlusIcon className="w-4 h-4 sm:w-5 sm:h-5" />
                <span className="hidden sm:inline">NEW CHAPTER</span>
                <span className="sm:hidden">NEW</span>
              </TinyButton>
              <div>
                <TinyButton
                  onClick={() => setEditingVolumeId(volume.volume.id)}
                  className="bg-indigo-600 hover:bg-indigo-500 text-xs sm:text-sm flex-1 sm:flex-initial"
                >
                  EDIT
                </TinyButton>
              </div>
            </div>
          </div>
          <ul className="border-gray-300">
            {volume.chapters.length === 0 ? (
              <li className="py-6 text-center text-gray-400">
                No chapters in this volume yet
              </li>
            ) : (
              volume.chapters.map((chapter) => (
                <li
                  key={chapter.id}
                  className="py-3 sm:py-3.5 flex flex-col sm:flex-row justify-between sm:items-center gap-2 sm:gap-4 border-b border-gray-300 last:border-none"
                >
                  <div className="flex items-center gap-3 flex-1">
                    <CustomCheckbox
                      checked={!chapter.isDraft}
                      onChangeAction={() =>
                        handlePublishToggle(chapter.id, !chapter.isDraft)
                      }
                      isChecked={chapter.isDraft}
                    />
                    <Link
                      href={`/chapter/${chapter.slug}`}
                      className="text-sm sm:text-base text-gray-800 hover:text-cyan-800 transition"
                    >
                      <span className="font-medium">
                        {chapter.visualPosition} -
                      </span>{" "}
                      {chapter.title}
                    </Link>
                  </div>
                  <div className="flex gap-3 sm:gap-6 items-center justify-between sm:justify-end w-full sm:w-auto">
                    <span
                      className={`text-xs sm:text-sm order-2 sm:order-1 ${
                        chapter.isDraft
                          ? "text-red-500 font-semibold"
                          : "text-gray-500"
                      }`}
                    >
                      {chapter.publishedAt
                        ? formatDateBR(chapter.publishedAt)
                        : "DRAFT"}
                    </span>
                    <TinyButton className="bg-indigo-600 hover:bg-indigo-500 text-xs sm:text-sm order-1 sm:order-2">
                      EDIT
                    </TinyButton>
                  </div>
                </li>
              ))
            )}
          </ul>
        </div>
      ))}
      <Modal
        isOpen={editingVolumeId !== null}
        onClose={() => setEditingVolumeId(null)}
        title="Edit Volume"
        subtitle={`Update the volume ${
          volumeAndChapter.find((v) => v.volume.id === editingVolumeId)?.volume
            .title || ""
        }`}
        size="xl"
      >
        {editingVolumeId && (
          <UpdateVolumeForm
            volume={
              volumeAndChapter.find((v) => v.volume.id === editingVolumeId)!
                .volume
            }
            setIsOpenAction={() => setEditingVolumeId(null)}
            storyId={storyId}
          />
        )}
      </Modal>
    </>
  );
}
