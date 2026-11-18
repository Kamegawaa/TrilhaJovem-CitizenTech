# Roadmap de entregas do MVP

## Fase 0 — Produto e arquitetura

- [x] Público de 18–24 anos e abrangência nacional.
- [x] Guest-first e ausência de publicações de usuários.
- [x] Tema escuro na interface e no player.
- [x] Linguagem audiovisual cinematográfica/edit.
- [x] Pipeline de APIs definido conceitualmente.
- [x] Modelo editorial de feed especificado.
- [x] Jornada de quizzes ENEM especificada.
- [x] Fontes e limitações iniciais documentadas.

## Fase 1 — Prova de integração

- [ ] Consultar endpoints ENEM selecionados e validar respostas reais.
- [ ] Testar questões com mídia ausente e enunciados longos.
- [ ] Importar pequeno lote de questões para ambiente local.
- [ ] Validar gabarito, alternativas, idioma e integridade.
- [ ] Definir schema comum de conteúdo.
- [ ] Testar ao menos uma fonte de outra área (NASA ou OpenAlex).
- [ ] Implementar cache, backoff e controle de rate limit.
- [ ] Documentar licenças dos registros e assets utilizados.

**Critério de aceite:** dois conectores testados, catálogo normalizado e rastreável; o feed não consulta fontes externas diretamente.

## Fase 2 — Design e interação

- [ ] Aprovar mapa de telas.
- [ ] Aprovar tokens visuais e componentes.
- [ ] Definir storyboard e motion guidelines.
- [ ] Definir estados de loading, vazio, erro e offline.
- [ ] Validar reduced-motion e acessibilidade.

**Critério de aceite:** jornada navegável validada antes da integração completa.

## Fase 3 — MVP funcional

- [ ] Feed paginado com mistura editorial.
- [ ] Player com poster, legendas, pausa e carregamento progressivo.
- [ ] Detalhe de descoberta com fonte e referências.
- [ ] Quiz ENEM de 1 questão e miniquiz de 3 questões.
- [ ] Explicações editoriais revisadas.
- [ ] Progresso e favoritos no IndexedDB.
- [ ] Trilhas e oportunidades relacionadas.

**Critério de aceite:** jornada completa sem login, em celular, com rede limitada e fallback de fonte/mídia.

## Fase 4 — Validação e entrega FIAP

- [ ] Testar com pelo menos cinco jovens de 18–24 anos.
- [ ] Avaliar clareza, curiosidade, compreensão e vontade de aprofundar.
- [ ] Lighthouse e testes em aparelhos Android intermediários/de entrada.
- [ ] Revisar acessibilidade e direitos.
- [ ] Medir descobertas, aprofundamento e desafios realizados.
- [ ] Preparar roteiro e vídeo pitch de três minutos.

## Fora do MVP inicial

- Cadastro obrigatório, perfil público, comentários ou rede social.
- Chat de IA em tempo real.
- Recomendador complexo com histórico pessoal no servidor.
- Player 3D ou efeitos pesados contínuos.
- Catálogo nacional de vagas em tempo real sem fonte aberta adequada.
- Publicação em lojas como requisito inicial.
