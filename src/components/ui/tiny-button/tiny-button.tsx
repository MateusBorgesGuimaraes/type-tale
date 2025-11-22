type TinyButtonProps = {
  children: React.ReactNode;
};

export default function TinyButton({
  children,
  ...rest
}: TinyButtonProps & React.ButtonHTMLAttributes<HTMLButtonElement>) {
  const className = rest.className;
  return (
    <button
      className={` text-white font-semibold text-sm py-1 px-3 rounded-sm cursor-pointer hover:bg-green-500 flex items-center gap-1.5 ${className}`}
    >
      {children}
    </button>
  );
}
