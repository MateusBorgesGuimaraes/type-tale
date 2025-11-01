import { useState, useCallback, useRef, useEffect } from "react";
import { getStories } from "@/lib/api/stories";
import { StorySearchResult } from "@/types/stories";

export function useSearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<StorySearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);

  const performSearch = useCallback(async (value: string) => {
    if (value.trim().length < 3) {
      setResults([]);
      setHasSearched(false);
      return;
    }

    try {
      setIsLoading(true);
      const { data } = await getStories({
        page: 1,
        limit: 6,
        title: value,
      });

      setResults(data || []);
      setHasSearched(true);
    } catch (error) {
      console.error("Error searching for stories:", error);
      setResults([]);
      setHasSearched(true);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleSearch = useCallback(
    (value: string) => {
      setQuery(value);

      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }

      if (value.trim().length === 0) {
        setResults([]);
        setHasSearched(false);
        setIsLoading(false);
        return;
      }

      if (value.trim().length < 3) {
        setResults([]);
        setHasSearched(false);
        setIsLoading(false);
        return;
      }

      debounceTimerRef.current = setTimeout(() => {
        performSearch(value);
      }, 500);
    },
    [performSearch],
  );

  const clearSearch = useCallback(() => {
    setQuery("");
    setResults([]);
    setHasSearched(false);
    setIsLoading(false);

    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
  }, []);

  const handleResultClick = useCallback(() => {
    clearSearch();
    setIsFocused(false);
  }, [clearSearch]);

  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);

  return {
    query,
    results,
    isLoading,
    hasSearched,
    isFocused,
    setIsFocused,
    handleSearch,
    clearSearch,
    handleResultClick,
  };
}
