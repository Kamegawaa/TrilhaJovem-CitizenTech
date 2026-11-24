"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const LINKS = [
  {href:"/",label:"Início",icon:"⌂"},
  {href:"/feed",label:"Descobertas",icon:"✦"},
  {href:"/descobrir",label:"Pesquisar",icon:"⌕"},
  {href:"/aptidoes",label:"Interesses",icon:"◉"},
  {href:"/trilha?assunto=astronomia",label:"Trilhas",icon:"↗"},
  {href:"/oportunidades",label:"Oportunidades",icon:"◇"},
  {href:"/salvos",label:"Salvos",icon:"♡"},
  {href:"/quiz",label:"Desafio",icon:"✓"}
];

export default function AppNavigation() {
  const pathname = usePathname();
  return (
    <header className="site-nav">
      <div className="site-nav-inner">
        <Link className="site-brand" href="/" aria-label="Trilha Jovem, início">
          <span className="brand-symbol">t.</span>
          <span>trilha<span className="brand-accent">jovem</span></span>
        </Link>
        <nav className="site-nav-links" aria-label="Navegação principal">
          {LINKS.map((item) => {
            const active = item.href === "/" ? pathname === "/" : pathname === item.href.split("?")[0];
            return <Link key={item.href} href={item.href} className={active ? "site-nav-link active" : "site-nav-link"} aria-current={active ? "page" : undefined}><span className="nav-icon" aria-hidden="true">{item.icon}</span><span>{item.label}</span></Link>;
          })}
        </nav>
        <span className="site-demo-label"><span /> Protótipo</span>
      </div>
    </header>
  );
}
