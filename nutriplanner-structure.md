# Estrutura e Design do NutriPlanner

## Estrutura de Pastas do Projeto React

```
nutriplanner/
├── public/
│   ├── index.html
│   └── favicon.ico
├── src/
│   ├── components/
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Modal.tsx
│   │   │   ├── Toast.tsx
│   │   │   └── Icon.tsx
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   └── Layout.tsx
│   │   └── charts/
│   │       ├── DonutChart.tsx
│   │       └── BarChart.tsx
│   ├── pages/
│   │   ├── Dashboard.tsx
│   │   ├── PlannerPage.tsx
│   │   ├── RecipesPage.tsx
│   │   ├── RecipeDetailPage.tsx
│   │   ├── SmartRecipePage.tsx
│   │   ├── CalculatorsPage.tsx
│   │   ├── ManageDataPage.tsx
│   │   ├── ShoppingListPage.tsx
│   │   ├── ShoppingListSheetPage.tsx
│   │   ├── DietHistoryPage.tsx
│   │   └── PlanSettingsPage.tsx
│   ├── hooks/
│   │   ├── useData.ts
│   │   └── useToast.ts
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   ├── calculations.ts
│   │   ├── storage.ts
│   │   └── constants.ts
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── package.json
└── tailwind.config.js
```

## Paleta de Cores (Tailwind CSS)

### Cores Primárias
- **Verde Esmeralda (Ações, Destaques):**
  - `emerald-600`: #059669 (principal)
  - `emerald-700`: #047857 (hover)
  - `emerald-500`: #10B981 (anéis de foco, gráficos)
  - `emerald-100`: #D1FAE5 (fundos de destaque leves)
  - `emerald-50`: #ECFDF5 (fundos de hover leves)

### Cores de Texto e Fundo
- **Cinza Ardósia (Slate):**
  - `slate-800`: #1E293B (texto principal)
  - `slate-700`: #334155 (títulos de seção)
  - `slate-600`: #475569 (texto secundário)
  - `slate-500`: #64748B (texto de apoio, placeholders)
  - `slate-200`: #E2E8F0 (bordas, fundos de botão secundário)
  - `slate-50`: #F8FAFC (fundo principal do corpo)

### Cores de Status
- **Perigo:** `red-600` (#DC2626), `red-700` (#B91C1C)
- **Neutras:** `white` (#FFFFFF)
- **Gráficos:** `blue-500` (Proteína), `orange-500` (Carboidrato), `indigo-600` (Colesterol), `purple-600` (Fibra)

## Tipografia

- **Fonte:** Sans-serif padrão do sistema (Tailwind CSS)
- **Tamanhos:**
  - Títulos de página (h1): `text-4xl font-bold`
  - Títulos de seção (h2): `text-2xl` ou `text-3xl font-semibold`
  - Subtítulos (h3): `text-xl font-semibold`
  - Corpo de texto: `text-base` ou `text-sm`
  - Botões: `text-sm`, `text-base`, `text-lg font-medium`

## Componentes Principais

### 1. Layout Components
- **Navbar:** Fixa no topo, logo à esquerda, links no centro, menu hamburger para mobile
- **Footer:** Texto de copyright e slogan
- **Layout:** Container principal com navbar, main e footer

### 2. UI Components
- **Button:** Variantes (primary, secondary, danger, ghost), tamanhos (sm, md, lg)
- **Modal:** Overlay escurecido, animação zoom-in, fecha com ESC/click fora
- **Toast:** Notificações no canto inferior direito, slide-in animation
- **Icon:** SVGs estilo Feather Icons com stroke="currentColor"

### 3. Chart Components
- **DonutChart:** Para visualização de macronutrientes
- **BarChart:** Para comparação de valores nutricionais

## Páginas e Funcionalidades

### Dashboard (/)
- Resumo do dia atual
- Gráficos de progresso nutricional
- Ações rápidas (grid responsivo)
- Cards com informações de refeições planejadas

### Planejador (/planner)
- Visualização semanal
- Refeições por dia (Café, Almoço, Jantar, Lanches)
- Modal para adicionar ingredientes/receitas
- Cálculo automático de nutrientes

### Receitas (/recipes)
- Biblioteca de receitas
- Visualização em grid/lista
- Busca e filtros
- Cards com imagem, nome e informações nutricionais

### Sugestões IA (/smart-recipe)
- Interface para gerar receitas com IA
- Seleção de ingredientes
- Configuração de preferências
- Integração com API Gemini

### Calculadoras (/calculators)
- BMR, TDEE, Macros
- Formulários para dados do usuário
- Resultados calculados
- Opção para aplicar como metas

### Gerenciar Dados (/manage-data)
- CRUD de ingredientes e receitas
- Importação/exportação CSV
- Tabelas com paginação
- Modais para edição

### Lista de Compras (/shopping-list)
- Geração baseada no plano de refeições
- Agrupamento por setor
- Marcar itens como comprados
- Exportação para texto

## Responsividade

### Mobile (< 768px)
- Navbar colapsada com menu hamburger
- Grids de 1-2 colunas
- Texto e espaçamentos reduzidos
- Flex-containers em coluna

### Tablet (768px - 1024px)
- Navbar expandida
- Grids de 2-3 colunas
- Estado intermediário

### Desktop (> 1024px)
- Layout completo
- Grids com máximo de colunas
- Navbar totalmente expandida

## Animações e Interações

- **Hover:** Mudança de cor e sombra em botões/cards
- **Focus:** Anéis de foco visíveis
- **Loading:** Spinners animados durante operações assíncronas
- **Modais:** Animação zoom-in/out
- **Toasts:** Slide-in from bottom
- **Gráficos:** Transições suaves nos valores

