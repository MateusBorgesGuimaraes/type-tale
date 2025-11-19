"use client";

import { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { getStories } from "@/lib/api/stories";
import {
  Filters,
  Genre,
  StorySearchParamsFull,
  StorySearchResult,
} from "@/types/stories";
import { Title } from "@/components/ui/title/title";
import Pagination from "@/components/ui/pagination/pagination";
import StoryCard from "./components/story-card/story-card";
import { FilterSidebar } from "./components/filter-sidebar/filter-sidebar";

const GENRE_COLORS_MAP: Record<Genre, string> = {
  action: "red",
  adventure: "emerald",
  comedy: "yellow",
  drama: "blue",
  fantasy: "purple",
  horror: "gray",
  romance: "pink",
  scifi: "cyan",
  slash: "rose",
  suspense: "indigo",
  thriller: "slate",
  litRPG: "green",
  isekai: "violet",
  other: "neutral",
};

export default function BrowsePage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [stories, setStories] = useState<StorySearchResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [meta, setMeta] = useState({
    total: 0,
    page: 1,
    limit: 12,
    totalPages: 0,
    hasNextPage: false,
    hasPreviousPage: false,
  });

  const [filters, setFilters] = useState<Filters>({
    search: searchParams.get("search") || "",
    storyType: searchParams.get("storyType") || "",
    mainGenre: searchParams.get("mainGenre") || "",
    language: searchParams.get("language") || "",
    status: searchParams.get("status") || "",
    sortBy: searchParams.get("sortBy") || "createdAt",
    sortOrder: (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC",
    page: parseInt(searchParams.get("page") || "1"),
  });

  useEffect(() => {
    setFilters({
      search: searchParams.get("search") || "",
      storyType: searchParams.get("storyType") || "",
      mainGenre: searchParams.get("mainGenre") || "",
      language: searchParams.get("language") || "",
      status: searchParams.get("status") || "",
      sortBy: searchParams.get("sortBy") || "createdAt",
      sortOrder: (searchParams.get("sortOrder") as "ASC" | "DESC") || "DESC",
      page: parseInt(searchParams.get("page") || "1"),
    });
  }, [searchParams]);

  const fetchStories = useCallback(async () => {
    setLoading(true);
    try {
      const params: StorySearchParamsFull = {
        page: filters.page,
        limit: 12,
      };

      if (filters.search) params.search = filters.search;
      if (filters.storyType) params.storyType = filters.storyType as any;
      if (filters.mainGenre) params.mainGenre = filters.mainGenre;
      if (filters.language) params.language = filters.language;
      if (filters.status) params.status = filters.status as any;
      if (filters.sortBy) params.sortBy = filters.sortBy;
      if (filters.sortOrder) params.sortOrder = filters.sortOrder;

      const response = await getStories(params);
      setStories(response.data || []);
      if (response.meta) {
        setMeta(response.meta);
      }
    } catch (error) {
      console.error("Erro ao buscar histórias:", error);
      setStories([]);
    } finally {
      setLoading(false);
    }
  }, [filters]);

  useEffect(() => {
    const params = new URLSearchParams();

    if (filters.search) params.set("search", filters.search);
    if (filters.storyType) params.set("storyType", filters.storyType);
    if (filters.mainGenre) params.set("mainGenre", filters.mainGenre);
    if (filters.language) params.set("language", filters.language);
    if (filters.status) params.set("status", filters.status);
    if (filters.sortBy) params.set("sortBy", filters.sortBy);
    if (filters.sortOrder) params.set("sortOrder", filters.sortOrder);
    if (filters.page > 1) params.set("page", filters.page.toString());

    router.push(`?${params.toString()}`, { scroll: false });
    fetchStories();

    window.scrollTo({ top: 0, behavior: "smooth" });
  }, [filters, router]);

  const handleFilterChange = (key: keyof Filters, value: string | number) => {
    setFilters((prev) => ({ ...prev, [key]: value, page: 1 }));
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setFilters((prev) => ({ ...prev, page: 1 }));
  };

  const clearFilters = () => {
    setFilters({
      search: "",
      storyType: "",
      mainGenre: "",
      language: "",
      status: "",
      sortBy: "createdAt",
      sortOrder: "DESC",
      page: 1,
    });
  };

  return (
    <div className="wrapper mx-auto px-4 py-8">
      <div className="mb-8">
        <Title>Search stories</Title>
      </div>

      <form onSubmit={handleSearch} className="mb-6">
        <div className="flex sx:flex-nowrap flex-wrap gap-2">
          <input
            type="text"
            placeholder="Search by title, synopsis, or author...."
            value={filters.search}
            onChange={(e) => handleFilterChange("search", e.target.value)}
            className="flex-1 px-4 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <button
            type="submit"
            className="px-6 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-700 cursor-pointer transition"
          >
            Search
          </button>
        </div>
      </form>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <FilterSidebar
          filters={filters}
          onFilterChange={handleFilterChange}
          onClearFilters={clearFilters}
        />

        <main className="lg:col-span-3">
          <div className="mb-4 flex justify-between items-center">
            <p className="text-gray-600 dark:text-gray-300">
              {loading ? "Loading..." : `${meta.total} stories found`}
            </p>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div
                  key={i}
                  className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg animate-pulse"
                />
              ))}
            </div>
          )}

          {!loading && stories.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {stories.map((story) => (
                <StoryCard
                  key={story.id}
                  genreColor={GENRE_COLORS_MAP[story.mainGenre as Genre]}
                  story={story}
                />
              ))}
            </div>
          )}

          {!loading && stories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-300 text-lg">
                No stories were found using the selected filters.
              </p>
              <button
                onClick={clearFilters}
                className="mt-4 text-cyan-600 hover:underline"
              >
                Clear filters and try again.
              </button>
            </div>
          )}

          {!loading && <Pagination meta={meta} />}
        </main>
      </div>
    </div>
  );
}
