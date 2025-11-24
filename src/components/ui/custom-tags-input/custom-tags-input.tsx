import { XIcon } from "lucide-react";
import { useState, KeyboardEvent } from "react";
import { ErrorForm } from "../error-form/error-form";

type CustomTagsInputProps = {
  label: string;
  errorMessage?: string;
  required?: boolean;
  placeholder?: string;
  value?: string[];
  onChange?: (tags: string[]) => void;
  maxTags?: number;
};

export function CustomTagsInput({
  label,
  errorMessage,
  required,
  placeholder = "Type and press Enter",
  value = [],
  onChange,
  maxTags,
  ...rest
}: CustomTagsInputProps &
  Omit<React.InputHTMLAttributes<HTMLInputElement>, "value" | "onChange">) {
  const [inputValue, setInputValue] = useState("");
  const tags = value || [];

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();

      const trimmedValue = inputValue.trim();

      if (!trimmedValue) return;

      if (maxTags && tags.length >= maxTags) {
        return;
      }

      if (tags.includes(trimmedValue)) {
        setInputValue("");
        return;
      }

      const newTags = [...tags, trimmedValue];
      onChange?.(newTags);
      setInputValue("");
    }

    if (e.key === "Backspace" && !inputValue && tags.length > 0) {
      const newTags = tags.slice(0, -1);
      onChange?.(newTags);
    }
  };

  const removeTag = (indexToRemove: number) => {
    const newTags = tags.filter((_, index) => index !== indexToRemove);
    onChange?.(newTags);
  };

  const inputId = rest.name || label;

  return (
    <div className="w-full flex flex-col gap-1 group">
      <label
        htmlFor={inputId}
        className="uppercase font-medium text-sm text-gray-500 dark:text-gray-100 transition-colors group-focus-within:text-gray-800"
      >
        {required && <span className="mr-1 text-red-500">*</span>}
        {label}
        {maxTags && (
          <span className="ml-2 text-xs font-normal text-gray-400">
            ({tags.length}/{maxTags})
          </span>
        )}
      </label>

      <div
        className={`
          w-full border border-gray-300 rounded-md px-3 py-2
          bg-white
          min-h-[2.5rem]
          flex flex-wrap gap-2 items-center
          transition-all duration-200 ease-in-out
          hover:border-gray-400
          dark:hover:border-cyan-400
          focus-within:border-gray-600
          dark:focus-within:border-cyan-600
          focus-within:bg-gray-50
          dark:focus-within:bg-cyan-50
          ${errorMessage ? "border-red-500" : ""}
        `}
      >
        {tags.map((tag, index) => (
          <span
            key={index}
            className="inline-flex items-center gap-1 px-2 py-1 rounded-md bg-blue-100 dark:bg-cyan-100 text-blue-800 dark:text-cyan-800 text-sm"
          >
            {tag}
            <button
              type="button"
              onClick={() => removeTag(index)}
              className="hover:bg-blue-200 dark:hover:bg-cyan-200 rounded-full p-0.5 transition-colors"
              aria-label={`Remover tag ${tag}`}
            >
              <XIcon size={14} />
            </button>
          </span>
        ))}

        <input
          id={inputId}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={tags.length === 0 ? placeholder : ""}
          disabled={maxTags ? tags.length >= maxTags : false}
          className="flex-1 min-w-[120px] outline-none bg-transparent dark:text-gray-950 placeholder:text-gray-400 disabled:cursor-not-allowed"
          {...rest}
        />
      </div>

      <div className="min-h-[1rem]">
        {errorMessage && <ErrorForm errorMessage={errorMessage} />}
      </div>
    </div>
  );
}
