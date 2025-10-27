type TitleProps = {
  children: string;
  variant?: "main";
};

export function Title({ children, variant = "main" }: TitleProps) {
  const variants = {
    main: "",
  };

  return (
    <h1
      className={`sm:text-2xl text-xl font-semibold text-cyan-950 dark:text-cyan-400 ${variants[variant]}`}
    >
      {children}
    </h1>
  );
}
