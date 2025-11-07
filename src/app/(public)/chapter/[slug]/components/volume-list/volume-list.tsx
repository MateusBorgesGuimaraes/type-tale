"use client";

import { ChevronDownIcon } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function VolumeList() {
  const [showChapters, setShowChapters] = useState(false);

  return (
    <div className="">
      <button
        className="py-4 px-6 bg-gray-200 text-cyan-950 w-full flex justify-between items-center"
        onClick={() => setShowChapters(!showChapters)}
      >
        <p className="font-semibold text-lg">Volume 1: Fallen</p>
        <ChevronDownIcon
          className={`h-8 w-8 ${showChapters === true && "rotate-180"} transition`}
        />
      </button>
      <ul className={`${showChapters ? "block" : "hidden"} `}>
        <li>
          <Link href={"/"}>Capitulo 1</Link>
        </li>
        <li>
          <Link href={"/"}>Capitulo 1</Link>
        </li>
        <li>
          <Link href={"/"}>Capitulo 1</Link>
        </li>
        <li>
          <Link href={"/"}>Capitulo 1</Link>
        </li>
        <li>
          <Link href={"/"}>Capitulo 1</Link>
        </li>
      </ul>
    </div>
  );
}
