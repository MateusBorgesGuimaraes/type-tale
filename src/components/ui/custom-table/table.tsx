export type Column<T> = {
  key: keyof T;
  label: string;
  render?: (value: T[keyof T], item: T) => React.ReactNode;
};

type CustomTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  emptyMessage?: string;
};

export function CustomTable<T extends Record<string, any>>({
  columns,
  data,
  emptyMessage = "No data found.",
}: CustomTableProps<T>) {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left">
        <thead className="bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 uppercase">
          <tr>
            {columns.map((col) => (
              <th key={String(col.key)} className="px-6 py-3">
                {col.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
          {data.length > 0 ? (
            data.map((item, i) => (
              <tr
                key={i}
                className="hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                {columns.map((col) => (
                  <td
                    key={String(col.key)}
                    className="px-6 py-4 text-gray-900 dark:text-gray-100"
                  >
                    {col.render
                      ? col.render(item[col.key], item)
                      : String(item[col.key])}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-6 text-gray-500 dark:text-gray-400"
              >
                {emptyMessage}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
