type TagProps = {
  children: string;
  variant?: "ghost" | "gray";
};

export function Tag({ children, variant = "ghost" }: TagProps) {
  const variants = {
    ghost:
      "border border-gray-400 text-gray-600 font-medium dark:border-cyan-900 dark:text-cyan-500",
    gray: "bg-gray-300 text-gray-600 font-semibold dark:bg-cyan-950  dark:text-cyan-500",
  };

  return (
    <span
      className={`inline-block md:py-1.5 md:px-2.5 py-1 px-2 text-medium rounded-sm md:text-base text-sm ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
