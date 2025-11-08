import Header from "@/components/Header";
import Sidebar from "@/components/Sidebar";
import React from "react";
import { redirect } from "next/navigation";
import { auth } from "@clerk/nextjs/server";
import AdminContentWrapper from "@/components/AdminContentWrapper";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { userId } = await auth();

  // 🔒 Server-side auth check
  if (!userId) {
    redirect("/login");
  }

  return (
    <div className="flex flex-col flex-1 min-h-screen">
      {/* Header */}
      <Header />

      <div className="flex flex-col flex-1 lg:flex-row bg-gray-100">
        {/* Sidebar */}
        <Sidebar />

        {/* Delegate layout sizing to client component */}
        <AdminContentWrapper>{children}</AdminContentWrapper>
      </div>
    </div>
  );
}
