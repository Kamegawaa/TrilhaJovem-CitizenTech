# Fontes de dados, cobertura e direitos de uso

## ENEM

### API comunitária

- Serviço: https://api.enem.dev/
- Documentação: https://docs.enem.dev/
- Código: https://github.com/yunger7/enem-api
- Natureza: projeto comunitário, não uma API oficial do INEP.
- Cobertura observada em 17/11/2026 no endpoint `/v1/exams`: ENEM 2009–2023.
- Limite documentado: 1 requisição por segundo em endpoints sem cache.
- O serviço fornece metadados de provas, questões, enunciados, alternativas, arquivos associados e gabaritos.

### INEP oficial

- Provas e gabaritos: https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos
- Microdados: https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/enem

Os arquivos oficiais podem servir a um importador próprio em etapa posterior. Microdados são arquivos estruturados, não presumir que exista API REST para tudo.

## NASA Astronomy Picture of the Day (APOD)

- Endpoint: `GET https://api.nasa.gov/planetary/apod`.
- Conector inicial: `src/lib/sources/nasa-apod.mjs`.
- Chave: variável de ambiente `NASA_API_KEY`; `DEMO_KEY` é fallback limitado para desenvolvimento.
- O conector normaliza título, explicação, data, tipo de mídia, URL, miniatura e crédito.
- Registros entram em `needs_rights_review`; a API não concede automaticamente direito de redistribuir imagens ou vídeos de terceiros.
- A integração atual é um adaptador isolado com testes simulados; ainda não há ingestão agendada, persistência ou publicação no feed.
- Documentação: https://api.nasa.gov/ e https://github.com/nasa/apod-api.

## Fontes candidatas para outras áreas

| Fonte | Uso potencial | Validação necessária |
|---|---|---|
| OpenAlex | Pesquisas e trabalhos científicos | Termos de uso, idioma e campos adequados |
| NASA Open APIs | Astronomia, espaço e dados científicos | Chaves, limites, crédito e direitos de cada asset |
| GBIF | Registros de biodiversidade | Licença do registro individual e mídia |
| Wikimedia Commons | Fotografias e mídia educativa | Licença e atribuição de cada arquivo |
| MEC Dados Abertos | Instituições e cursos | Formato de atualização e campos disponíveis |
| Escola Virtual de Governo | Cursos gratuitos | Catálogo, atualização e condições de uso |
| World Bank API | Indicadores econômicos e sociais | Relevância para narrativas brasileiras |

Essas fontes são candidatas para validação, não integrações já implementadas.

## Política de direitos

- Guardar URL original, autoria/criador, licença e texto de atribuição de cada asset.
- Diferenciar licença do código de uma API da licença dos dados ou mídias fornecidos.
- Não baixar, editar ou redistribuir mídia sem verificar os termos aplicáveis.
- Para trilhas, usar áudio original ou biblioteca com licença compatível.
- Para conteúdo sem licença clara, manter status `needs_rights_review`.
- Registrar data da última verificação dos termos.

## Qualidade dos registros ENEM

- O contexto pode vir em Markdown.
- Arquivos podem estar ausentes ou indisponíveis.
- Idiomas opcionais precisam ser respeitados.
- Gabarito e alternativas são campos separados.
- Validar os assets e manter fallback textual.
- Sanitizar conteúdo antes de renderizar.

## Referências

- https://docs.enem.dev/introduction
- https://docs.enem.dev/rate-limits
- https://github.com/yunger7/enem-api
- https://github.com/yunger7/enem-api/blob/main/LICENSE
- https://www.gov.br/inep/pt-br/areas-de-atuacao/avaliacao-e-exames-educacionais/enem/provas-e-gabaritos
- https://www.gov.br/inep/pt-br/acesso-a-informacao/dados-abertos/microdados/enem
