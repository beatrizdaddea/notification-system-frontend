```markdown
# 📬 Notification Frontend

## 🧭 Visão Geral

Este projeto é uma **Single Page Application (SPA)** desenvolvida em **React.js + TypeScript**, com o objetivo de **consumir uma API de gestão de notificações**.  
A aplicação lista notificações de um usuário, permitindo **marcar como lida** e **remover notificações**, exibindo claramente o status de cada uma.

> 💡 *No contexto deste teste técnico, a API foi simulada localmente com dados mockados para demonstrar as interações previstas.*

---

## 🧰 Tecnologias Utilizadas

- ⚛️ **React.js (CRA v5)** — criação do frontend SPA  
- 💅 **TailwindCSS** — estilização rápida e responsiva  
- 🧠 **TypeScript** — tipagem estática e segurança de código  
- 🔗 **Axios / Fetch API (mockado)** — estrutura de consumo da API  
- 🧩 **Componentização modular** — separação por responsabilidades (API, componentes, páginas e tipos)

---

## 🚀 Como Executar o Projeto Localmente

### 1️⃣ Clonar o repositório

```bash
git clone https://github.com/beatrizdaddea/notification-frontend.git
cd notification-frontend
```

### 2️⃣ Instalar dependências

```bash
npm install
```

### 3️⃣ Rodar o projeto em ambiente local

```bash
npm start
```

O projeto será iniciado em:
👉 `http://localhost:3000`

---

## 🧪 Estrutura de Pastas

```bash
src/
 ├── api/               # Simulação da API (mock de notificações)
 │    └── notifications.ts
 ├── components/        # Componentes reutilizáveis
 │    ├── NotificationCard.tsx
 │    └── NotificationList.tsx
 ├── pages/             # Páginas principais
 │    └── NotificationsPage.tsx
 ├── types/             # Tipagem global (TypeScript)
 │    └── notification.ts
 ├── __tests__/         # Testes (Jest/React Testing Library)
 │    ├── components/
 │    │    └── NotificationCard.test.tsx
 │    ├── pages/
 │    │    └── NotificationsPage.test.tsx
 │    └── setup/
 │         └── test-setup.ts
 ├── App.tsx
 ├── index.css          # TailwindCSS e estilos globais
 └── main.tsx
```

---

## 🎨 Configuração do TailwindCSS

Tailwind foi configurado conforme a documentação oficial.

**Instalação:**

```bash
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

**tailwind.config.js**

```javascript
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [],
}
```

**index.css**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

---

## 🧠 Decisões Arquiteturais

**Arquitetura em camadas simples:**

- **API Layer**: funções centralizadas em `src/api/` para abstrair as chamadas REST (simuladas via mock).

- **UI Layer**: componentes modulares e reutilizáveis, cada um com responsabilidade única.

**Simulação de API real:**

As funções `getNotifications`, `markAsRead` e `deleteNotification` simulam o comportamento da API real, utilizando promessas e delays artificiais (`setTimeout`) para imitar tempo de resposta.

**Design responsivo:**

TailwindCSS foi escolhido para permitir prototipagem rápida e responsiva com classes utilitárias.

**Escalabilidade:**

O código está preparado para integração futura com uma API real — bastando substituir a camada `src/api` por chamadas Axios/Fetch com `process.env.REACT_APP_API_URL`.

---

## 🧾 Scripts disponíveis

| Comando | Função |
|---------|--------|
| `npm start` | Inicia o servidor local de desenvolvimento |
| `npm run build` | Gera o build de produção |
| `npm test` | Executa testes automatizados (caso existam) |

---

## 🧩 Diferenciais Implementados

✅ Interface limpa e intuitiva  
✅ Estrutura modular com boas práticas  
✅ Simulação de API real  
✅ Pronto para integração com backend real  
✅ Configuração via variáveis de ambiente (.env) — se aplicável  

---

## 📝 Notes (Notas do Desenvolvedor)

Caso a API real não esteja disponível, a aplicação está pronta para integração — bastando configurar o endpoint base no arquivo `.env` e ajustar as funções em `src/api/notifications.ts`.

**Com mais tempo, seria possível:**

- Implementar paginação real via parâmetros `?page=`
- Adicionar autenticação de usuários
- Integrar WebSockets ou Meteor.js para notificações em tempo real
- Criar testes unitários com Jest e React Testing Library

---

## 👩‍💻 Autora

**Beatriz Chieffi Failla D'Addea**  
📍 São José dos Campos, São Paulo  
📧 beatrizchith@gmail.com  
🔗 LinkedIn • GitHub
```
