import type { Metadata } from "next";
import "./globals.css";
import {
  activeBrand,
  getBrandHtmlProps,
  brandHasExternalFont,
  BrandProvider,
} from "@ui-platform/ui";

export const metadata: Metadata = {
  title: "AI4Startups | Open-Source AI for Africa",
  description:
    "Open-source AI models and resources developed through the AI4Startups program, funded by the European Union.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" {...getBrandHtmlProps()}>
      <head>
        {/* Brand font loading (only if brand has external font) */}
        {brandHasExternalFont(activeBrand) && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link
              rel="preconnect"
              href="https://fonts.gstatic.com"
              crossOrigin="anonymous"
            />
            <link
              href={activeBrand.typography.font.url}
              rel="stylesheet"
            />
          </>
        )}
      </head>
      <body className="antialiased font-brand">{children}</body>
    </html>
  );
}
