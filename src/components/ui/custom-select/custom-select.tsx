import { Filters } from "@/types/stories";
import { ChevronDown } from "lucide-react";

type CustomSelectProps = {
  label: string;
  value: string;
  target: keyof Filters;
  onChange: (key: keyof Filters, value: string | number) => void;
  items: { label: string; value: string }[];
};

export default function CustomSelect({
  label,
  onChange,
  value,
  target,
  items,
}: CustomSelectProps) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-cyan-500">
        {label}
      </label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(target, e.target.value)}
          className="
            w-full px-3 py-2 border border-gray-300 dark:border-gray-400 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-cyan-700
            appearance-none pr-10 cursor-pointer
            bg-white dark:bg-gray-300 text-gray-700 dark:text-gray-800"
        >
          <option value="">All</option>
          {items.map((item) => (
            <option key={item.value} value={item.value}>
              {item.label}
            </option>
          ))}
        </select>
        <ChevronDown
          className="
            absolute right-3 top-1/2 -translate-y-1/2
            w-5 h-5 text-gray-400 pointer-events-none"
        />
      </div>
    </div>
  );
}
