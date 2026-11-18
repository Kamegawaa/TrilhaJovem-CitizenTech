"use client";

import { useEffect, useMemo, useState } from "react";
import "./feed.css";

const SAVED_KEY = "trilhajovem.saved-discoveries";

const PREFERENCE_KEY = "trilhajovem.feed.interests";
const AREAS = ["Ciências e natureza", "Humanas e sociedade", "Tecnologia e criação", "Negócios e gestão"];
const TOPICS = [
  { query: "astronomia", category: "Ciências e natureza", tag: "UNIVERSO", title: "O universo é muito maior do que parece", note: "Olhe para cima. A próxima descoberta pode estar a milhões de anos-luz.", tone: "cosmos", mark: "✦" },
  { query: "inteligência artificial", category: "Tecnologia e criação", tag: "TECNOLOGIA", title: "Estamos ensinando máquinas a pensar?", note: "Entenda a tecnologia que já está mudando o jeito como vivemos e trabalhamos.", tone: "future", mark: "⌁" },
  { query: "Mata Atlântica", category: "Ciências e natureza", tag: "NATUREZA", title: "Uma floresta inteira tentando respirar", note: "Biodiversidade, equilíbrio e soluções para proteger o lugar onde vivemos.", tone: "earth", mark: "❋" },
  { query: "psicologia", category: "Humanas e sociedade", tag: "COMPORTAMENTO", title: "Por que sua mente faz isso?", note: "Conhecer como pensamos também é uma forma de descobrir quem podemos ser.", tone: "mind", mark: "◌" },
  { query: "empreendedorismo", category: "Negócios e gestão", tag: "IDEIAS E NEGÓCIOS", title: "Como uma ideia vira realidade?", note: "Explore criatividade, iniciativa e caminhos para tirar projetos do papel.", tone: "business", mark: "↗" },
];

export default function FeedPage() {
  const [stories, setStories] = useState([]);
  const [loading, setLoading] = useState(true);
  const [failed, setFailed] = useState(false);
  const [preferences, setPreferences] = useState([]);
  const [preferencesReady, setPreferencesReady] = useState(false);
  const [savedItems, setSavedItems] = useState([]);

  useEffect(() => {
    try {
      const saved = JSON.parse(window.localStorage.getItem(PREFERENCE_KEY) || "[]");
      if (Array.isArray(saved)) setPreferences(saved.filter((item) => AREAS.includes(item)));
    } catch { /* Preferências inválidas são ignoradas. */ }
    try {\n      const savedItems = JSON.parse(window.localStorage.getItem(SAVED_KEY) || "[]");\n      if (Array.isArray(savedItems)) setSavedItems(savedItems);\n    } catch { /* Itens inválidos são ignorados. */ }\n    setPreferencesReady(true);
  }, []);

  useEffect(() => {
    if (!preferencesReady) return;
    try {
      if (preferences.length) window.localStorage.setItem(PREFERENCE_KEY, JSON.stringify(preferences));
      else window.localStorage.removeItem(PREFERENCE_KEY);
    } catch { /* O feed continua funcionando sem armazenamento local. */ }
  }, [preferences, preferencesReady]);

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

  useEffect(() => {\n    if (!preferencesReady) return;\n    try { window.localStorage.setItem(SAVED_KEY, JSON.stringify(savedItems)); }\n    catch { /* Favoritos continuam disponíveis durante a sessão. */ }\n  }, [savedItems, preferencesReady]);\n\n  const visibleStories = useMemo(
    () => preferences.length ? stories.filter((story) => preferences.includes(story.category)) : stories,
    [preferences, stories],
  );

  function toggleSaved(story, source) {\n    const id = source?.url || story.query;\n    setSavedItems((current) => current.some((item) => item.id === id)\n      ? current.filter((item) => item.id !== id)\n      : [...current, { id, query: story.query, category: story.category, tag: story.tag, title: story.title, note: story.note, source: source || null }]);\n  }\n\n  function togglePreference(area) {
    setPreferences((current) => current.includes(area)
      ? current.filter((item) => item !== area)
      : [...current, area]);
  }

  return (
    <main className="feed-shell">
      <header className="feed-topbar">
        <a className="feed-logo" href="/">Trilha<span>Jovem</span></a>
        <nav><a href="/descobrir">Pesquisar</a><a href="/aptidoes">Meus interesses</a><a href="/salvos">Salvos ({savedItems.length})</a><a href="/oportunidades">Cursos gratuitos</a><a href="/quiz">Quiz ENEM ↗</a></nav>
      </header>
      <section className="feed-intro">
        <p className="feed-overline">UM MUNDO DE POSSIBILIDADES</p>
        <h1>Hoje você pode<br/><span>descobrir algo novo.</span></h1>
        <p>Histórias, ideias e conhecimentos para alimentar sua curiosidade.</p>
      </section>
      <section className="feed-personalize" aria-label="Personalizar assuntos do feed">
        <div className="feed-personalize-heading">
          <div><span className="feed-overline">SEU FEED, SEUS INTERESSES</span><p>Escolha assuntos para destacar no seu feed.</p></div>
          {preferences.length > 0 && <button className="feed-clear" onClick={() => setPreferences([])}>Mostrar tudo</button>}
        </div>
        <div className="feed-preference-list">
          {AREAS.map((area) => <button key={area} type="button" className={preferences.includes(area) ? "feed-preference selected" : "feed-preference"} aria-pressed={preferences.includes(area)} onClick={() => togglePreference(area)}>{preferences.includes(area) ? "✓" : "+"} {area}</button>)}
        </div>
        <small>{preferences.length ? `${preferences.length} área(s) selecionada(s). Preferências salvas somente neste dispositivo.` : "Todas as áreas estão aparecendo. Suas escolhas ficam salvas somente neste dispositivo."}</small>
      </section>
      <section className="feed-stories" aria-label="Feed de descobertas" aria-live="polite">
        {loading && <p className="feed-message">Preparando suas descobertas...</p>}
        {failed && <div className="feed-message" role="alert">Não conseguimos carregar o feed agora. <button onClick={() => window.location.reload()}>Tentar novamente</button></div>}
        {!loading && !failed && visibleStories.length === 0 && <p className="feed-message">Ainda não há descobertas para essas áreas. Selecione outra área ou mostre tudo.</p>}
        {!loading && !failed && visibleStories.map((story, index) => {
          const source = story.results[0];
          return (
            <article className={`story-card story-${story.tone}`} key={story.query}>
              <div className="story-art" aria-hidden="true">{source?.imageUrl && <img className="story-image" src={source.imageUrl} alt="" loading="lazy"/>}<span className="story-orbit orbit-one"/><span className="story-orbit orbit-two"/><span className="story-symbol">{story.mark}</span><span className="story-index">0{index + 1} / 0{visibleStories.length}</span></div>
              <div className="story-copy">
                <span className="story-tag">{story.tag}</span>
                <h2>{story.title}</h2>
                <p>{story.note}</p>
                <a className="story-link" href={`/trilha?assunto=${encodeURIComponent(story.query)}`}>Começar minha trilha <span>↗</span></a>\n                <button type="button" className="story-save" aria-pressed={savedItems.some((item) => item.id === (source?.url || story.query))} onClick={() => toggleSaved(story, source)}>{savedItems.some((item) => item.id === (source?.url || story.query)) ? "✓ Salvo" : "+ Salvar descoberta"}</button>
                {source && <a className="story-source-link" href={source.url} target="_blank" rel="noreferrer">Ver referência: {source.title} ↗</a>}
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
