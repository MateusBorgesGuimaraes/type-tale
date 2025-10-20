import { SearchIcon } from "lucide-react";

export function Searchbar() {
  return (
    <div className="border border-gray-900 rounded-full flex items-center w-[330px] pl-1.5">
      <button className="cursor-pointer">
        <SearchIcon className="text-gray-900" />
      </button>
      <input className="w-full h-9 rounded-tr-full rounded-br-full outline-none pl-2" />
    </div>
  );
}
