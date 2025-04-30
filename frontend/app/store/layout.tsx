import { AppSidebar } from "@/components/app-sidebar";
import Content from "@/components/Main/Content";
import Main from "@/components/Main/main";
import { SidebarProvider } from "@/components/ui/sidebar";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Store",
  description: "Mnemos Store",
};

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <SidebarProvider>
        <AppSidebar />
        
        <div className="grid grid-cols-3  w-full">
        {children}
          <Content />
        </div>
        <Main />
      </SidebarProvider>
    </>
  );
}
