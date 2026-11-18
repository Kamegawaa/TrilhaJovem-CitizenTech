# Motion design e performance

## Princípio

Movimento é parte da linguagem do Trilha Jovem, não decoração. A experiência deve ser expressiva e cativante sem competir com o conteúdo ou prejudicar aparelhos modestos.

Tema escuro em toda a aplicação. A identidade usa acentos vivos, formas expressivas e animações intencionais. O player assume uma narrativa cinematográfica, mas os controles permanecem claros e acessíveis.

## Stack candidata

- **Motion for React:** biblioteca principal para transições, gestos, feedback de interação e animações de componentes.
- **GSAP:** somente para sequências editoriais complexas, timelines ou animações especiais que justifiquem seu uso.
- **CSS/WAAPI:** microinterações e transições simples.
- **SVG:** gráficos e formas vetoriais leves.
- **Rive:** opcional em etapa futura, condicionado a verificar custos/licenças de exportação e distribuição.
- **Three.js/React Three Fiber:** fora do escopo do primeiro MVP.

A stack será validada com teste técnico e versões fixadas antes de instalar dependências.

## Níveis de movimento

1. **Microinteração:** toque, seleção, salvar, concluir e feedback.
2. **Navegação:** entrada/saída de páginas e expansão compartilhada de cards.
3. **Descoberta:** entrada de informação, gráficos e elementos que respondem à interação.
4. **Cinematografia:** texto, máscaras, sobreposições e transições sincronizadas com o roteiro.
5. **Jornada pessoal:** progresso e celebrações discretas, sem competição ou pressão.

## Regras de performance

- Priorizar animações de `transform` e `opacity`.
- Evitar animar continuamente propriedades que provocam layout/reflow.
- Iniciar animações quando o elemento estiver próximo da área visível.
- Parar ou suspender animações fora da tela.
- Limitar efeitos simultâneos.
- Não executar vídeos ou canvases em segundo plano sem necessidade.
- Carregar poster antes do vídeo.
- Reproduzir no máximo um vídeo do feed por vez.
- Pausar conteúdo fora da área visível ou quando a página perde foco.
- Carregar recursos progressivamente e usar variantes adequadas à conexão.
- Evitar filtros/blur intensos e partículas contínuas.

## Acessibilidade

- Respeitar `prefers-reduced-motion`.
- Substituir movimentos amplos por transições simples quando necessário.
- Evitar autoplay com áudio.
- Manter controles de reprodução acessíveis.
- Legendas, transcrição e alternativa textual para conteúdo audiovisual.
- Não transmitir informação essencial somente por cor ou animação.

## Metas de qualidade

- Animações devem parecer fluidas em aparelhos compatíveis; 60 FPS é meta, não garantia.
- Core Web Vitals: LCP ≤ 2,5 s, INP ≤ 200 ms e CLS ≤ 0,1 no percentil 75.
- Medir em aparelhos reais, Android de entrada/intermediário e rede móvel.
- Usar Lighthouse e Chrome DevTools; registrar orçamento de bundle e mídia no spike técnico.

## Critério de adoção

Motion é padrão para interações comuns. GSAP só entra quando demonstrar benefício perceptível e mensurável. Não adicionar uma biblioteca para reproduzir efeito simples já resolvido por CSS.
