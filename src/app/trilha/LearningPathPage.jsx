"use client";

import { useEffect,useMemo,useState } from "react";
import Link from "next/link";
import { DISCOVERIES,findDiscovery } from "@/lib/mock-data";

const STEPS=[
  {title:"Desperte a curiosidade",description:"Comece pelo panorama geral. Descubra conceitos, palavras-chave e perguntas que movem esse assunto.",action:"Observar e perguntar"},
  {title:"Faça conexões",description:"Relacione o tema com outras áreas, situações do cotidiano e questões que importam para você.",action:"Conectar ideias"},
  {title:"Vá mais fundo",description:"Explore referências, compare perspectivas e escolha um próximo passo para continuar aprendendo.",action:"Aprofundar"}
];
const PROGRESS_KEY="trilhajovem.path-progress";

export default function LearningPathPage() {
  const [topic,setTopic]=useState("astronomia");
  const [completed,setCompleted]=useState([]);
  const discovery=useMemo(()=>findDiscovery(topic),[topic]);

  useEffect(()=>{const initial=new URLSearchParams(window.location.search).get("assunto");if(initial)setTopic(initial);},[]);
  useEffect(()=>{try{const all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||"{}");setCompleted(Array.isArray(all[discovery.id])?all[discovery.id]:[]);}catch{setCompleted([]);}},[discovery.id]);

  function toggleStep(index){
    setCompleted((current)=>{const next=current.includes(index)?current.filter((item)=>item!==index):[...current,index];let all={};try{all=JSON.parse(localStorage.getItem(PROGRESS_KEY)||"{}");}catch{}all[discovery.id]=next;try{localStorage.setItem(PROGRESS_KEY,JSON.stringify(all));}catch{}return next;});
  }
  function selectTopic(value){setTopic(value);window.history.replaceState({},"","/trilha?assunto="+encodeURIComponent(value));}
  const progress=Math.round(completed.length/3*100);

  return (
    <main className={"page-container theme-"+discovery.accent}>
      <section className="page-hero path-page-hero"><div><span className="eyebrow">DA CURIOSIDADE AO CONHECIMENTO</span><h1>Uma descoberta pode abrir <span>muitos caminhos.</span></h1><p>Escolha um tema e avance no seu ritmo. A trilha é um ponto de partida — você decide até onde quer chegar.</p></div><div className="path-progress-card"><div className="progress-ring" style={{"--progress":String(progress)+"%"}}><strong>{progress}%</strong></div><span>SEU PROGRESSO</span><small>{completed.length} de 3 etapas concluídas</small></div></section>
      <section className="topic-picker"><div><span className="eyebrow">ESCOLHA UM TEMA</span><h2>Qual assunto vamos explorar?</h2></div><div className="topic-select-row"><select value={discovery.id} onChange={(event)=>selectTopic(event.target.value)} aria-label="Selecionar assunto">{DISCOVERIES.map((item)=><option key={item.id} value={item.id}>{item.query}</option>)}</select><span>⌄</span></div></section>
      <section className="path-feature-card"><div className={"path-feature-art tone-"+discovery.accent}><span>{discovery.symbol}</span><small>{discovery.tag}</small></div><div className="path-feature-copy"><span className="category-label">{discovery.category} · {discovery.readTime}</span><h2>{discovery.title}</h2><p>{discovery.summary}</p><div className="path-question"><small>PERGUNTA-GUIA</small><strong>{discovery.question}</strong></div></div></section>
      <section className="path-steps-section"><div className="section-heading"><div><span className="eyebrow">UM PASSO DE CADA VEZ</span><h2>Seu caminho de aprendizagem</h2></div><span className="result-count">{completed.length}/3 concluídas</span></div><div className="path-step-list">{STEPS.map((step,index)=><article className={"path-step "+(completed.includes(index)?"complete":"")} key={step.title}><button className="step-check" onClick={()=>toggleStep(index)} aria-pressed={completed.includes(index)} aria-label={completed.includes(index)?"Marcar "+step.title+" como não concluída":"Marcar "+step.title+" como concluída"}>{completed.includes(index)?"✓":"0"+(index+1)}</button><div className="path-step-copy"><span>{step.action}</span><h3>{step.title}</h3><p>{step.description}</p></div><span className="step-status">{completed.includes(index)?"Concluída":"Etapa sugerida"}</span></article>)}</div></section>
      <section className="resources-section"><div className="section-heading"><div><span className="eyebrow">REFERÊNCIAS PARA CONTINUAR</span><h2>Explore mais sobre {discovery.query}</h2></div><a className="text-link" href={discovery.source.url} target="_blank" rel="noreferrer">Fonte principal ↗</a></div><div className="resource-grid">{discovery.resources.map((resource,index)=><article className="resource-card" key={resource.title}><span>0{index+1} / {resource.kind}</span><h3>{resource.title}</h3><p>{resource.description}</p><a href={resource.url} target="_blank" rel="noreferrer">Abrir referência ↗</a></article>)}</div></section>
      <section className="next-step-banner"><div><span className="eyebrow">QUANDO QUISER IR ALÉM</span><h2>Curiosidade também vira oportunidade.</h2><p>Conheça plataformas para continuar aprendendo e experimentar novas possibilidades.</p></div><Link className="button button-primary" href="/oportunidades">Encontrar oportunidades ↗</Link></section>
      <p className="prototype-note">Seu progresso é salvo somente neste navegador. As trilhas e atividades são sugestões demonstrativas de aprendizagem.</p>
    </main>
  );
}
