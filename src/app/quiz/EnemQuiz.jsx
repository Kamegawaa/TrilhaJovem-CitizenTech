"use client";
import { useState } from "react";
import "./quiz.css";
const AREAS = [{value:"mathematics",label:"Matemática"},{value:"human-sciences",label:"Ciências humanas"},{value:"natural-sciences",label:"Ciências da natureza"},{value:"languages",label:"Linguagens"}];
export default function EnemQuiz() {
 const [year,setYear]=useState("2023"),[discipline,setDiscipline]=useState("mathematics"),[language,setLanguage]=useState("english");
 const [questions,setQuestions]=useState([]),[position,setPosition]=useState(0),[selected,setSelected]=useState(""),[feedback,setFeedback]=useState(null),[loading,setLoading]=useState(false),[error,setError]=useState("");
 const question=questions[position];
 async function loadQuestions(event){event?.preventDefault();setLoading(true);setError("");setFeedback(null);setSelected("");setQuestions([]);
  try{const params=new URLSearchParams({year,discipline,limit:"10",offset:"0"});if(discipline==="languages")params.set("language",language);
   const response=await fetch(`/api/quiz/enem?${params}`),data=await response.json();if(!response.ok)throw new Error(data.error||"Não foi possível carregar as questões.");
   setQuestions(data.questions||[]);setPosition(0);if(!data.questions?.length)setError("Não encontramos questões com esses filtros. Tente outra combinação.");
  }catch(err){setError(err.message||"Algo deu errado. Tente novamente.");}finally{setLoading(false);}
 }
 async function submitAnswer(letter){if(!question||feedback)return;setSelected(letter);setLoading(true);
  try{const response=await fetch("/api/quiz/enem/answer",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({year:Number(year),discipline,language:discipline==="languages"?language:undefined,index:question.index,selectedAlternative:letter})});
   const data=await response.json();if(!response.ok)throw new Error(data.error||"Não foi possível corrigir sua resposta.");setFeedback(data);
  }catch(err){setSelected("");setError(err.message||"Não foi possível corrigir sua resposta.");}finally{setLoading(false);}
 }
 function nextQuestion(){setPosition(current=>(current+1)%questions.length);setSelected("");setFeedback(null);setError("");}
 return <main className="quiz-shell">
  <header className="quiz-header"><a className="quiz-brand" href="/">Trilha<span>Jovem</span></a><span className="quiz-tag">UM PASSO DE CADA VEZ</span></header>
  <section className="quiz-intro"><p className="quiz-kicker">DESAFIO ENEM</p><h1>Descubra o que<br/><span>você já sabe.</span></h1><p>Pratique no seu ritmo. Errar também faz parte de aprender.</p></section>
  <form className="quiz-filters" onSubmit={loadQuestions}>
   <label>Ano<select value={year} onChange={e=>setYear(e.target.value)}>{Array.from({length:15},(_,i)=>2023-i).map(value=><option key={value}>{value}</option>)}</select></label>
   <label>Área<select value={discipline} onChange={e=>setDiscipline(e.target.value)}>{AREAS.map(area=><option key={area.value} value={area.value}>{area.label}</option>)}</select></label>
   {discipline==="languages"&&<label>Idioma<select value={language} onChange={e=>setLanguage(e.target.value)}><option value="english">Inglês</option><option value="spanish">Espanhol</option></select></label>}
   <button className="quiz-load" disabled={loading} type="submit">{loading?"Carregando...":"Explorar questões"}</button>
  </form>
  {error&&<p className="quiz-error" role="alert">{error}</p>}
  {question&&<section className="question-card" aria-live="polite">
   <div className="question-meta"><span>ENEM {year}</span><span>QUESTÃO {position+1} DE {questions.length}</span></div>
   <div className="question-progress"><span style={{width:`${((position+1)/questions.length)*100}%`}}/></div>
   <h2>{question.title||`Questão ${question.index}`}</h2>
   {question.context&&<p className="question-context">{question.context}</p>}{question.alternativesIntroduction&&<p className="question-context">{question.alternativesIntroduction}</p>}
   <div className="alternatives">{(question.alternatives||[]).map(option=><button className={`alternative ${selected===option.letter?"is-selected":""}`} key={option.letter} type="button" disabled={loading||Boolean(feedback)} onClick={()=>submitAnswer(option.letter)}><span>{option.letter}</span>{option.text}</button>)}</div>
   {feedback&&<div className={`answer-feedback ${feedback.correct?"is-correct":"is-wrong"}`} role="status"><strong>{feedback.correct?"Boa! Você acertou.":"Tudo bem. Aprender também é tentar."}</strong><p>Alternativa correta: {feedback.correctAlternative}</p><button type="button" onClick={nextQuestion}>Próxima questão <span aria-hidden="true">→</span></button></div>}
  </section>}
  <footer className="quiz-footer"><span>Conhecimento abre caminhos.</span><span>Fonte: API ENEM · enem.dev</span></footer>
 </main>;
}
