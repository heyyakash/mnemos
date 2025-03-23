import { AppSidebar } from "@/components/app-sidebar";
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
        {children}
        <Main />
      </SidebarProvider>
    </>
  );
}
