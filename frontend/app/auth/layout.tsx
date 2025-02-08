
import type { Metadata } from "next";



export const metadata: Metadata = {
  title: "Auth",
  description: "Login for Mnemos",
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
  