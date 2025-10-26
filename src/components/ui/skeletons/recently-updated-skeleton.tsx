import { Skeleton } from "./skeleton";

export function RecentlyUpdatedSkeleton() {
  return (
    <section className="full-bleed bg-gray-100 dark:bg-gray-800 mt-6 pb-8">
      <div className="wrapper">
        <div className="pt-8 pb-6 border-b border-gray-200 dark:border-gray-700">
          <Skeleton className="h-8 w-56" />
        </div>

        <div className="mt-4">
          <CustomTableSkeleton />
        </div>
      </div>
    </section>
  );
}

function CustomTableSkeleton() {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
          <tr>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-16" />
            </th>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-20" />
            </th>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-16" />
            </th>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-28" />
            </th>
            <th className="px-6 py-3">
              <Skeleton className="h-4 w-12" />
            </th>
          </tr>
        </thead>

        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {[1, 2, 3, 4, 5, 6].map((index) => (
            <tr
              key={index}
              className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
            >
              <td className="px-6 py-4">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-10 h-14 rounded-sm flex-shrink-0" />
                  <Skeleton className="h-5 w-40" />
                </div>
              </td>

              <td className="px-6 py-4">
                <Skeleton className="h-5 w-32" />
              </td>

              <td className="px-6 py-4">
                <Skeleton className="h-5 w-24" />
              </td>

              <td className="px-6 py-4">
                <Skeleton className="h-5 w-12" />
              </td>

              <td className="px-6 py-4">
                <Skeleton className="h-5 w-20" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
