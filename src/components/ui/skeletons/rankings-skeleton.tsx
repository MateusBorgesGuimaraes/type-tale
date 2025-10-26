import { Skeleton } from "./skeleton";

export function RankingsSkeleton() {
  return (
    <section
      aria-label="Loading Fanfics Ranking"
      className="full-bleed bg-gray-100 dark:bg-gray-800 mt-6 pb-8"
    >
      <div className="wrapper">
        <div className="pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <Skeleton className="h-8 w-48" />
        </div>

        <div className="mt-6 flex gap-4 justify-between px-2 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory">
          {[1, 2, 3].map((item) => (
            <div key={item} className="flex-shrink-0 snap-start">
              <RankingDisplaySkeleton />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function RankingDisplaySkeleton() {
  return (
    <div className="sx:min-w-[426px] max-w-[calc(100vw-32px)] w-full">
      <div className="flex w-full justify-between items-center">
        <div className="h-[32px] w-full bg-white dark:bg-gray-700 rounded-tl-sm flex items-center px-3.5">
          <Skeleton className="h-5 w-32" />
        </div>
        <div className="w-[40px] h-[32px] flex items-center justify-center">
          <Skeleton className="w-5 h-5" />
        </div>
      </div>

      <ul className="flex flex-col sx:py-6 py-3 px-3 bg-white dark:bg-gray-700 rounded-sm rounded-tl-none">
        {[1, 2, 3, 4, 5].map((index) => (
          <li
            key={index}
            className="flex gap-1.5 py-3 first-of-type:mt-0 border-b border-gray-200 dark:border-gray-800 last-of-type:border-b-0"
          >
            <Skeleton className="sx:max-w-[80px] sx:max-h-[107px] max-w-[60px] max-h-[80px] w-full h-full rounded-[2px]" />

            <div className="flex gap-1.5 w-full">
              <Skeleton className="h-5 w-8" />

              <div className="flex flex-col gap-1 flex-1">
                <Skeleton className="h-5 w-3/4" />

                <Skeleton className="h-3 w-20 mt-1" />

                <div className="flex items-center gap-1 mt-1">
                  <Skeleton className="w-3.5 h-3.5" />
                  <Skeleton className="h-3 w-8" />
                </div>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
