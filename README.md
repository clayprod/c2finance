# c2finance

c2finance é uma plataforma web de controle financeiro pessoal que une os históricos das suas planilhas a dados reais das contas via integração Open Finance com Pluggy. O projeto nasce em monorepo pnpm, com backend Node.js/Express e frontend React + Tailwind, ambos em TypeScript, preparado para evoluções como IA consultora e SaaS multitenant.

Este repositório contém apenas a configuração inicial e as dependências básicas de cada pacote.

## Estrutura

- **apps/backend**: API em Node.js/Express com rotas de autenticação (`/register`, `/login`, `/me`) e endpoint `/pluggy/item` para salvar o id do item.
- **apps/frontend**: Frontend em React + Tailwind via Vite.
- **packages/shared**: Código compartilhado entre os apps.

## Uso

1. Clone o repositório
2. Rode `pnpm install` na raiz do projeto.
3. Execute `./setup-env.sh` para criar os arquivos `.env` e `.env.test` caso
   ainda não existam.
3. Execute `./setup-env.sh` para criar o arquivo `.env`.
4. Inicie o backend com `pnpm --filter @c2finance/backend dev` e o frontend com `pnpm --filter @c2finance/frontend dev`.

Scripts auxiliares:

- `pnpm lint` — verifica o código com ESLint.
- `pnpm format` — formata com Prettier.

## Licença

MIT
