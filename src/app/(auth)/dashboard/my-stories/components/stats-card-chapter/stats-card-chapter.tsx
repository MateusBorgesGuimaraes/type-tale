type StatsCardChapterProps = {
  icon: React.ElementType;
  label: string;
  value: number;
  color: string;
};

export default function StatsCardChapter({
  icon: Icon,
  label,
  value,
  color,
}: StatsCardChapterProps) {
  return (
    <div className="bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-900 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-center gap-4">
        <div className={`p-3 rounded-lg ${color}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <div className="flex-1">
          <p className="text-sm text-gray-600 dark:text-gray-400 font-medium">
            {label}
          </p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
            {value.toLocaleString("pt-BR")}
          </p>
        </div>
      </div>
    </div>
  );
}
