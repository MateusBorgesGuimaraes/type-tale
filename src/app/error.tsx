"use client";

export default function Error({
  error,
  reset,
}: {
  error: Error;
  reset: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <h2 className="text-xl font-semibold">Algo deu errado!</h2>
      <button
        onClick={reset}
        className="px-4 py-2 bg-cyan-500 text-white rounded hover:bg-cyan-600 cursor-pointer"
      >
        Tentar novamente
      </button>
    </div>
  );
}
