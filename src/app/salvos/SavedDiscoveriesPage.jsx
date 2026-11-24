"use client";

import { useEffect,useState } from "react";
import Link from "next/link";
import { DISCOVERIES } from "@/lib/mock-data";

const SAVED_KEY="trilhajovem.saved-discoveries";

export default function SavedDiscoveriesPage(){
  const [items,setItems]=useState([]);
  const [ready,setReady]=useState(false);
  useEffect(()=>{try{const saved=JSON.parse(localStorage.getItem(SAVED_KEY)||"[]");if(Array.isArray(saved))setItems(saved);}catch{}setReady(true);},[]);
  function removeItem(id){setItems((current)=>{const next=current.filter((item)=>item.id!==id);try{localStorage.setItem(SAVED_KEY,JSON.stringify(next));}catch{}return next;});}
  return <main className="page-container">
    <section className="page-hero compact-hero saved-page-hero"><div><span className="eyebrow">SEU REPERTÓRIO</span><h1>Descobertas para <span>revisitar depois.</span></h1><p>Guarde ideias que despertaram sua curiosidade e volte a elas quando quiser.</p></div><div className="hero-side-note"><span>♡</span><strong>{items.length} salvos</strong><small>neste dispositivo</small></div></section>
    {!ready?<div className="empty-state"><p>Carregando suas descobertas...</p></div>:items.length?<section className="saved-content"><div className="section-heading"><div><span className="eyebrow">SUA COLEÇÃO</span><h2>O que chamou sua atenção</h2></div><Link className="text-link" href="/feed">Encontrar mais ↗</Link></div><div className="discovery-grid">{items.map((item,index)=><article className={"discovery-card tone-"+(item.accent||"mint")} key={item.id}><div className="discovery-art"><span className="art-index">0{index+1}</span><span className="art-symbol">{item.symbol||"✦"}</span><span className="art-label">{item.tag||item.category}</span></div><div className="discovery-card-body"><span className="category-label">{item.category}</span><h3>{item.title}</h3><p>{item.summary||item.note}</p><div className="card-actions"><Link className="card-link" href={"/trilha?assunto="+encodeURIComponent(item.query||item.id)}>Continuar explorando ↗</Link><button className="save-button is-saved" onClick={()=>removeItem(item.id)}>Remover ♥</button></div></div></article>)}</div></section>:<section className="empty-state saved-empty-state"><span>♡</span><h2>Sua próxima ideia favorita ainda está por aí.</h2><p>Quando uma descoberta chamar sua atenção, salve para voltar a ela mais tarde.</p><Link className="button button-primary" href="/feed">Explorar descobertas ↗</Link></section>}
    <section className="saved-suggestions"><div className="section-heading"><div><span className="eyebrow">IDEIAS PARA GUARDAR</span><h2>Que tal começar por aqui?</h2></div></div><div className="suggestion-grid">{DISCOVERIES.slice(0,3).map((item)=><Link href={"/trilha?assunto="+encodeURIComponent(item.query)} className="suggestion-card" key={item.id}><span>{item.symbol}</span>{item.query}<b>↗</b></Link>)}</div></section>
    <p className="prototype-note">Suas descobertas salvas ficam apenas neste navegador. Não é necessário criar uma conta.</p>
  </main>;
}
