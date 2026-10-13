# Monorepo Template

Template de monorepo com **API** (Express + Prisma + PostgreSQL) e **Web** (React + Vite), organizado por features e pronto para servir de base em novos projetos.

## Estrutura

- `apps/api` — REST API com autenticação JWT, middleware, testes unitários e feature de exemplo `demo`
- `apps/web` — SPA React com roteamento, Zustand, TanStack Query, i18n e feature de exemplo `Demo`
- `packages/shared` — pacote compartilhado (extensível)

## Pré-requisitos

- Node.js e pnpm
- Docker (PostgreSQL via `docker-compose.yml`)

## Primeiros passos

```bash
pnpm install
pnpm db:up
pnpm --filter @monorepo-template/api db:setup   # ou o script equivalente no package da API
pnpm dev
```

Credenciais padrão após o seed da API:

- **Usuário:** `demo`
- **Senha:** `template123!`

## O que usar como referência

| Camada | Onde olhar |
|--------|------------|
| API — CRUD + paginação | `apps/api/src/features/demo/` |
| API — auth | `apps/api/src/features/auth/` |
| Web — hooks + Manager/Repository | `apps/web/src/features/Demo/` |
| Web — estado global | `apps/web/src/features/Demo/sliceStore/` |
| Componentes reutilizáveis | `apps/web/src/shared/components/` |

Substitua a feature `demo`/`Demo` pelo domínio real do seu produto e ajuste o schema Prisma conforme necessário.
