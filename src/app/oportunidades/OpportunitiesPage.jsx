"use client";

import { useMemo, useState } from "react";
import "./oportunidades.css";

const RESOURCES = [
  { name: "Escola Virtual Gov", type: "Cursos gratuitos", area: "Gestão e tecnologia", description: "Cursos e conteúdos de aprendizagem em temas como gestão pública, transformação digital, liderança e políticas públicas.", url: "https://www.escolavirtual.gov.br/", tags: ["Gestão", "Tecnologia", "Administração"] },
  { name: "Saber Virtual · CIEE", type: "Formação profissional", area: "Carreira", description: "Cursos online gratuitos e trilhas para desenvolver competências e se preparar para o mundo do trabalho.", url: "https://portal.ciee.org.br/quero-me-preparar/saber-virtual/", tags: ["Carreira", "Comunicação", "Tecnologia"] },
  { name: "AVAMEC · MEC", type: "Ambiente de aprendizagem", area: "Educação", description: "Ambiente do Ministério da Educação com cursos e ações formativas online. Confira os requisitos de cada oferta.", url: "https://avamec.mec.gov.br/", tags: ["Educação", "Pesquisa"] },
  { name: "Escola Virtual Fundação Bradesco", type: "Cursos gratuitos", area: "Tecnologia e negócios", description: "Formação online em áreas de conhecimento e competências úteis para estudo e trabalho.", url: "https://www.ev.org.br/", tags: ["Tecnologia", "Administração", "Finanças"] },
  { name: "SENAI · Cursos online", type: "Formação técnica", area: "Indústria e tecnologia", description: "Consulte a oferta de cursos gratuitos e oportunidades de formação técnica disponíveis.", url: "https://www.portaldaindustria.com.br/senai/canais/educacao-a-distancia/", tags: ["Indústria", "Tecnologia", "Técnica"] },
];

const FILTERS = ["Tudo", "Tecnologia", "Carreira", "Educação", "Administração", "Finanças"];

export default function OpportunitiesPage() {
  const [filter, setFilter] = useState("Tudo");
  const visible = useMemo(() => filter === "Tudo" ? RESOURCES : RESOURCES.filter((item) => item.tags.includes(filter)), [filter]);
  return (
    <main className="opportunities-shell">
      <header className="opportunities-header"><a href="/feed">← Voltar ao feed</a><a className="opportunities-brand" href="/">Trilha<span>Jovem</span></a></header>
      <section className="opportunities-hero">
        <p className="opportunities-kicker">SEU PRÓXIMO PASSO EXISTE</p>
        <h1>Conhecimento abre portas.<br/><span>Vamos encontrar a sua?</span></h1>
        <p>Uma seleção inicial de plataformas com cursos e formação. Explore no seu ritmo e confira os requisitos diretamente com cada instituição.</p>
      </section>
      <section className="opportunities-directory">
        <div className="opportunities-heading"><div><p className="opportunities-kicker">COMECE DE GRAÇA</p><h2>Onde aprender agora</h2></div><span>{visible.length} opções</span></div>
        <div className="opportunities-filters" aria-label="Filtrar oportunidades">{FILTERS.map((item) => <button key={item} className={filter === item ? "active" : ""} onClick={() => setFilter(item)} aria-pressed={filter === item}>{item}</button>)}</div>
        <div className="opportunities-grid">{visible.map((item, index) => <article key={item.name} className="opportunity-card"><span className="opportunity-number">0{index + 1}</span><p className="opportunity-type">{item.type}</p><h3>{item.name}</h3><p className="opportunity-description">{item.description}</p><div className="opportunity-tags">{item.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><a href={item.url} target="_blank" rel="noreferrer">Conhecer plataforma ↗</a></article>)}</div>
        <p className="opportunities-note">A Trilha Jovem não realiza inscrições nem garante disponibilidade de vagas. As ofertas, gratuidade, certificados e critérios podem mudar; confirme as informações no site oficial.</p>
      </section>
      <footer className="opportunities-footer">O primeiro passo não precisa ser perfeito. Só precisa ser seu.</footer>
    </main>
  );
}
