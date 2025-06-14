# c2finance

c2finance é uma plataforma web de controle financeiro pessoal que une os históricos das suas planilhas a dados reais das contas via integração Open Finance com Pluggy. O projeto nasce em monorepo pnpm, com backend Node.js/Express e frontend React + Tailwind, ambos em TypeScript, preparado para evoluções como IA consultora e SaaS multitenant.

Este repositório contém apenas a configuração inicial e as dependências básicas de cada pacote.

## Estrutura

- **apps/backend**: API em Node.js/Express (sem código funcional ainda).
- **apps/frontend**: Frontend em React + Tailwind via Vite.
- **packages/shared**: Código compartilhado entre os apps.

## Uso

2. Rode `pnpm install` na raiz do projeto.

Scripts auxiliares:

- `pnpm lint` — verifica o código com ESLint.
- `pnpm format` — formata com Prettier.

## Licença

MIT
