# c2finance

c2finance \u00e9 uma plataforma web de controle financeiro pessoal que une os hist\u00f3ricos das suas planilhas a dados reais das contas via integra\u00e7\u00e3o Open Finance com Pluggy. O projeto nasce em monorepo pnpm, com backend Node.js/Express e frontend React + Tailwind, ambos em TypeScript, preparado para evolu\u00e7\u00f5es como IA consultora e SaaS multitenant.

Este reposit\u00f3rio cont\u00e9m apenas a configura\u00e7\u00e3o inicial e as depend\u00eancias b\u00e1sicas de cada pacote.

## Estrutura

- **apps/backend**: API em Node.js/Express (sem c\u00f3digo funcional ainda).
- **apps/frontend**: Frontend em React + Tailwind via Vite.
- **packages/shared**: C\u00f3digo compartilhado entre os apps.

## Uso

1. Copie `.env.example` para `.env` e ajuste as vari\u00e1veis.
   Você também pode executar `pnpm run setup-env` para gerar um arquivo `.env` padrão.
2. Rode `pnpm install` na raiz do projeto.

Scripts auxiliares:

- `pnpm lint` — verifica o c\u00f3digo com ESLint.
- `pnpm format` — formata com Prettier.

## Licen\u00e7a

MIT
