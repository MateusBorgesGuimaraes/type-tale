type TitleProps = {
  children: string;
  variant?: "main";
};

export function TitleHeading2({ children, variant = "main" }: TitleProps) {
  const variants = {
    main: "",
  };

  return (
    <h1
      className={`sm:text-xl text-lg font-semibold text-cyan-950 dark:text-cyan-400 ${variants[variant]}`}
    >
      {children}
    </h1>
  );
}
