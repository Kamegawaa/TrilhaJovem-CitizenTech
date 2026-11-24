# Trilha Jovem — CitizenTech

**Da curiosidade à oportunidade.**

Aplicação demonstrativa para jovens brasileiros de 18 a 24 anos descobrirem interesses, explorarem conteúdos educativos, experimentarem trilhas de aprendizagem e encontrarem oportunidades de formação.

## Experiência disponível

- **Início:** apresentação do projeto e acesso rápido aos caminhos principais.
- **Descobertas:** feed de temas com filtros por área e opção de salvar.
- **Pesquisar:** busca local por temas e perguntas para iniciar uma exploração.
- **Interesses:** questionário curto que sugere áreas e assuntos para experimentar. Não é teste vocacional.
- **Trilhas:** etapas de aprendizagem, referências externas e progresso salvo no navegador.
- **Oportunidades:** diretório inicial de plataformas de formação, com filtros e links oficiais.
- **Salvos:** coleção de descobertas guardadas no dispositivo.
- **Desafio:** quiz interativo com correção, explicações e resultado.

## Dados demonstrativos

O frontend funciona sem autenticação, banco de dados ou chamadas externas para carregar as telas. O catálogo editorial, as trilhas e as questões do quiz ficam em `src/lib/mock-data.js`.

As respostas do questionário, preferências do feed, descobertas salvas e progresso das trilhas são armazenados no `localStorage` do navegador. Esses dados não são enviados para um servidor.

Os conteúdos e questões do protótipo são exemplos para demonstrar a experiência. As perguntas do desafio não são questões oficiais do ENEM. Links para fontes de referência e plataformas externas permitem continuar a pesquisa; requisitos e disponibilidade devem ser conferidos nos respectivos sites.

## Executar localmente

Requisitos: Node.js compatível com Next.js 16 e npm.

```bash
npm install
npm run dev
```

Abra `http://localhost:3000`.

Para validar a versão de produção:

```bash
npm run typecheck
npm run lint
npm run build
```

## Publicação

O projeto utiliza Next.js e pode ser conectado a um projeto Vercel a partir deste repositório. Antes da avaliação, publique a branch integrada e percorra as rotas principais em desktop e celular.

## Escopo do protótipo

O objetivo é demonstrar a jornada **descobrir → reconhecer interesses → aprofundar → encontrar oportunidades**, sem exigir cadastro e sem simular uma rede social. O progresso e as preferências são locais ao dispositivo utilizado.
