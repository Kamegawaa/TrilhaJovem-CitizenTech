"use client";
import { useState } from "react";
import "./discover.css";
const SUGGESTIONS=["Astronomia","Inteligência artificial","Mata Atlântica","Psicologia","Energia renovável","História do Brasil"];
export default function DiscoverPage(){
 const [query,setQuery]=useState(""),[results,setResults]=useState([]),[loading,setLoading]=useState(false),[error,setError]=useState("");
 async function search(term=query,event){event?.preventDefault();const value=term.trim();if(value.length<2){setError("Digite pelo menos duas letras para começar.");return;}setQuery(value);setLoading(true);setError("");
  try{const response=await fetch(`/api/discover/search?q=${encodeURIComponent(value)}`),data=await response.json();if(!response.ok)throw new Error(data.error||"Não foi possível buscar agora.");setResults(data.results||[]);if(!data.results?.length)setError("Ainda não encontramos resultados. Experimente outro assunto.");}
  catch(err){setError(err.message||"Algo deu errado. Tente novamente.");}finally{setLoading(false);}
 }
 return <main className="discover-shell">
  <header className="discover-header"><a className="discover-brand" href="/">Trilha<span>Jovem</span></a><a href="/quiz">Desafio ENEM ↗</a></header>
  <section className="discover-hero"><p className="discover-kicker">SEU PRÓXIMO ASSUNTO FAVORITO</p><h1>O que desperta<br/><span>sua curiosidade?</span></h1><p>Comece com uma pergunta. Termine descobrindo um mundo inteiro.</p>
   <form className="discover-search" onSubmit={event=>search(query,event)}><input aria-label="Assunto para pesquisar" placeholder="Experimente: como nascem as estrelas?" value={query} onChange={event=>setQuery(event.target.value)} maxLength={100}/><button disabled={loading}>{loading?"Buscando...":"Descobrir ↗"}</button></form>
  </section>
  {!results.length&&<section className="discover-suggestions"><h2>Por onde começar?</h2><div>{SUGGESTIONS.map(item=><button key={item} onClick={()=>search(item)} disabled={loading}>{item}<span>↗</span></button>)}</div></section>}
  {error&&<p className="discover-error" role="alert">{error}</p>}
  {results.length>0&&<section className="discover-results"><div className="discover-results-head"><h2>Encontramos caminhos para você.</h2><button onClick={()=>{setResults([]);setQuery("");setError("");}}>Nova busca</button></div><div className="discover-grid">{results.map((item,index)=><article className="discover-card" key={item.id}><span className="discover-number">{String(index+1).padStart(2,"0")}</span><h3>{item.title}</h3>{item.description&&<p className="discover-description">{item.description}</p>}<p className="discover-excerpt">{item.excerpt||"Explore este assunto e descubra novas conexões."}</p><a href={item.url} target="_blank" rel="noreferrer">Explorar conteúdo <span>↗</span></a><small>{item.source}</small></article>)}</div></section>}
  <footer className="discover-footer"><span>Curiosidade é o começo de qualquer caminho.</span><span>Conteúdo de referência · Wikimedia</span></footer>
 </main>;
}
