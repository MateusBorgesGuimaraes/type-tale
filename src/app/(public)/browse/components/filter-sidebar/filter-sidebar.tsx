import GenericSelect from "@/components/ui/generic-select/generic-select";

import {
  GENRES,
  LANGUAGES,
  SORT_OPTIONS,
  STATUS_OPTIONS,
  STORY_TYPE,
  Filters,
} from "@/types/stories";

interface FilterSidebarProps {
  filters: Filters;
  onFilterChange: (key: keyof Filters, value: string | number) => void;
  onClearFilters: () => void;
}

export function FilterSidebar({
  filters,
  onFilterChange,
  onClearFilters,
}: FilterSidebarProps) {
  return (
    <aside className="lg:col-span-1" aria-label="Filter options">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6 sticky top-4">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Filtros</h2>
          <button
            onClick={onClearFilters}
            className="text-sm text-cyan-600 dark:text-cyan-400 cursor-pointer hover:underline"
            aria-label="Clear all filters"
          >
            Clear
          </button>
        </div>

        <div className="mb-4">
          <GenericSelect
            label="Story Type"
            value={filters.storyType}
            items={STORY_TYPE}
            onChangeAction={(val) => onFilterChange("storyType", val)}
            getLabelAction={(i) => i.label}
            getValueAction={(i) => i.value}
          />
        </div>

        <div className="mb-4">
          <GenericSelect
            label="Main Genre"
            value={filters.mainGenre}
            items={GENRES}
            onChangeAction={(val) => onFilterChange("mainGenre", val)}
            getLabelAction={(i) => i.label}
            getValueAction={(i) => i.value}
          />
        </div>

        <div className="mb-4">
          <GenericSelect
            label="Languages"
            value={filters.language}
            items={LANGUAGES}
            onChangeAction={(val) => onFilterChange("language", val)}
            getLabelAction={(i) => i.label}
            getValueAction={(i) => i.value}
          />
        </div>

        <div className="mb-4">
          <GenericSelect
            label="Status"
            value={filters.status}
            items={STATUS_OPTIONS}
            onChangeAction={(val) => onFilterChange("status", val)}
            getLabelAction={(i) => i.label}
            getValueAction={(i) => i.value}
          />
        </div>

        <div className="mb-4">
          <GenericSelect
            label="Order by"
            value={filters.sortBy}
            items={SORT_OPTIONS}
            onChangeAction={(val) => onFilterChange("sortBy", val)}
            getLabelAction={(i) => i.label}
            getValueAction={(i) => i.value}
          />
        </div>

        <div className="mb-4">
          <fieldset>
            <legend className="block text-sm font-medium mb-2">Order</legend>
            <div className="flex gap-2">
              <button
                onClick={() => onFilterChange("sortOrder", "DESC")}
                className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
                  filters.sortOrder === "DESC"
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                    : "bg-gray-200 dark:bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500"
                }`}
                aria-pressed={filters.sortOrder === "DESC"}
              >
                ↓ Desc
              </button>

              <button
                onClick={() => onFilterChange("sortOrder", "ASC")}
                className={`flex-1 py-2 rounded-lg transition cursor-pointer ${
                  filters.sortOrder === "ASC"
                    ? "bg-cyan-600 hover:bg-cyan-700 text-white"
                    : "bg-gray-200 dark:bg-gray-400 hover:bg-gray-300 dark:hover:bg-gray-500"
                }`}
                aria-pressed={filters.sortOrder === "ASC"}
              >
                ↑ Asc
              </button>
            </div>
          </fieldset>
        </div>
      </div>
    </aside>
  );
}
