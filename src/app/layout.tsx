"use client";
import "~/styles/globals.css";

import { GeistSans } from "geist/font/sans";
import { type Metadata } from "next";
import Navbar from "./_components/navbar";
import { TRPCReactProvider } from "~/trpc/react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { SessionProvider } from "next-auth/react";

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const pathname = usePathname();
  const isHomePage = pathname === "/";
  const [loading, setLoading] = useState(true);
  const [dark, setDark] = React.useState<boolean>(true);
  const [progress, setProgress] = React.useState<number>(0);
  useEffect(() => {
    console.log("RootLayout Re-rendered | dark:", dark);
  }, [dark]);

  useEffect(() => {
    if (isHomePage) {
      let interval = setInterval(() => {
        setProgress((prev) => {
          if (prev >= 100) {
            clearInterval(interval);
            setTimeout(() => {
              setLoading(false);
            }, 250);
            return 100;
          }
          return prev + 10;
        });
      }, 50);
      return () => clearInterval(interval);
    }
  }, [isHomePage]);

  return (
    <html lang="en" className={`${GeistSans.variable}`}>
      <body
        className={`${dark ? "bg-gray-900 text-white" : "bg-amber-200 text-black"}`}
      >
        <TRPCReactProvider>
          <SessionProvider>
            <Navbar isDark={dark} setDark={setDark} />
            {children}

            {/* {loading && isHomePage && (
              <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-gray-900 text-white">
                <Image
                  src={"/logo1.png"}
                  alt="logo"
                  width={250}
                  height={250}
                  priority
                />
                <progress
                  className="mt-4 w-1/4 rounded-lg"
                  value={progress}
                  max={100}
                />{" "}
              </div>
            )} */}
          </SessionProvider>
        </TRPCReactProvider>
      </body>
    </html>
  );
}
