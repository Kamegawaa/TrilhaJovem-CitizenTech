import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import AppNavigation from "@/components/AppNavigation";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Trilha Jovem — Da curiosidade à oportunidade", template: "%s | Trilha Jovem" },
  description: "Descubra interesses, explore conteúdos educativos, avance em trilhas de aprendizagem e encontre oportunidades de formação.",
  applicationName: "Trilha Jovem",
  manifest: "/manifest.webmanifest",
  appleWebApp: { capable: true, statusBarStyle: "black-translucent", title: "Trilha Jovem" }
};

export const viewport: Viewport = {
  themeColor: "#101510",
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover"
};

export default function RootLayout({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="pt-BR">
      <body>
        <AppNavigation />
        <div className="site-content">{children}</div>
        <footer className="site-footer">
          <span>Trilha Jovem <i>·</i> Da curiosidade à oportunidade.</span>
          <span>Protótipo demonstrativo · Sem cadastro · Dados locais neste dispositivo</span>
        </footer>
      </body>
    </html>
  );
}
