import Link from "next/link";

export function ModalActionButton({
  icon: Icon,
  label,
  link,
}: {
  icon: any;
  label: string;
  link: string;
}) {
  return (
    <div className="px-4 py-2.5 hover:bg-gray-300 transition bg-gray-100">
      <Link
        href={link}
        className="flex gap-4 items-center cursor-pointer w-full"
      >
        <Icon className="text-gray-700 xms:w-6 xms:h-6 w-5 h-5" />
        <p className="font-medium text-gray-700 text-base">{label}</p>
      </Link>
    </div>
  );
}
