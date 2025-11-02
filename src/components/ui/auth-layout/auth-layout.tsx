import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="sx:h-[640px] h-full flex flex-col md:flex-row w-[1150px] shadow-sm rounded-sm overflow-hidden">
      <div className="flex-1 flex items-center justify-center sx:bg-white dark:sx:bg-gray-950 bg-inherit  sx:p-6 p-2">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden bg-gradient-to-br from-cyan-800 via-cyan-700 to-blue-500">
        <div className="absolute inset-0 bg-[url('/subtle-prism.svg')] bg-cover bg-center opacity-30 mix-blend-overlay animate-pulse" />

        {title && (
          <h2 className="relative z-10 text-4xl font-bold text-white dark:text-cyan-950 text-center px-8 drop-shadow-lg">
            {title}
          </h2>
        )}
      </div>
    </div>
  );
}
