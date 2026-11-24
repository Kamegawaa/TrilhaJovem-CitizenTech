import Link from "next/link";
import { DISCOVERIES } from "@/lib/mock-data";

export default function HomePage() {
  const featured = DISCOVERIES.slice(0, 3);
  return (
    <main className="page-container home-page">
      <section className="home-hero">
        <div className="home-hero-copy">
          <span className="eyebrow"><span className="eyebrow-dot" /> CURIOSIDADE ABRE CAMINHOS</span>
          <h1>Seu próximo caminho começa com <span>uma pergunta.</span></h1>
          <p>Um lugar para descobrir assuntos novos, experimentar possibilidades e transformar curiosidade em conhecimento.</p>
          <div className="hero-actions"><Link className="button button-primary" href="/feed">Explorar descobertas <span>↗</span></Link><Link className="button button-secondary" href="/aptidoes">Descobrir meus interesses</Link></div>
          <div className="hero-proof"><span>✦</span> Sem pressão para escolher um caminho para sempre.</div>
        </div>
        <div className="home-visual" aria-label="Ilustração abstrata de caminhos e possibilidades"><div className="visual-orbit orbit-a"/><div className="visual-orbit orbit-b"/><div className="visual-core"><span>t.</span></div><div className="visual-float float-one"><small>01 / descobrir</small><strong>O que desperta<br/>sua curiosidade?</strong></div><div className="visual-float float-two"><small>02 / experimentar</small><strong>Explore sem<br/>precisar decidir.</strong></div><span className="visual-star star-one">✳</span><span className="visual-star star-two">✦</span></div>
      </section>
      <section className="quick-stats"><div><strong>18–24</strong><span>feito para jovens</span></div><div><strong>4 áreas</strong><span>para começar a explorar</span></div><div><strong>0 cadastro</strong><span>você começa agora</span></div></section>
      <section className="section-block"><div className="section-heading"><div><span className="eyebrow">UM PONTO DE PARTIDA</span><h2>Uma curiosidade pode mudar o rumo do dia.</h2></div><Link className="text-link" href="/feed">Ver todas as descobertas ↗</Link></div>
        <div className="discovery-grid home-discovery-grid">{featured.map((item,index)=><article className={"discovery-card tone-"+item.accent} key={item.id}><div className="discovery-art"><span className="art-index">0{index+1}</span><span className="art-symbol">{item.symbol}</span><span className="art-label">{item.tag}</span></div><div className="discovery-card-body"><span className="category-label">{item.category}</span><h3>{item.title}</h3><p>{item.summary}</p><Link href={"/trilha?assunto="+encodeURIComponent(item.query)} className="card-link">Explorar esta trilha ↗</Link></div></article>)}</div>
      </section>
      <section className="journey-panel"><div><span className="eyebrow">SUA JORNADA, NO SEU TEMPO</span><h2>Não precisa saber onde vai chegar. Só precisa começar.</h2><p>O Trilha Jovem conecta pequenas descobertas a experiências de aprendizagem e oportunidades reais.</p></div><div className="journey-steps"><Link href="/descobrir"><span>01</span><strong>Descubra</strong><small>Encontre assuntos novos.</small><b>↗</b></Link><Link href="/aptidoes"><span>02</span><strong>Reconheça</strong><small>Perceba o que te interessa.</small><b>↗</b></Link><Link href="/trilha?assunto=astronomia"><span>03</span><strong>Aprofunde</strong><small>Aprenda por etapas.</small><b>↗</b></Link><Link href="/oportunidades"><span>04</span><strong>Experimente</strong><small>Encontre onde continuar.</small><b>↗</b></Link></div></section>
    </main>
  );
}
