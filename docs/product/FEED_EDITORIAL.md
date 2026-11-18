# Feed editorial: conteúdo, apresentação e descoberta

## Princípio

O feed deve parecer uma sequência de descobertas, não uma lista de artigos ou uma sala de aula. A experiência visual é escura e acolhedora, com acentos coloridos, movimento intencional e linguagem jovem. O player também é escuro, mas assume uma atmosfera audiovisual cinematográfica.

O conteúdo de entrada será audiovisual curto no estilo cinematic edit. O feed também alterna formatos não audiovisuais para evitar monotonia e permitir acesso em redes lentas.

## Formatos editoriais

| Formato | Função | Exemplo |
|---|---|---|
| `CINEMATIC_EDIT` | Gancho audiovisual imersivo | Como uma estrela morre? |
| `DISCOVERY` | Curiosidade editorial curta | Por que o céu muda de cor? |
| `DEEP_DIVE` | Explicação aprofundada | Como funciona a fotossíntese? |
| `QUICK_CHALLENGE` | Pergunta ou atividade rápida | Desafio de lógica ou questão ENEM |
| `EXPERIMENT` | Experiência segura e prática | Experimento de luz e sombra |
| `CAREER_STORY` | Apresenta áreas e profissões | O que faz um oceanógrafo? |
| `LEARNING_PATH` | Encadeia estudo progressivo | Introdução à biologia marinha |
| `OPPORTUNITY` | Curso, instituição ou programa | Curso aberto de programação |

## Estrutura do cinematic edit

1. **Hook:** pergunta ou frase curta nos primeiros segundos.
2. **Contexto:** apresenta fenômeno, pessoa, descoberta ou problema.
3. **Revelação:** entrega a ideia central com linguagem simples.
4. **Visualização:** imagem, comparação, gráfico, simulação ou dado.
5. **Conexão:** mostra por que importa e que outras áreas se relacionam.
6. **Próximo passo:** convite para explorar, responder, experimentar ou aprofundar.

O ritmo não pode sacrificar compreensão. Evitar cortes sem função, excesso de texto e estímulos visuais permanentes.

## Estrutura de dados do conteúdo

Campos mínimos:

- Identidade: `id`, `slug`, `format`, `title`, `hook`, `summary`.
- Classificação: `category`, `subcategories`, `tags`, `language`.
- Mídia: `cover_asset`, `media_asset`, `duration_seconds`, `captions`, `transcript`, `alt_text`.
- Fonte: `source_name`, `source_url`, `source_record_id`, `retrieved_at`.
- Direitos: `asset_creator`, `asset_license`, `attribution_text`, `usage_status`.
- Editorial: `editorial_status`, `fact_checked_at`, `reviewer_notes`.
- Relações: `related_content_ids`, `related_track_ids`, `related_opportunity_ids`.

O sistema distingue dados fornecidos pela fonte de textos e classificações adicionados pelo time editorial.

## Apresentação do card

- Imagem ou composição visual como foco.
- Categoria identificável sem competir com o título.
- Pergunta ou chamada curta e curiosa.
- Duração ou tipo de experiência.
- Ação evidente: assistir, explorar ou experimentar.
- Contraste e área de toque adequados.

Alternar cards cinematográficos, descobertas compactas, desafios e oportunidades. Não repetir a mesma composição indefinidamente.

## Composição inicial do feed

Hipótese para teste, não regra definitiva:

- 60% assuntos que o usuário demonstrou interesse;
- 25% assuntos relacionados que ampliam repertório;
- 15% descobertas inesperadas de outras áreas.

A proporção será avaliada em testes com jovens. Não otimizar apenas por tempo de tela; observar exploração, salvamento, conclusão de desafios e aprofundamento. Não utilizar rankings públicos ou streaks punitivos.

## Continuidade entre conteúdo e aprendizagem

Cada conteúdo pode relacionar:

- um vídeo ou descoberta;
- uma explicação mais completa;
- um quiz ou desafio;
- uma trilha de aprofundamento;
- cursos e oportunidades relacionadas.

A relação precisa ser editorialmente válida, não apenas uma recomendação automática por palavras-chave.

## Performance do feed

- Mostrar poster antes de inicializar vídeo.
- Carregar vídeo próximo à área visível.
- Reproduzir no máximo um vídeo por vez.
- Pausar fora da área visível ou quando a página perde foco.
- Preparar no máximo o próximo item elegível.
- Escolher resolução conforme conexão e aparelho.
- Oferecer alternativa de imagem e texto.
- Não animar dezenas de elementos fora da tela.

## Confiança e acessibilidade

Legendas devem estar disponíveis; o conteúdo essencial precisa fazer sentido sem áudio. Oferecer transcrição e texto alternativo. Mostrar fonte e data em local acessível. Diferenciar fato da fonte, interpretação editorial e provocação narrativa.
