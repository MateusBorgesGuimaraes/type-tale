"use client";

import { useSearch } from "@/hooks/useSearch";
import { useRef, useEffect } from "react";
import { SearchInput } from "./search-input";
import { SearchDropdown } from "./search-dropdown";

export default function SearchBar() {
  const inputRef = useRef<HTMLInputElement>(null);
  const {
    query,
    results,
    isLoading,
    hasSearched,
    isFocused,
    setIsFocused,
    handleSearch,
    clearSearch,
    handleResultClick,
  } = useSearch();

  const shouldShowDropdown =
    isFocused && (results.length > 0 || isLoading || hasSearched);

  const handleClearWithFocus = () => {
    clearSearch();
    inputRef.current?.focus();
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isFocused) {
        clearSearch();
        inputRef.current?.blur();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isFocused, clearSearch]);

  return (
    <div className="relative">
      <SearchInput
        ref={inputRef}
        value={query}
        onChange={handleSearch}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        onClear={handleClearWithFocus}
      />

      {shouldShowDropdown && (
        <SearchDropdown
          results={results}
          isLoading={isLoading}
          onResultClick={handleResultClick}
        />
      )}
    </div>
  );
}
