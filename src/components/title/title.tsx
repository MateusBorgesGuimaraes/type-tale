type TitleProps = {
  children: string;
  variant?: "glow" | "aura" | "main";
};

export function Title({ children, variant = "glow" }: TitleProps) {
  const variants = {
    main: "",
    glow: "bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text animate-text-glow",
    aura: "text-white drop-shadow-[0_0_8px_rgba(0,255,255,0.6)] hover:drop-shadow-[0_0_16px_rgba(0,255,255,0.8)]",
  };

  return (
    <h1 className={`text-3xl font-semibold text-cyan-950 ${variants[variant]}`}>
      {children}
    </h1>
  );
}
