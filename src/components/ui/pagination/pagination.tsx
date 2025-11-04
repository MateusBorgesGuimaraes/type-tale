import { useRouter, useSearchParams, usePathname } from "next/navigation";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronsLeftIcon,
  ChevronsRightIcon,
} from "lucide-react";

interface PaginationMeta {
  total: number;
  page: number;
  limit: number;
  totalPages: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
}

interface PaginationProps {
  meta?: PaginationMeta;
}

export default function Pagination({ meta }: PaginationProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  if (!meta || meta.totalPages <= 1) return null;

  const changePage = (newPage: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", newPage.toString());
    router.push(`${pathname}?${params.toString()}`);
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const { page, totalPages } = meta;

    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (page <= 3) {
        pages.push(1, 2, 3, 4, "...", totalPages);
      } else if (page >= totalPages - 2) {
        pages.push(
          1,
          "...",
          totalPages - 3,
          totalPages - 2,
          totalPages - 1,
          totalPages,
        );
      } else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex items-center justify-between  py-3 mt-6">
      <div className="flex justify-between sm:hidden w-full">
        <button
          onClick={() => changePage(meta.page - 1)}
          disabled={!meta.hasPreviousPage}
          className="relative inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-500  bg-white dark:bg-gray-50 border border-gray-300 dark:border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Previous
        </button>
        <button
          onClick={() => changePage(meta.page + 1)}
          disabled={!meta.hasNextPage}
          className="relative ml-3 inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium rounded-md text-gray-700 dark:text-gray-500  bg-white dark:bg-gray-100 border border-gray-300 dark:border-gray-100 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Next
        </button>
      </div>

      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-700 dark:text-gray-300">
            Showing{" "}
            <span className="font-medium">
              {(meta.page - 1) * meta.limit + 1}
            </span>{" "}
            to{" "}
            <span className="font-medium">
              {Math.min(meta.page * meta.limit, meta.total)}
            </span>{" "}
            of <span className="font-medium">{meta.total}</span> results
          </p>
        </div>

        <div>
          <nav
            className="isolate inline-flex -space-x-px rounded-md shadow-sm"
            aria-label="Pagination"
          >
            <button
              onClick={() => changePage(1)}
              disabled={!meta.hasPreviousPage}
              className="relative inline-flex cursor-pointer items-center rounded-l-md px-2 py-2 text-gray-400 dark:text-gray-300 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsLeftIcon className="h-5 w-5" />
            </button>

            <button
              onClick={() => changePage(meta.page - 1)}
              disabled={!meta.hasPreviousPage}
              className="relative inline-flex cursor-pointer items-center px-2 py-2 text-gray-400 dark:text-gray-300 ring-1 ring-inset ring-gray-300 dark:ring-gray-200  hover:bg-gray-50 dark:hover:bg-white disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronLeftIcon className="h-5 w-5" />
            </button>

            {getPageNumbers().map((pageNum, idx) =>
              pageNum === "..." ? (
                <span
                  key={`ellipsis-${idx}`}
                  className="relative inline-flex items-center px-4 py-2 text-sm font-semibold text-gray-700 dark:text-gray-200 ring-1 ring-inset ring-gray-300 dark:ring-gray-100"
                >
                  ...
                </span>
              ) : (
                <button
                  key={pageNum}
                  onClick={() => changePage(pageNum as number)}
                  className={`relative cursor-pointer inline-flex items-center px-4 py-2 text-sm font-semibold ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ${
                    pageNum === meta.page
                      ? "z-10 bg-cyan-600 text-white hover:bg-cyan-500 hover:text-gray-700"
                      : "text-gray-900 dark:text-gray-600"
                  }`}
                >
                  {pageNum}
                </button>
              ),
            )}

            <button
              onClick={() => changePage(meta.page + 1)}
              disabled={!meta.hasNextPage}
              className="relative inline-flex items-center px-2 py-2 text-gray-400 dark:text-gray-200 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronRightIcon className="h-5 w-5" />
            </button>

            <button
              onClick={() => changePage(meta.totalPages)}
              disabled={!meta.hasNextPage}
              className="relative inline-flex items-center rounded-r-md px-2 py-2 text-gray-400 ring-1 ring-inset ring-gray-300 hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <ChevronsRightIcon className="h-5 w-5" />
            </button>
          </nav>
        </div>
      </div>
    </div>
  );
}
