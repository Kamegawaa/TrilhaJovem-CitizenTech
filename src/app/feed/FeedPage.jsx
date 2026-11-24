"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { DISCOVERIES, INTEREST_AREAS } from "@/lib/mock-data";

const SAVED_KEY = "trilhajovem.saved-discoveries";
const PREFERENCE_KEY = "trilhajovem.feed.interests";

export default function FeedPage() {
  const [preferences,setPreferences] = useState([]);
  const [savedItems,setSavedItems] = useState([]);
  const [ready,setReady] = useState(false);

  useEffect(() => {
    try {
      const savedPrefs = JSON.parse(localStorage.getItem(PREFERENCE_KEY) || "[]");
      if (Array.isArray(savedPrefs)) setPreferences(savedPrefs.filter((item) => INTEREST_AREAS.includes(item)));
    } catch {}
    try {
      const saved = JSON.parse(localStorage.getItem(SAVED_KEY) || "[]");
      if (Array.isArray(saved)) setSavedItems(saved);
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      if (preferences.length) localStorage.setItem(PREFERENCE_KEY,JSON.stringify(preferences));
      else localStorage.removeItem(PREFERENCE_KEY);
    } catch {}
  },[preferences,ready]);

  const visible = useMemo(() => preferences.length ? DISCOVERIES.filter((item) => preferences.includes(item.category)) : DISCOVERIES,[preferences]);

  function toggleSaved(item) {
    setSavedItems((current) => {
      const exists = current.some((saved) => saved.id === item.id);
      const next = exists ? current.filter((saved) => saved.id !== item.id) : [...current,item];
      try { localStorage.setItem(SAVED_KEY,JSON.stringify(next)); } catch {}
      return next;
    });
  }
  function togglePreference(area) {
    setPreferences((current) => current.includes(area) ? current.filter((value) => value !== area) : [...current,area]);
  }

  return (
    <main className="page-container">
      <section className="page-hero compact-hero"><div><span className="eyebrow">UM MUNDO DE POSSIBILIDADES</span><h1>Hoje você pode descobrir <span>algo novo.</span></h1><p>Ideias, perguntas e conhecimentos para alimentar sua curiosidade. Escolha um assunto e siga por onde ele te levar.</p></div><div className="hero-side-note"><span>✦</span><strong>{DISCOVERIES.length} caminhos</strong><small>para começar a explorar</small></div></section>
      <section className="filter-panel"><div className="filter-heading"><div><span className="eyebrow">SEU FEED, SEUS INTERESSES</span><p>Escolha áreas para destacar assuntos que combinam com sua curiosidade.</p></div>{preferences.length>0&&<button className="quiet-button" onClick={()=>setPreferences([])}>Mostrar tudo</button>}</div><div className="chip-row">{INTEREST_AREAS.map((area)=><button type="button" key={area} className={"filter-chip "+(preferences.includes(area)?"selected":"")} onClick={()=>togglePreference(area)} aria-pressed={preferences.includes(area)}>{preferences.includes(area)?"✓":"+"} {area}</button>)}</div><small>{preferences.length?"Seu feed está personalizado. Você pode mudar essas escolhas quando quiser.":"Todas as áreas estão aparecendo. Suas escolhas ficam salvas somente neste dispositivo."}</small></section>
      <div className="section-heading feed-section-heading"><div><span className="eyebrow">ESCOLHA POR ONDE COMEÇAR</span><h2>{preferences.length?"Assuntos em destaque para você":"Descobertas em destaque"}</h2></div><span className="result-count">{visible.length} assuntos</span></div>
      <section className="discovery-grid">{visible.map((item,index)=>{const saved=savedItems.some((entry)=>entry.id===item.id);return <article className={"discovery-card tone-"+item.accent} key={item.id}><div className="discovery-art"><span className="art-index">0{index+1}</span><span className="art-symbol">{item.symbol}</span><span className="art-label">{item.tag}</span></div><div className="discovery-card-body"><div className="card-meta"><span className="category-label">{item.category}</span><span>{item.readTime}</span></div><h3>{item.title}</h3><p>{item.summary}</p><div className="card-actions"><Link href={"/trilha?assunto="+encodeURIComponent(item.query)} className="card-link">Começar trilha ↗</Link><button className={"save-button "+(saved?"is-saved":"")} type="button" onClick={()=>toggleSaved(item)} aria-pressed={saved}>{saved?"♥ Salvo":"♡ Salvar"}</button></div><a className="source-inline" href={item.source.url} target="_blank" rel="noreferrer">Fonte para continuar: {item.source.name} ↗</a></div></article>;})}</section>
      <div className="end-note"><span>✳</span><p>Não existe uma ordem certa. Explore assuntos diferentes e descubra o que faz sentido para você.</p><Link href="/descobrir">Pesquisar outro assunto ↗</Link></div>
    </main>
  );
}
