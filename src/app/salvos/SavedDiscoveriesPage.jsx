"use client";

import { useEffect, useState } from "react";
import "./salvos.css";

const SAVED_KEY = "trilhajovem.saved-discoveries";

export default function SavedDiscoveriesPage() {
  const [items, setItems] = useState([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(SAVED_KEY) || "[]");
      if (Array.isArray(saved)) setItems(saved);
    } catch { /* Dados inválidos não impedem a página de abrir. */ }
    setReady(true);
  }, []);

  function removeItem(id) {
    setItems((current) => {
      const next = current.filter((item) => item.id !== id);
      try { window.localStorage.setItem(SAVED_KEY, JSON.stringify(next)); } catch { /* Mantém estado da sessão. */ }
      return next;
    });
  }

  return <main className="saved-shell">
    <header className="saved-header"><a href="/feed">← Voltar ao feed</a><a className="saved-brand" href="/">Trilha<span>Jovem</span></a></header>
    <section className="saved-intro"><p>SEU REPERTÓRIO</p><h1>Descobertas para<br/><span>revisitar depois.</span></h1><p>Guarde ideias que despertaram sua curiosidade e volte a elas quando quiser.</p></section>
    {!ready ? <p className="saved-empty">Carregando suas descobertas...</p> : items.length === 0 ? <section className="saved-empty"><h2>Nenhuma descoberta salva ainda.</h2><p>Explore o feed e salve os conteúdos que quiser aprofundar.</p><a href="/feed">Explorar o feed ↗</a></section> : <section className="saved-list" aria-label="Descobertas salvas">{items.map((item) => <article key={item.id}><div><span>{item.tag || item.category}</span><h2>{item.title}</h2><p>{item.note}</p>{item.source && <small>{item.source.source} · {item.source.title}</small>}</div><div className="saved-actions"><a href={item.source?.url || `/trilha?assunto=${encodeURIComponent(item.query)}`} target={item.source?.url ? "_blank" : undefined} rel={item.source?.url ? "noreferrer" : undefined}>Abrir ↗</a><a href={`/trilha?assunto=${encodeURIComponent(item.query)}`}>Criar trilha</a><button onClick={() => removeItem(item.id)}>Remover</button></div></article>)}</section>}
    <footer className="saved-footer">Suas descobertas ficam salvas somente neste dispositivo.</footer>
  </main>;
}
