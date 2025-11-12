"use client";
import { useState } from "react";
import StoryCardProgress from "@/components/ui/story-card-progress/story-card-progress";
import LibraryHeader from "../library-header/library-header";
import { ButtonForm } from "@/components/ui/button-form/button-form";
import { Trash2Icon } from "lucide-react";

export default function LibrarySection() {
  const arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
  const [isEditMode, setIsEditMode] = useState(false);
  const [selectedIds, setSelectedIds] = useState<number[]>([]);

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
    setSelectedIds([]);
  };

  const handleToggleSelect = (id: number) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleDelete = () => {
    if (selectedIds.length === 0) return;

    // Chamar API para deletar
    console.log("Deletando IDs:", selectedIds);

    // Limpar os Id e mudar o status dpeois de deletar
    setSelectedIds([]);
    setIsEditMode(false);
    // Revalidar os dados com da biblioteca do usuario
  };

  return (
    <section>
      <LibraryHeader
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

      <div className="grid grid-cols-[repeat(auto-fill,minmax(120px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(160px,1fr))] lg:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 p-4">
        {arr.map((id) => (
          <StoryCardProgress
            key={id}
            id={id}
            isEditMode={isEditMode}
            isSelected={selectedIds.includes(id)}
            onToggleSelect={handleToggleSelect}
          />
        ))}
      </div>
    </section>
  );
}
