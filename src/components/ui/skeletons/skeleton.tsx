export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`bg-gray-300 dark:bg-gray-600 rounded animate-pulse ${className}`}
    />
  );
}
