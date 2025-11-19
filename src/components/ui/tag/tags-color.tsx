import React from "react";

type TagColorProps = {
  children: string;
  color: string;
};

const colorMap: Record<string, string> = {
  cyan: "bg-cyan-100 text-cyan-700",
  red: "bg-red-100 text-red-700",
  green: "bg-green-100 text-green-700",
  blue: "bg-blue-100 text-blue-700",
  yellow: "bg-yellow-100 text-yellow-700",
  purple: "bg-purple-100 text-purple-700",
  pink: "bg-pink-100 text-pink-700",
  gray: "bg-gray-100 text-gray-700",
  emerald: "bg-emerald-100 text-emerald-700",
  rose: "bg-rose-100 text-rose-700",
  indigo: "bg-indigo-100 text-indigo-700",
  slate: "bg-slate-100 text-slate-700",
  violet: "bg-violet-100 text-violet-700",
  neutral: "bg-neutral-100 text-neutral-700",
};

export function TagColor({ children, color }: TagColorProps) {
  const colorClasses = colorMap[color] || "bg-gray-100 text-gray-700";

  return (
    <span className={`px-2 py-1 rounded font-medium ${colorClasses}`}>
      {children}
    </span>
  );
}
