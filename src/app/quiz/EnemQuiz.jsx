"use client";

import { useMemo,useState } from "react";
import Link from "next/link";
import { DEMO_QUESTIONS } from "@/lib/mock-data";

const AREAS=["Todas","Matemática","Ciências humanas","Ciências da natureza","Linguagens","Tecnologia e criação"];

export default function EnemQuiz(){
  const [area,setArea]=useState("Todas");
  const [started,setStarted]=useState(false);
  const [position,setPosition]=useState(0);
  const [selected,setSelected]=useState("");
  const [answers,setAnswers]=useState([]);
  const [finished,setFinished]=useState(false);
  const questions=useMemo(()=>area==="Todas"?DEMO_QUESTIONS.slice(0,5):DEMO_QUESTIONS.filter((item)=>item.area===area),[area]);
  const question=questions[position];
  const score=answers.filter((answer)=>answer.correct).length;
  function begin(){setStarted(true);setPosition(0);setSelected("");setAnswers([]);setFinished(false);}
  function choose(letter){if(selected||!question)return;setSelected(letter);setAnswers((current)=>[...current,{correct:letter===question.answer,selected:letter,answer:question.answer}]);}
  function next(){if(position+1>=questions.length)setFinished(true);else{setPosition((current)=>current+1);setSelected("");}}
  function restart(){setStarted(false);setPosition(0);setSelected("");setAnswers([]);setFinished(false);}
  return <main className="page-container narrow-page">
    <section className="page-hero compact-hero quiz-page-hero"><div><span className="eyebrow">DESAFIO DE APRENDIZAGEM</span><h1>Aprender também é <span>experimentar.</span></h1><p>Responda, descubra o raciocínio por trás da resposta e avance no seu ritmo.</p></div><div className="hero-side-note"><span>✓</span><strong>6 questões</strong><small>demonstrativas e interativas</small></div></section>
    {!started?<section className="quiz-start-card"><div className="quiz-start-symbol">?</div><span className="eyebrow">ESCOLHA SEU DESAFIO</span><h2>Qual assunto você quer experimentar?</h2><p>Selecione uma área para montar uma sequência curta de perguntas.</p><div className="quiz-area-options">{AREAS.map((item)=><button className={area===item?"selected":""} key={item} onClick={()=>setArea(item)} aria-pressed={area===item}>{item}<span>{area===item?"✓":"＋"}</span></button>)}</div><button className="button button-primary start-quiz-button" onClick={begin} disabled={area!=="Todas"&&!questions.length}>Começar desafio ↗</button></section>
    :finished?<section className="quiz-result-card"><div className="quiz-score-ring" style={{"--score":(questions.length?score/questions.length*100:0)+"%"}}><strong>{score}/{questions.length}</strong></div><span className="eyebrow">DESAFIO CONCLUÍDO</span><h2>{score===questions.length?"Mandou muito bem!":score>0?"Você está construindo seu repertório.":"Todo começo é uma descoberta."}</h2><p>Você acertou {score} de {questions.length} questões. O importante é entender o caminho e continuar praticando.</p><div className="quiz-result-actions"><button className="button button-secondary" onClick={restart}>Escolher outro desafio</button><button className="button button-primary" onClick={begin}>Tentar novamente ↗</button></div><Link className="text-link" href="/trilha?assunto=programação">Continuar aprendendo com uma trilha ↗</Link></section>
    :question?<section className="question-card"><div className="question-header"><div><span className="eyebrow">{question.area.toUpperCase()}</span><h2>Questão {position+1} <span>/ {questions.length}</span></h2></div><span className="difficulty-label">{question.difficulty}</span></div><div className="quiz-progress"><span style={{width:((position+1)/questions.length*100)+"%"}}/></div><p className="question-prompt">{question.prompt}</p><div className="quiz-alternatives">{question.options.map(([letter,text])=>{const isCorrect=Boolean(selected)&&letter===question.answer;const isWrong=selected===letter&&!isCorrect;return <button type="button" key={letter} disabled={Boolean(selected)} className={"quiz-option "+(isCorrect?"correct ":"")+(isWrong?"wrong":"")} onClick={()=>choose(letter)}><span>{letter}</span>{text}{isCorrect&&<b>✓</b>}{isWrong&&<b>×</b>}</button>;})}</div>{selected&&<div className={"quiz-explanation "+(selected===question.answer?"correct":"wrong")}><strong>{selected===question.answer?"Você acertou!":"A alternativa correta é "+question.answer+"."}</strong><p>{question.explanation}</p><button className="button button-primary" onClick={next}>{position+1===questions.length?"Ver resultado":"Próxima questão ↗"}</button></div>}<div className="question-footer"><span>{score} acertos até agora</span><span>Respostas ficam apenas nesta sessão</span></div></section>
    :<div className="empty-state"><h2>Não há questões nesta área ainda.</h2><button className="button button-secondary" onClick={restart}>Escolher outra área</button></div>}
    <p className="prototype-note quiz-disclaimer">As perguntas são exemplos criados para demonstrar a interação do protótipo. Não são questões oficiais do ENEM nem substituem materiais de preparação.</p>
  </main>;
}
