"use client";

import { usePathname } from "next/navigation";
import React from "react";

export default function AdminContentWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";

  return (
    <div
      className={`flex flex-1 justify-center lg:justify-start items-start bg-slate-100 w-full transition-all ${
        isHomePage ? "max-w-full" : "max-w-5xl mx-auto"
      }`}
    >
      {children}
    </div>
  );
}
