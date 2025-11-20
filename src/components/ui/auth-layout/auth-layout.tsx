import React from "react";

type AuthLayoutProps = {
  children: React.ReactNode;
  title?: string;
};

export default function AuthLayout({ children, title }: AuthLayoutProps) {
  return (
    <div className="sx:h-[640px] h-full flex flex-col md:flex-row w-[1150px] shadow-sm rounded-sm overflow-hidden">
      <div className="flex-1 flex items-center justify-center sx:bg-white dark:sx:bg-gray-800 bg-inherit sx:p-6 p-2">
        <div className="w-full max-w-md">{children}</div>
      </div>

      <div className="hidden md:flex flex-1 items-center justify-center relative overflow-hidden">
        <img
          src="/auth-image3.png"
          alt="Auth Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/20" />

        {title && (
          <h2 className="relative z-10 text-4xl font-bold text-white text-center px-8 drop-shadow">
            {title}
          </h2>
        )}
      </div>
    </div>
  );
}
