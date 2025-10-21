import Link from "next/link";

export function MenuItem({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: any;
  label: string;
}) {
  return (
    <li className="px-4 py-2.5 hover:bg-gray-300 dark:hover:bg-gray-600 transition">
      <Link href={href} className="flex gap-4 items-center">
        <Icon className="text-gray-700 dark:text-gray-50 xms:w-6 xms:h-6 w-5 h-5" />
        <p className="font-medium text-gray-700 dark:text-gray-50 text-base">
          {label}
        </p>
      </Link>
    </li>
  );
}
