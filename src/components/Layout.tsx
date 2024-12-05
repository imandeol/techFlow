import React from "react";
import { Sidebar } from "./SideBar";
import { useSidebar } from "./SidebarContext";

interface LayoutProps {
  children: React.ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { isCollapsed } = useSidebar();

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main
        className={`flex-1 transition-all duration-300 bg-gray-100 ${
          isCollapsed ? "ml-16" : "ml-64"
        }`}
      >
        <div className="p-8">{children}</div>
      </main>
    </div>
  );
}
