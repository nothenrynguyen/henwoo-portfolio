import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const inter = Inter({ subsets: ["latin"] });

// metadataBase allows Next.js to resolve relative image paths to absolute URLs
// for social share previews. Set NEXT_PUBLIC_SITE_URL in your Vercel env vars
// to your custom domain (e.g. https://henwoo.dev). On Vercel the VERCEL_URL
// fallback handles preview deployments automatically.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  title: "henry nguyen",
  description:
    "Personal portfolio of Henry Nguyen — UCLA CS '26, USC MSCS '28. Software engineer passionate about building elegant digital experiences.",
  metadataBase: new URL(siteUrl),
  openGraph: {
    title: "henry nguyen",
    description:
      "Personal portfolio of Henry Nguyen — UCLA CS '26, USC MSCS '28.",
    type: "website",
    images: [
      {
        url: "/images/portfolio-preview.svg",
        width: 1200,
        height: 630,
        alt: "Henry Nguyen Portfolio Preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "henry nguyen",
    description:
      "Personal portfolio of Henry Nguyen — UCLA CS '26, USC MSCS '28.",
    images: ["/images/portfolio-preview.svg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={inter.className}>
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
