"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import "./trilha.css";

const STEPS = [
  { number: "01", title: "Desperte a curiosidade", description: "Comece pelo panorama geral. Descubra os conceitos e as perguntas que movem esse assunto." },
  { number: "02", title: "Faça conexões", description: "Observe como essa ideia se relaciona com outras áreas e com situações do mundo real." },
  { number: "03", title: "Vá mais fundo", description: "Use as referências para continuar estudando, comparar perspectivas e construir seu próprio repertório." },
];

export default function LearningPathPage() {
  const params = useSearchParams();
  const [topic, setTopic] = useState(params.get("assunto") || "");
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function load(value) {
    const term = value.trim();
    if (term.length < 2) { setError("Escolha um assunto com pelo menos duas letras."); return; }
    setLoading(true); setError(""); setItems([]);
    try {
      const response = await fetch(`/api/discover/search?q=${encodeURIComponent(term)}`);
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Não foi possível montar sua trilha.");
      setItems(data.results || []);
      if (!data.results?.length) setError("Não encontramos referências para esse assunto. Tente outro termo.");
    } catch (err) { setError(err.message || "Tente novamente em instantes."); }
    finally { setLoading(false); }
  }

  useEffect(() => { const initial = params.get("assunto"); if (initial) load(initial); }, [params]);

  return (
    <main className="path-shell">
      <header className="path-header"><a href="/feed">← Voltar ao feed</a><a className="path-brand" href="/">Trilha<span>Jovem</span></a></header>
      <section className="path-hero">
        <p className="path-kicker">DA CURIOSIDADE AO CONHECIMENTO</p>
        <h1>Uma descoberta<br/><span>pode abrir muitos caminhos.</span></h1>
        <p>Escolha um assunto. A gente reúne referências para você começar, conectar ideias e continuar explorando.</p>
        <form onSubmit={(event) => { event.preventDefault(); load(topic); }}>
          <input value={topic} onChange={(event) => setTopic(event.target.value)} placeholder="Ex.: astronomia, biologia, economia..." aria-label="Assunto da trilha" maxLength={100}/>
          <button disabled={loading}>{loading ? "Montando..." : "Montar minha trilha ↗"}</button>
        </form>
      </section>
      <section className="path-steps" aria-label="Etapas da trilha">
        {STEPS.map((step) => <article key={step.number}><span>{step.number}</span><div><h2>{step.title}</h2><p>{step.description}</p></div></article>)}
      </section>
      {error && <p className="path-error" role="alert">{error}</p>}
      {items.length > 0 && <section className="path-resources"><div><p className="path-kicker">SEU PONTO DE PARTIDA</p><h2>Referências sobre {topic}</h2><p>Materiais encontrados em fontes abertas. Use-os como início da investigação, não como ponto final.</p></div><div className="path-resource-list">{items.map((item, index) => <article key={item.id}><span>0{index + 1}</span><div><h3>{item.title}</h3>{item.description && <p>{item.description}</p>}<small>{item.source}</small></div><a href={item.url} target="_blank" rel="noreferrer" aria-label={`Abrir ${item.title}`}>↗</a></article>)}</div></section>}
      <footer className="path-footer">Aprender não é chegar rápido. É descobrir até onde sua curiosidade pode levar.</footer>
    </main>
  );
}
