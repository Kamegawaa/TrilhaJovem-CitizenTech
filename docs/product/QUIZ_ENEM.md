# Quizzes rápidos com questões do ENEM

## 1. Fonte e limites

A integração candidata é a API comunitária ENEM (`api.enem.dev`), não uma API oficial do INEP. O projeto documenta consulta a provas e questões de anos anteriores.

Endpoints consultados na documentação e no código da API:

- `GET /v1/exams`: lista provas, anos, disciplinas e idiomas.
- `GET /v1/exams/{year}`: metadados da prova.
- `GET /v1/exams/{year}/questions?limit=...&offset=...&language=...`: lista questões.
- `GET /v1/exams/{year}/questions/{index}?language=...`: detalhe de uma questão.

O schema observado inclui ano, índice, disciplina, idioma, contexto em Markdown, arquivos, introdução das alternativas, alternativas A–E, alternativa correta e indicador de correção.

A API não entrega explicação pedagógica completa, dificuldade validada ou análise das alternativas incorretas. Isso é responsabilidade editorial do Trilha Jovem.

## 2. Cobertura observada

Na consulta realizada em 17/11/2026, `/v1/exams` apresentou anos de 2009 a 2023. O INEP publica arquivos oficiais de provas e gabaritos para anos mais recentes; avaliar importação própria dos arquivos de 2024 e 2025 em etapa posterior. Não apresentar esses anos como cobertura da API comunitária sem nova verificação.

## 3. Limites de consulta

A documentação indica máximo de 50 questões por solicitação na listagem e recomenda respeitar 1 requisição por segundo em endpoints sem cache. A ingestão é no backend, com paginação, cache e controle de ritmo. Nunca consultar a API do ENEM a cada abertura de quiz no dispositivo.

## 4. Disciplinas fornecidas

- `ciencias-humanas`;
- `ciencias-natureza`;
- `linguagens`;
- `matematica`.

A fonte não deve ser tratada como se oferecesse classificação completa por assunto, habilidade ou dificuldade. Essas classificações serão editoriais e identificadas como tal.

## 5. Formatos de experiência

### Pergunta-relâmpago
Uma questão selecionada para uma sessão curta. Sem cronômetro obrigatório. A duração real depende do tamanho do enunciado e de suas imagens.

### Miniquiz
Três questões da mesma área ou de assuntos próximos, com estimativa de tempo exibida apenas depois de validada.

### Questão completa
Preserva o contexto e a mídia original disponível. Não truncar enunciados longos para que pareçam rápidos.

## 6. Jornada

1. Feed ou trilha convida: “Topa uma questão de Natureza?”.
2. Usuário escolhe iniciar; área pode ser sugerida ou aleatória.
3. App exibe ano, disciplina, enunciado e imagens necessárias.
4. Usuário seleciona A–E.
5. Feedback acolhedor, sem linguagem punitiva.
6. Apresenta gabarito e explicação autoral revisada.
7. Quando relevante, comenta equívocos comuns das outras opções.
8. Oferece aprofundamento, questão relacionada ou trilha.

## 7. Segurança e integridade

- Não enviar `correctAlternative` nem `isCorrect` ao cliente antes da resposta.
- Validar resposta no backend.
- Conferir consistência entre gabarito e alternativas durante a ingestão.
- Preservar texto e contexto original; não reescrever a questão como se fosse oficial.
- Validar URL e disponibilidade das mídias.
- Sanitizar Markdown e bloquear HTML arbitrário.
- Não diagnosticar inteligência ou aptidão a partir de acertos.
- Sem ranking público ou sequência punitiva.

## 8. Camada de explicação

Cada questão publicada deve ter explicação revisada com:

- conceito central;
- raciocínio que sustenta a resposta correta;
- motivo pelo qual a alternativa atende ao enunciado;
- equívoco comum, quando útil;
- tópicos relacionados;
- fonte complementar, quando necessária;
- status e data de revisão.

GPT pode produzir um rascunho durante a preparação, mas a explicação precisa de verificação. Não gerar justificativas em tempo real sem revisão no fluxo do usuário.

## 9. Modelo lógico

`enem_questions`:

- `id`, `provider`, `year`, `question_index`;
- `discipline`, `language`, `context_markdown`;
- `files_json`, `alternatives_json`;
- `correct_alternative`, `source_url`;
- `imported_at`, `payload_hash`;
- `quick_eligible`, `validation_status`.

`quiz_explanations`:

- `question_id`, `short_explanation`;
- `correct_reasoning`, `common_misconceptions`;
- `related_topics`, `review_status`, `reviewed_at`.

Tentativas e progresso permanecem locais na primeira versão guest-first.

## 10. Direitos

A GPL-2.0 do código da API não significa automaticamente que todo texto, imagem e questão agregados tenham a mesma licença. Verificar direitos de cada tipo de conteúdo e mídia antes de redistribuir. Manter referência à prova, ano, questão e fonte; quando a permissão não estiver clara, não republicar o asset.
