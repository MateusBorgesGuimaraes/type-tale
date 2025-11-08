import Link from "next/link";

type LinkButtonProps = {
  text: string;
  link: string;
  disabled?: boolean;
};

export function LinkButton({ text, link, disabled = false }: LinkButtonProps) {
  if (disabled)
    return (
      <div className="text-white md:text-base text-sm inline-block rounded-4xl bg-gray-400 sm:py-2.5 sm:px-6 py-1.5 px-4">
        {text}
      </div>
    );

  return (
    <Link
      className="text-white md:text-base text-sm inline-block rounded-4xl bg-cyan-600 hover:bg-cyan-700 transition sm:py-2.5 sm:px-6 py-1.5 px-4"
      href={link}
    >
      {text}
    </Link>
  );
}
