"use client";

import { useEffect, useState } from "react";
import "./feed.css";

const TOPICS = [
  { query: "astronomia", tag: "UNIVERSO", title: "O universo é muito maior do que parece", note: "Olhe para cima. A próxima descoberta pode estar a milhões de anos-luz.", tone: "cosmos", mark: "✦" },
  { query: "inteligência artificial", tag: "TECNOLOGIA", title: "Estamos ensinando máquinas a pensar?", note: "Entenda a tecnologia que já está mudando o jeito como vivemos e trabalhamos.", tone: "future", mark: "⌁" },
  { query: "Mata Atlântica", tag: "NATUREZA", title: "Uma floresta inteira tentando respirar", note: "Biodiversidade, equilíbrio e soluções para proteger o lugar onde vivemos.", tone: "earth", mark: "❋" },
  { query: "psicologia", tag: "COMPORTAMENTO", title: "Por que sua mente faz isso?", note: "Conhecer como pensamos também é uma forma de descobrir quem podemos ser.", tone: "mind", mark: "◌" },
];

export default function FeedPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    let active = true;
    Promise.all(TOPICS.map(async (topic) => {
      const response = await fetch(`/api/discover/search?q=${encodeURIComponent(topic.query)}`);
      if (!response.ok) throw new Error("Feed indisponível");
      const data = await response.json();
      return { ...topic, results: data.results || [] };
    }))
      .then((items) => { if (active) setStories(items); })
      .catch(() => { if (active) setFailed(true); })
      .finally(() => { if (active) setLoading(false); });
    return () => { active = false; };
  }, []);

  return (
    <main className="feed-shell">
      <header className="feed-topbar">
        <a className="feed-logo" href="/">Trilha<span>Jovem</span></a>
        <nav><a href="/descobrir">Pesquisar</a><a href="/quiz">Quiz ENEM ↗</a></nav>
      </header>
      <section className="feed-intro">
        <p className="feed-overline">UM MUNDO DE POSSIBILIDADES</p>
        <h1>Hoje você pode<br/><span>descobrir algo novo.</span></h1>
        <p>Histórias, ideias e conhecimentos para alimentar sua curiosidade.</p>
      </section>
      <section className="feed-stories" aria-label="Feed de descobertas">
        {loading && <p className="feed-message">Preparando suas descobertas...</p>}
        {failed && <div className="feed-message" role="alert">Não conseguimos carregar o feed agora. <button onClick={() => window.location.reload()}>Tentar novamente</button></div>}
        {!loading && !failed && stories.map((story, index) => {
          const source = story.results[0];
          return (
            <article className={`story-card story-${story.tone}`} key={story.query}>
              <div className="story-art" aria-hidden="true">{source?.imageUrl && <img className="story-image" src={source.imageUrl} alt="" loading="lazy"/>}<span className="story-orbit orbit-one"/><span className="story-orbit orbit-two"/><span className="story-symbol">{story.mark}</span><span className="story-index">0{index + 1} / 0{TOPICS.length}</span></div>
              <div className="story-copy">
                <span className="story-tag">{story.tag}</span>
                <h2>{story.title}</h2>
                <p>{story.note}</p>
                {<a className="story-link" href={`/trilha?assunto=${encodeURIComponent(story.query)}`}>Começar minha trilha <span>↗</span></a>}{source && <a className="story-source-link" href={source.url} target="_blank" rel="noreferrer">Ver referência: {source.title} ↗</a>}
                <small>{source ? `Referência: ${source.source} · ${source.title}` : "Explore fontes abertas de conhecimento"}</small>
              </div>
            </article>
          );
        })}
      </section>
      <footer className="feed-footer"><span>Da curiosidade à oportunidade.</span><span>Conteúdo referenciado em fontes abertas</span></footer>
    </main>
  );
}
