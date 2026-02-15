import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Henry Nguyen — Portfolio",
  description:
    "Personal portfolio of Henry Nguyen — UCLA CS '26, USC MSCS '28. Software engineer passionate about building elegant digital experiences.",
  openGraph: {
    title: "Henry Nguyen — Portfolio",
    description:
      "Personal portfolio of Henry Nguyen — UCLA CS '26, USC MSCS '28.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
