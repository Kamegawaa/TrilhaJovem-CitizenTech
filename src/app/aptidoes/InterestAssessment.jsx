"use client";

import { useMemo,useState } from "react";
import Link from "next/link";
import { DISCOVERIES } from "@/lib/mock-data";

const QUESTIONS=[
  {q:"Que tipo de pergunta prende sua atenção?",a:[["Como o universo funciona?","Ciências e natureza"],["Por que as pessoas pensam diferente?","Humanas e sociedade"],["Como criar algo que ainda não existe?","Tecnologia e criação"],["Como transformar uma ideia em projeto?","Negócios e gestão"]]},
  {q:"Em um projeto em grupo, qual papel parece mais interessante?",a:[["Investigar, observar e testar hipóteses","Ciências e natureza"],["Ouvir pessoas e entender suas histórias","Humanas e sociedade"],["Construir, programar ou desenhar soluções","Tecnologia e criação"],["Planejar etapas e conectar pessoas","Negócios e gestão"]]},
  {q:"Qual experiência você escolheria para um sábado?",a:[["Visitar um observatório, parque ou laboratório","Ciências e natureza"],["Conhecer uma exposição ou projeto social","Humanas e sociedade"],["Participar de uma oficina maker","Tecnologia e criação"],["Criar uma ideia de negócio ou organizar um evento","Negócios e gestão"]]},
  {q:"O que mais te dá satisfação ao aprender?",a:[["Descobrir padrões e explicar fenômenos","Ciências e natureza"],["Compreender comportamentos e culturas","Humanas e sociedade"],["Fazer uma ideia funcionar na prática","Tecnologia e criação"],["Ver uma iniciativa sair do papel","Negócios e gestão"]]}
];
const DETAILS={
  "Ciências e natureza":{icon:"✦",description:"Suas escolhas mostram curiosidade por investigação, fenômenos naturais e descoberta.",topics:["astronomia","mata-atlantica","energia-renovavel"]},
  "Humanas e sociedade":{icon:"◉",description:"Suas escolhas apontam interesse por pessoas, cultura, comportamento e como a sociedade funciona.",topics:["psicologia","historia-brasil"]},
  "Tecnologia e criação":{icon:"⌘",description:"Você parece gostar de experimentar, construir e resolver desafios com criatividade.",topics:["inteligencia-artificial","programacao"]},
  "Negócios e gestão":{icon:"↗",description:"Suas respostas indicam interesse em transformar ideias em projetos e organizar recursos.",topics:["empreendedorismo","energia-renovavel"]}
};

export default function InterestAssessment(){
  const [answers,setAnswers]=useState({});
  const [step,setStep]=useState(0);
  const [done,setDone]=useState(false);
  const result=useMemo(()=>{const counts={};Object.values(answers).forEach((area)=>{counts[area]=(counts[area]||0)+1;});return Object.entries(counts).sort((a,b)=>b[1]-a[1])[0]?.[0];},[answers]);
  const area=result?DETAILS[result]:null;
  const score=result?Object.values(answers).filter((value)=>value===result).length:0;
  const toneByArea={"Ciências e natureza":"forest","Humanas e sociedade":"coral","Tecnologia e criação":"blue","Negócios e gestão":"amber"};
  const activeArea=done?result:answers[step];
  const activeTone=activeArea?toneByArea[activeArea]:"neutral";
  function choose(value){setAnswers((current)=>({...current,[step]:value}));}
  function next(){if(step<QUESTIONS.length-1)setStep((current)=>current+1);else setDone(true);}
  function restart(){setAnswers({});setStep(0);setDone(false);}

  return <main className={"page-container narrow-page theme-"+activeTone}>
    {!done?<><section className="page-hero compact-hero"><div><span className="eyebrow">UM MAPA, NÃO UM RÓTULO</span><h1>O que desperta <span>sua curiosidade?</span></h1><p>Responda quatro perguntas rápidas e encontre assuntos para explorar. Não existe resposta certa — e você não precisa escolher uma profissão agora.</p></div><div className="hero-side-note"><span>◉</span><strong>4 perguntas</strong><small>menos de 2 minutos</small></div></section>
      <section className="assessment-card"><div className="assessment-progress"><span style={{width:String((step+1)/QUESTIONS.length*100)+"%"}}/></div><div className="assessment-meta"><span>PERGUNTA 0{step+1} DE 0{QUESTIONS.length}</span><span>{Math.round((step+1)/QUESTIONS.length*100)}%</span></div><h2>{QUESTIONS[step].q}</h2><div className="assessment-options">{QUESTIONS[step].a.map(([label,value])=><button type="button" key={value} className={answers[step]===value?"chosen":""} onClick={()=>choose(value)} aria-pressed={answers[step]===value}><span>{answers[step]===value?"✓":"＋"}</span>{label}</button>)}</div><div className="assessment-actions"><button className="button button-secondary" disabled={step===0} onClick={()=>setStep((current)=>current-1)}>Voltar</button><button className="button button-primary" disabled={!answers[step]} onClick={next}>{step===QUESTIONS.length-1?"Ver meu mapa de interesses":"Continuar ↗"}</button></div></section>
    </>:<section className="assessment-result"><span className="eyebrow">SUA PRÓXIMA DESCOBERTA</span><div className="result-icon">{area.icon}</div><h1>Talvez você goste de <span>{result.toLowerCase()}.</span></h1><p>{area.description}</p><div className="result-match"><strong>{score} de 4 respostas</strong><span>se conectaram mais a esta área. Isso é só um ponto de partida.</span></div><h2>Assuntos para experimentar</h2><div className="result-topic-grid">{area.topics.slice(0,3).map((id)=>{const item=DISCOVERIES.find((entry)=>entry.id===id);return item?<Link key={id} href={"/trilha?assunto="+encodeURIComponent(item.query)}><span>{item.symbol}</span><strong>{item.query}</strong><small>Explorar trilha ↗</small></Link>:null;})}</div><p className="disclaimer">Este resultado não é teste vocacional, diagnóstico ou avaliação profissional. Ele resume suas escolhas nesta atividade. Seus interesses podem mudar conforme você experimenta coisas novas.</p><div className="assessment-actions"><button className="button button-secondary" onClick={restart}>Refazer perguntas</button><Link href="/oportunidades" className="button button-primary">Ver oportunidades ↗</Link></div></section>}
  </main>;
}
