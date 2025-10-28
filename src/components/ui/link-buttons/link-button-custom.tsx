import Link from "next/link";

type LinkButtonCustomProps = {
  children: React.ReactNode;
  link: string;
  className: string;
};

export default function LinkButtonCustom({
  children,
  link,
  className,
}: LinkButtonCustomProps) {
  return (
    <Link
      className={`flex gap-1.5 max-w-max items-center text-white hover:opacity-85 transition sx:text-lg font-medium rounded-lg py-2 sx:px-6 px-4 text-base ${className}`}
      href={link}
    >
      {children}
    </Link>
  );
}
