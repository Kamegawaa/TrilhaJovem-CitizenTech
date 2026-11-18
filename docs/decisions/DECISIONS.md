# Registro de decisões do produto

## Aprovadas

| Tema | Decisão |
|---|---|
| Público | Jovens de 18–24 anos |
| Abrangência | Brasil inteiro |
| Conteúdo de usuários | Sem UGC no MVP |
| Cadastro | Guest-first; sem cadastro obrigatório |
| Progresso | Preferências, salvos e histórico inicialmente locais |
| Tema | Interface escura e player escuro |
| Personalidade | Acolhedora, jovem, expressiva; sem aparência de luxo/corporativa |
| Conteúdo central | Vídeos curtos cinematográficos/edit, com aprofundamento e desafios |
| Movimento | Motion for React como principal; GSAP para sequências especiais |
| 3D | Não incluir dependência 3D pesada no MVP |
| Repositório | https://github.com/Kamegawaa/TrilhaJovem-CitizenTech |

## Recomendações sujeitas a prova técnica

| Camada | Recomendação |
|---|---|
| Interface | React + TypeScript + PWA |
| Motion | Motion for React |
| Animação editorial complexa | GSAP sob demanda |
| Backend/API | Cloudflare Workers |
| Banco do catálogo | Cloudflare D1 |
| Atualização | Cron Triggers |
| Progresso guest | IndexedDB |

## Pendências

1. Validar Workers + D1 em um spike técnico e verificar limites atuais do plano gratuito.
2. Decidir armazenamento e entrega de audiovisual: assets próprios/licenciados, R2 ou origem externa.
3. Definir importação apenas da API comunitária ENEM 2009–2023 ou também parser dos arquivos oficiais INEP 2024–2025.
4. Escolher áreas de conhecimento para o primeiro lote editorial.
5. Aprovar identidade gráfica, paleta, tipografia e storyboard antes de implementar telas.
6. Decidir telemetria anônima; recomendação inicial: não enviar histórico de consumo ao servidor.
7. Testar APIs candidatas e licenças antes de tratá-las como fontes confirmadas.

## Estado

Esta documentação registra decisões e recomendações. Não implica criação de banco, rotas, integrações, contas de serviços ou hospedagem.
