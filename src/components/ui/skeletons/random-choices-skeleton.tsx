import { Skeleton } from "./skeleton";

export function RandomChoicesSkeleton() {
  return (
    <div className="pb-8">
      <div className="pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
        <Skeleton className="h-8 w-48" />
      </div>

      <ul className="flex mt-6 lg:gap-7 gap-4 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 snap-x snap-mandatory">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map((item) => (
          <li className="flex-shrink-0 snap-start" key={item}>
            <SimpleStoryCardSkeleton />
          </li>
        ))}
      </ul>
    </div>
  );
}

function SimpleStoryCardSkeleton() {
  return (
    <div className="flex flex-col items-center">
      <Skeleton className="max-w-[84px] max-h-[113px] w-[84px] h-[113px] rounded-sm" />

      <Skeleton className="h-3 w-16 mt-1" />
    </div>
  );
}
