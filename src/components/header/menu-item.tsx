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
    <li className="px-4 py-2.5 hover:bg-gray-300 transition">
      <Link href={href} className="flex gap-4 items-center">
        <Icon className="text-gray-700" />
        <p className="font-medium text-gray-700 text-base">{label}</p>
      </Link>
    </li>
  );
}
