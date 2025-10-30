"use client";
import { forwardRef } from "react";
import { SearchIcon, XIcon } from "lucide-react";

interface SearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onFocus: () => void;
  onBlur: () => void;
  onClear: () => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ value, onChange, onFocus, onBlur, onClear, onKeyDown }, ref) => {
    return (
      <div className="border border-gray-900 dark:border-gray-50 rounded-full sx:flex hidden items-center xms:w-[330px] sx:w-[240px] w-[180px] pl-1.5 transition-all duration-200 focus-within:border-cyan-600 focus-within:shadow-[0_0_8px_rgba(6,182,212,0.5)]">
        <button type="button" className="cursor-pointer" aria-label="Buscar">
          <SearchIcon className="text-gray-900 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5" />
        </button>
        <input
          ref={ref}
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          placeholder="Buscar histórias..."
          className="w-full xms:h-9 h-6 rounded-tr-full rounded-br-full outline-none pl-2 bg-transparent"
          aria-label="Campo de busca"
          autoComplete="off"
        />
        {value && (
          <button
            type="button"
            onClick={onClear}
            className="pr-2 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            aria-label="Limpar busca"
          >
            <XIcon className="h-5 w-5 cursor-pointer" />
          </button>
        )}
      </div>
    );
  },
);

SearchInput.displayName = "SearchInput";
