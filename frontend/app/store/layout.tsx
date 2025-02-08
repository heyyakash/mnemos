
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
          {children}
          </>
    );
  }
  