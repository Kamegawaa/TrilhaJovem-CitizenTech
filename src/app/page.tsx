export default function HomePage() {
  return (
    <main className="shell">
      <section className="intro" aria-labelledby="app-title">
        <span className="eyebrow">CURIOSIDADE ABRE CAMINHOS</span>
        <h1 id="app-title">Trilha<span>Jovem</span></h1>
        <p className="lead">O mundo é maior do que te contaram.</p>
        <p className="supporting">
          Um lugar para descobrir assuntos novos, experimentar possibilidades
          e transformar curiosidade em conhecimento.
        </p>
        <div className="home-actions"><a href="/descobrir">Explorar conhecimentos ↗</a><a href="/quiz">Experimentar o quiz ↗</a></div>
        <div className="status" role="status">
          <span className="status-dot" aria-hidden="true" />
          Estamos preparando sua próxima descoberta.
        </div>
      </section>
      <footer>
        <span>Da curiosidade à oportunidade.</span>
        <span>Brasil · 18–24</span>
      </footer>
    </main>
  );
}
