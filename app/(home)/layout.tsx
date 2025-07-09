import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/app/globals.css";
import Link from "next/link";
import Image from "next/image";
import wp from "@/public/wp.png";
import { Suspense } from "react";
import { Toaster } from "@/components/ui/toaster";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Home | Te lo Vendo",
  description: "Encontrá el auto de tus sueños al mejor precio.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Suspense>{children}</Suspense>
        <Link
          className="fixed bottom-0 right-0 z-50 m-5 cursor-pointer w-fit h-fit"
          target="_blank"
          href={"https://wa.me/542235423025"}
        >
          <Image src={wp} alt="" width={50} height={50} />
        </Link>
        <Toaster />
      </body>
    </html>
  );
}
