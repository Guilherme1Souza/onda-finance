### Onda Finance

Aplicação bancária simulada, construída como desafio de front-end.

### Stack

| Camada | Tecnologia |
|---|---|
| Framework | React 19 + TypeScript 5.9 |
| Build | Vite 8 |
| Estilização | Tailwind CSS 4 + CVA |
| Componentes | Radix UI |
| Roteamento | React Router v7 |
| Server state | React Query v5 |
| Client state | Zustand |
| Formulários | React Hook Form + Zod |
| HTTP | Axios |
| Testes | Vitest + Testing Library |

### Como rodar

```bash
# Instalar dependências
npm install

# Dev server
npm run dev

# Rodar testes
npm test

# Build de produção
npm run build
```

### Credenciais de demo

```
Email:  ana@ondafinance.io
Senha:  senha123
```

### Estrutura de pastas

```
src/
├── components/
│   ├── ui/                    # Primitivos reutilizáveis (Button, Input, Card, Badge...)
│   ├── layout/                # Estrutura base da aplicação (AppShell, Sidebar...)
│   └── shared/                # Componentes transversais (ProtectedRoute, Toaster...)
├── features/
│   ├── auth/
│   │   ├── hooks/             # useAuth
│   │   ├── pages/             # login-page.tsx
│   │   ├── schemas/           # login.schema.ts
│   │   └── services/          # auth.service.ts
│   ├── dashboard/
│   │   ├── components/        # balance-card, transaction-item, transaction-list
│   │   ├── hooks/             # useTransactions
│   │   ├── pages/             # dashboard-page.tsx
│   │   └── services/          # account.service.ts
│   └── transfer/
│       ├── hooks/             # useTransfer
│       ├── pages/             # transfer-page.tsx
│       ├── schemas/           # transfer.schema.ts
│       └── services/          # transfer.service.ts
├── hooks/
│   └── useToast.ts            # Hook global/transversal
├── lib/
│   ├── axios.ts               # Instância Axios
│   ├── query-client.ts        # Config do React Query
│   └── utils.ts               # Helpers globais
├── mocks/
│   └── data.ts                # Dados estáticos de desenvolvimento
├── router/
│   └── router.tsx             # Configuração das rotas
├── store/
│   ├── auth.store.ts          # Sessão/autenticação
│   └── account.store.ts       # Saldo/transações/visibilidade
├── styles/
│   └── globals.css
├── test/
│   ├── setup.ts
│   ├── account-store.test.ts
│   ├── login-schema.test.ts
│   ├── transfer-schema.test.ts
│   └── utils.test.ts
├── types/
│   └── index.ts
├── App.tsx
└── main.tsx
```

### Decisões de arquitetura

- **Estrutura orientada por features**: cada domínio (auth, dashboard, transfer) agrupa sua própria lógica, páginas, schemas e serviços, facilitando manutenção e evolução
- **Separação entre camadas**: componentes de UI, layout, utilitários e hooks globais ficam fora das features para evitar duplicação
- **Zustand para estado global**: armazena sessão, saldo, transações e controle de visibilidade
- **React Query para controle assíncrono**: modela fluxo de carregamento e simula camada de dados próxima a uma API real. Queries usam dados do store como `initialData` para atualização reativa
- **React Hook Form + Zod**: formulários com validação tipada e desacoplada dos componentes
- **CVA nos componentes visuais**: permite criar variantes reutilizáveis, escaláveis e tipadas
- **Mock layer isolada**: `services/` simula latência de rede, fácil de substituir por chamadas reais
- **Testes unitários**: priorizados em schemas, store e utilitários para validar regras centrais

### Segurança

Como se trata de uma aplicação simulada, alguns pontos de segurança não foram implementados de forma completa. Em um cenário real:

#### Proteção contra engenharia reversa

- Nenhuma regra sensível no front-end: validações críticas, autorização e limites ficariam no back-end
- Tokens e segredos nunca embarcados no cliente
- Minificação e otimizações em produção
- Source maps desabilitados em produção
- Validação de permissões no servidor

#### Proteção contra vazamento de dados

- Comunicação sempre via HTTPS
- Armazenamento seguro com cookies HttpOnly, Secure e SameSite
- Controle de acesso por perfil/permissão
- Logs sem dados sensíveis
- Variáveis de ambiente protegidas
- Tratamento de sessão com expiração automática

### Melhorias futuras

- Integração com API real para autenticação, saldo e transferências
- Persistência real de sessão com estratégia segura de autenticação
- Testes de integração e testes de componentes com fluxos completos
- Feedback visual mais rico para loading, erro e sucesso
- Paginação e filtros de transações
- Acessibilidade aprimorada com navegação por teclado e atributos ARIA
- Internacionalização e formatação dinâmica de moeda/data
- Cobertura de testes e pipeline de CI para validação automática
- Controle de permissões e perfis de usuário
- Observabilidade e monitoramento de erros
