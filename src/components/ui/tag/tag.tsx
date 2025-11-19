type TagProps = {
  children: string;
  variant?: "ghost" | "gray";
  size?: "sm" | "md" | "lg";
};

export function Tag({ children, variant = "ghost", size = "md" }: TagProps) {
  const variants = {
    ghost:
      "border border-gray-400 text-gray-600 font-medium dark:border-cyan-900 dark:text-cyan-500",
    gray: "bg-gray-300 text-gray-600 font-semibold dark:bg-cyan-950  dark:text-cyan-500",
  };

  const sizes = {
    md: "md:py-1.5 md:px-2.5 py-1 px-2 text-medium md:text-base text-sm",
    sm: "md:py-1 md:px-1.5 py-1 px-1 text-medium md:text-sx text-sx",
    lg: "",
  };

  return (
    <span
      className={`inline-block rounded-sm  ${variants[variant]} ${sizes[size]}`}
    >
      {children}
    </span>
  );
}
