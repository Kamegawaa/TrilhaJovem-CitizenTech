"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { INTEREST_AREAS, searchDiscoveries } from "@/lib/mock-data";

const SUGGESTIONS=["Astronomia","Inteligência artificial","Mata Atlântica","Psicologia","Energia renovável","História do Brasil"];

export default function DiscoverPage() {
  const [query,setQuery]=useState("");
  const [submitted,setSubmitted]=useState("");
  const [area,setArea]=useState("Todas");
  const results=useMemo(()=>{const filtered=searchDiscoveries(submitted);return area==="Todas"?filtered:filtered.filter((item)=>item.category===area);},[submitted,area]);
  function search(value=query){setQuery(value);setSubmitted(value.trim());}

  return (
    <main className="page-container">
      <section className="page-hero discover-page-hero"><div><span className="eyebrow">SEU PRÓXIMO ASSUNTO FAVORITO</span><h1>O que desperta <span>sua curiosidade?</span></h1><p>Comece com uma pergunta. Encontre referências. Descubra conexões que você ainda não imaginava.</p></div><div className="hero-side-note discover-side-note"><span>⌕</span><strong>Curiosidade em primeiro lugar</strong><small>Pesquise por um tema ou escolha uma sugestão.</small></div></section>
      <form className="search-panel" onSubmit={(event)=>{event.preventDefault();search();}}><span aria-hidden="true">⌕</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Ex.: como nascem as estrelas?" aria-label="Pesquisar assunto" maxLength={100}/><button className="button button-primary" type="submit">Encontrar caminhos ↗</button></form>
      {!submitted&&<section className="suggestion-section"><div className="section-heading"><div><span className="eyebrow">PARA ACENDER A IDEIA</span><h2>Por onde começar?</h2></div></div><div className="suggestion-grid">{SUGGESTIONS.map((item)=><button key={item} className="suggestion-card" onClick={()=>search(item)}><span>✦</span>{item}<b>↗</b></button>)}</div></section>}
      <section className="results-section"><div className="section-heading"><div><span className="eyebrow">{submitted?"RESULTADOS DA PESQUISA":"CATÁLOGO DE DESCOBERTAS"}</span><h2>{submitted?"Caminhos para “"+submitted+"”":"Assuntos para explorar"}</h2></div><span className="result-count">{results.length} resultados</span></div>
        <div className="chip-row category-filter"><button className={"filter-chip "+(area==="Todas"?"selected":"")} onClick={()=>setArea("Todas")}>Todas as áreas</button>{INTEREST_AREAS.map((value)=><button className={"filter-chip "+(area===value?"selected":"")} key={value} onClick={()=>setArea(value)}>{value}</button>)}</div>
        {results.length?<div className="discovery-grid">{results.map((item,index)=><article className={"discovery-card tone-"+item.accent} key={item.id}><div className="discovery-art"><span className="art-index">0{index+1}</span><span className="art-symbol">{item.symbol}</span><span className="art-label">{item.tag}</span></div><div className="discovery-card-body"><span className="category-label">{item.category}</span><h3>{item.title}</h3><p>{item.summary}</p><p className="discovery-question">“{item.question}”</p><Link href={"/trilha?assunto="+encodeURIComponent(item.query)} className="card-link">Transformar em trilha ↗</Link><a className="source-inline" href={item.source.url} target="_blank" rel="noreferrer">Fonte: {item.source.name} ↗</a></div></article>)}</div>:<div className="empty-state"><span>⌕</span><h3>Nenhum assunto encontrado com esse filtro.</h3><p>Tente outra palavra ou limpe a pesquisa para explorar todas as sugestões.</p><button className="button button-secondary" onClick={()=>{setSubmitted("");setQuery("");setArea("Todas");}}>Ver todas as descobertas</button></div>}
      </section>
      <p className="prototype-note">O catálogo é demonstrativo e reúne temas de exemplo com links para fontes de referência externas.</p>
    </main>
  );
}
