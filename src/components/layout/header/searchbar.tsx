import { SearchIcon } from "lucide-react";

export function Searchbar() {
  return (
    <div className="border border-gray-900 dark:border-gray-50 rounded-full sx:flex hidden items-center xms:w-[330px] sx:w-[240px] w-[180px] pl-1.5  ">
      <button className="cursor-pointer">
        <SearchIcon className="text-gray-900 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5" />
      </button>
      <input className="w-full xms:h-9 h-6 rounded-tr-full rounded-br-full outline-none pl-2" />
    </div>
  );
}
