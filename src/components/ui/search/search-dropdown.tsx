import { StorySearchResult } from "@/types/stories";
import { SearchLoadingState } from "./search-loading-state";
import { SearchResultItem } from "./search-result-item";
import { SearchEmptyState } from "./search-empty-state";

interface SearchDropdownProps {
  results: StorySearchResult[];
  isLoading: boolean;
  onResultClick: () => void;
}

export function SearchDropdown({
  results,
  isLoading,
  onResultClick,
}: SearchDropdownProps) {
  return (
    <div className="absolute top-full mt-2 bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-700 rounded-2xl shadow-lg max-h-[300px] overflow-y-auto xms:w-[330px] sx:w-[240px] w-[180px] p-2 z-50 scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-700 animate-fadeIn-search">
      {isLoading ? (
        <SearchLoadingState />
      ) : results.length > 0 ? (
        results.map((story) => (
          <SearchResultItem
            key={story.id}
            story={story}
            onClick={onResultClick}
          />
        ))
      ) : (
        <SearchEmptyState />
      )}
    </div>
  );
}
