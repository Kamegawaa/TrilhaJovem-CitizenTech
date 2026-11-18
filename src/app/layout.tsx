import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Trilha Jovem",
    template: "%s | Trilha Jovem",
  },
  description:
    "Da curiosidade à oportunidade. Descubra conhecimentos, experimente novas áreas e encontre caminhos para o futuro.",
  applicationName: "Trilha Jovem",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Trilha Jovem",
  },
};

export const viewport: Viewport = {
  themeColor: "#101014",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
