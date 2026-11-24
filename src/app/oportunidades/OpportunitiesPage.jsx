"use client";

import { useMemo,useState } from "react";
import { OPPORTUNITY_RESOURCES } from "@/lib/mock-data";

const FILTERS=["Tudo","Tecnologia","Carreira","Educação","Administração","Finanças"];

export default function OpportunitiesPage(){
  const [filter,setFilter]=useState("Tudo");
  const [query,setQuery]=useState("");
  const visible=useMemo(()=>OPPORTUNITY_RESOURCES.filter((item)=>{const byFilter=filter==="Tudo"||item.tags.includes(filter);const byQuery=!query||(item.name+" "+item.description+" "+item.tags.join(" ")).toLowerCase().includes(query.toLowerCase());return byFilter&&byQuery;}),[filter,query]);
  return <main className="page-container">
    <section className="page-hero compact-hero opportunities-page-hero"><div><span className="eyebrow">SEU PRÓXIMO PASSO EXISTE</span><h1>Conhecimento abre portas. <span>Vamos encontrar a sua?</span></h1><p>Uma seleção inicial de plataformas para aprender, desenvolver habilidades e conhecer novas possibilidades.</p></div><div className="hero-side-note"><span>◇</span><strong>5 plataformas</strong><small>para continuar sua jornada</small></div></section>
    <section className="opportunity-intro-strip"><span>↗</span><p>As oportunidades são oferecidas por instituições externas. Você pode consultar cada plataforma sem criar uma conta no Trilha Jovem.</p></section>
    <section className="opportunities-directory"><div className="section-heading"><div><span className="eyebrow">COMECE DE GRAÇA</span><h2>Onde aprender agora</h2></div><span className="result-count">{visible.length} de {OPPORTUNITY_RESOURCES.length} opções</span></div>
      <div className="opportunity-search"><span>⌕</span><input value={query} onChange={(event)=>setQuery(event.target.value)} placeholder="Buscar por tema ou plataforma" aria-label="Buscar oportunidades"/></div>
      <div className="chip-row">{FILTERS.map((item)=><button key={item} className={"filter-chip "+(filter===item?"selected":"")} onClick={()=>setFilter(item)} aria-pressed={filter===item}>{item}</button>)}</div>
      {visible.length?<div className="opportunity-grid">{visible.map((item,index)=><article className={"opportunity-card tone-"+item.tone} key={item.name}><div className="opportunity-card-top"><span className="opportunity-mark">{item.mark}</span><span className="opportunity-number">0{index+1}</span></div><span className="category-label">{item.type}</span><h3>{item.name}</h3><p>{item.description}</p><div className="tag-list">{item.tags.map((tag)=><span key={tag}>{tag}</span>)}</div><a href={item.url} target="_blank" rel="noreferrer">Conhecer plataforma <span>↗</span></a></article>)}</div>:<div className="empty-state"><span>⌕</span><h3>Nenhuma plataforma encontrada.</h3><p>Tente buscar por outro tema ou remover o filtro.</p><button className="button button-secondary" onClick={()=>{setFilter("Tudo");setQuery("");}}>Limpar filtros</button></div>}
    </section>
    <p className="prototype-note">Consulte requisitos, disponibilidade, gratuidade, certificados e inscrições diretamente nos sites oficiais. As informações podem mudar.</p>
  </main>;
}
