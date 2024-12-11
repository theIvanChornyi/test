import type { Metadata } from "next";
import clsx from "clsx";

import "./globals.css";
import { roboto,inter } from "../shared/fonts";

export const metadata: Metadata = {
  title: "Amazing bank",
  description: "Amazing bank app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={clsx(roboto.variable,inter.variable)}>
        {children}
      </body>
    </html>
  );
}
