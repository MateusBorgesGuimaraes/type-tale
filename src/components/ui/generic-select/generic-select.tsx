"use client";

import { ChevronDown } from "lucide-react";

type GenericSelectProps<T> = {
  label: string;
  value: string | number | undefined;
  onChangeAction: (value: string | number) => void;

  items: T[];

  getLabelAction: (item: T) => string;

  getValueAction: (item: T) => string | number;

  showAllOption?: boolean;
};

export default function GenericSelect<T>({
  label,
  value,
  onChangeAction,
  items,
  getLabelAction,
  getValueAction,
  showAllOption = true,
}: GenericSelectProps<T>) {
  return (
    <div>
      <label className="block text-sm font-medium mb-2 dark:text-cyan-500">
        {label}
      </label>

      <div className="relative">
        <select
          value={value ?? ""}
          onChange={(e) => onChangeAction(e.target.value)}
          className="
            w-full px-3 py-2 border border-gray-300 dark:border-gray-400 rounded-lg
            focus:outline-none
            appearance-none pr-10 cursor-pointer
            bg-white dark:bg-gray-300 text-gray-700 dark:text-gray-800"
        >
          {showAllOption && <option value="">All</option>}

          {items.map((item, index) => (
            <option key={index} value={getValueAction(item)}>
              {getLabelAction(item)}
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
