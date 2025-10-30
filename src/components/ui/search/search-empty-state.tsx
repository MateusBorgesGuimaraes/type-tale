export function SearchEmptyState() {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-1">
      <span className="text-sm text-gray-500">Nenhum resultado encontrado</span>
      <span className="text-xs text-gray-400">
        Tente buscar por outro termo
      </span>
    </div>
  );
}
