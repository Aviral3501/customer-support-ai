"use client";

import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { usePathname } from "next/navigation";

function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // Check if current route is the homepage
  const isHomePage = pathname === "/";

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-col flex-1 lg:flex-row bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Main content area */}
        <div
          className={`flex flex-1 justify-center lg:justify-start items-start mx-auto bg-slate-100 w-full ${
            isHomePage ? "max-w-full" : "max-w-5xl"
          }`}
        >
          {children}
        </div>
      </div>
    </div>
  );
}

export default AdminLayout;
