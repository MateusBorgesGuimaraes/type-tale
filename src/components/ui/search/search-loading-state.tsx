import { Loader2 } from "lucide-react";

export function SearchLoadingState() {
  return (
    <div className="flex flex-col items-center justify-center p-4 gap-2">
      <Loader2 className="w-5 h-5 animate-spin text-cyan-600" />
      <span className="text-sm text-gray-500">Buscando...</span>
    </div>
  );
}
