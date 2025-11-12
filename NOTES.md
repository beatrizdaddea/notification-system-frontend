## Notas do projeto — notification-system-frontend

Este documento registra as concessões feitas até agora, itens deixados não implementados por falta de tempo e próximos passos recomendados.

---

## Contexto
- Este repositório é um frontend React + Vite focado em exibir e gerenciar notificações.
- Atualmente existe uma pequena camada de API em `src/api/notifications.ts` (contém um simples mock local).
- O estilo é feito com Tailwind CSS; os componentes ficam em `src/components`.

## Itens NÃO implementados devido ao tempo
1. Docker / containerização para o frontend (nenhum `Dockerfile` / `docker-compose` incluído).
2. Tratamento de ambientes pronto para produção: não há `.env.example` + tratamento seguro para segredos ao consumir APIs reais.
3. Testes end-to-end (Cypress / Playwright) e alguma cobertura de testes de unidade além dos testes básicos de componente.
4. Integração de API com fluxos de autenticação (login, tokens, fluxo de refresh) — atualmente a UI assume um mock.
5. Atualizações em tempo real: não implementadas (nenhuma integração com WebSocket / SSE / DDP).
6. Não foi integrado o Meteor.js

## Próximos passos (concretos, priorizados)

### Curto prazo
- Adicionar um `Dockerfile` básico para o frontend (build multi-estágio) e um `docker-compose.yml` para executar o frontend junto com uma API mockada (ou um container de API real). Isso garante ambientes reproduzíveis.
- Criar `.env.example` listando as variáveis necessárias (ex: VITE_API_BASE_URL) e atualizar `src/api/notifications.ts` para ler a URL base a partir de uma variável de ambiente.

Dockerfile exemplo:

```dockerfile
# Estágio 1: build
FROM node:18-alpine AS build
WORKDIR /app
COPY package*.json .
RUN npm ci --silent
COPY . .
RUN npm run build

# Estágio 2: imagem de produção
FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

Notas:
- Para apps Vite a saída geralmente fica em `dist/`.
- Use `ARG`/`ENV` no Dockerfile ou leia variáveis de ambiente em tempo de execução via um pequeno script de entrada se precisar de URLs de API configuráveis em runtime.

### Médio prazo
- Integrar uma API real:
  - Substituir os mocks em `src/api/notifications.ts` por chamadas HTTP reais (use axios ou fetch). Ler a URL base de uma variável de ambiente.
  - Adicionar tratamento de erros e uma interface de usuário para fallback (error boundary) para falhas globais da API.
  - Implementar fluxo de autenticação, se necessário (página de login, armazenar tokens com segurança).
- Adicionar testes:
  - Testes de unidade para novas funções de wrapper de API (mock fetch/axios).
  - Testes E2E para os fluxos de notificação (marcar como lida/excluir/paginação).
  
### Longo prazo / opcional
- Atualizações em tempo real: escolha uma estratégia (WebSocket/SSE/Meteor DDP). Opte pelo caminho mais simples que o backend suporta.
- CI / CD: adicione um pipeline GitHub Actions para executar lint, testes, build e, opcionalmente, publicar a imagem Docker no registry.
- Performance: adicione auditorias Lighthouse e otimize a divisão do bundle / carregamento preguiçoso (lazy-loading) de componentes pesados (se houver).
- Desenvolver o sisteam integrando com o Meteor.js. 

## Lista de verificação rápida para integrar uma API real + Docker (prático)
- [ ] Adicionar `.env.example` com `VITE_API_BASE_URL` (Vite usa o prefixo `VITE_`).
- [ ] Atualizar `src/api/notifications.ts` para usar `import.meta.env.VITE_API_BASE_URL`.
- [ ] Criar `Dockerfile` (multi-estágio) e `docker-compose.yml` para executar frontend + API mockada.
- [ ] Adicionar um cliente HTTP (axios) se necessário e centralizar interceptors (auth, tratamento de erro).
- [ ] Integrar o sistema usando o Meteor.js

