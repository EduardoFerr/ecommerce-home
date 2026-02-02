# La Moda - E-commerce Home  

Este projeto é um desafio técnico de alta performance que replica a experiência de uma boutique online de moda contemporânea. O foco principal reside na aplicação de padrões de arquitetura modernos e na otimização extrema dos Core Web Vitals.

## 🚀 Diferenciais de Engenharia (Senior Level)

### 1. Arquitetura de Componentes (Atomic Design)

A aplicação utiliza a metodologia Atomic Design, garantindo uma interface modular, escalável e de fácil manutenção:

| Nível      | Descrição                                                                 | Exemplos                     |
|------------|---------------------------------------------------------------------------|------------------------------|
| Atoms     | Componentes de UI puros, indivisíveis e sem lógica de negócio.            | Badge, PriceDisplay, ProductImage |
| Molecules | Combinações de átomos formando unidades funcionais complexas.             | ProductCard                 |
| Organisms | Blocos de interface que orquestram moléculas e lógica de estado.          | Header, ProductGrid, Footer |

### 2. Otimização de Performance & LCP

Foco total na experiência do utilizador e métricas de carregamento (Web Vitals):

- **Resource Hints:** Implementação de preload e preconnect no index.html para antecipar a resolução de DNS e o download de ativos críticos da CDN.
- **Fetch Priority API:** Uso de fetchpriority="high" e loading="eager" no primeiro produto da lista (LCP Candidate) para reduzir o tempo de renderização inicial.
- **Layout Stability:** Atribuição de aspect-ratio fixo e placeholders de cor nos containers de imagem para eliminar o Cumulative Layout Shift (CLS).

### 3. Padrões de Código e SOLID

- **Adapter Pattern:** Camada de tradução que normaliza diferentes formatos de resposta da API (Mock vs External) para um modelo de domínio único, protegendo a UI de mudanças no backend.
- **Dependency Inversion:** O componente App orquestra o layout de alto nível, enquanto a lógica de dados é injetada via hooks customizados (useProducts).
- **Strict Typing:** Uso de TypeScript para definir contratos claros entre a camada de infraestrutura (API) e a camada de visualização.

### 4. Gestão de Estado e Persistência

- **Context API:** Gestão de estado global do carrinho centralizada, utilizando useMemo e useCallback para otimizar re-renderizações.
- **Storage Strategy:** Sincronização robusta com LocalStorage para persistência de dados entre sessões.
- **Business Rules:** Agregação de itens baseada em SKU, permitindo o controlo de quantidades e cálculos de totais (subtotal, descontos e portes) de forma centralizada.

## 🧪 Plano de Testes (Roadmap/TODO)

O roadmap foi desenhado para garantir cobertura em diferentes níveis da pirâmide de testes:

### ✅ Testes Unitários (Vitest + React Testing Library)

- [ ] Adapters: Validar a integridade da transformação de dados da API.
- [ ] Utils: Garantir a precisão do formatador de moeda sob diferentes locales.
- [ ] Atoms: Testar a renderização condicional de propriedades de performance nas imagens.

### ✅ Testes de Integração

- [ ] Cart Engine: Simular o ciclo de vida de um item no carrinho (Add -> Update Qty -> Remove).
- [ ] Product List: Validar a integração entre o ProductService e a renderização do ProductGrid.

### ✅ Testes E2E (Playwright)

- [ ] User Journey: Simular o percurso do utilizador desde a descoberta do produto até à revisão do carrinho final.

## 🛠️ Tecnologias Utilizadas

- **Core:** React 18, TypeScript, Vite
- **Styling:** Tailwind CSS (Mobile-first)
- **Infrastructure:** Docker, Nginx (Otimizado para Single Page Applications)

## 📦 Como Executar o Projeto

### Via Docker (Ambiente de Produção)

```bash
# Build da imagem
docker build -t lamoda-frontend .

# Executar o container
docker run -p 8080:80 lamoda-frontend

```

> Aceda em: http://localhost:8080

###  Desenvolvimento Local


```Bash
# Instalar dependências
npm install

# Iniciar servidor de desenvolvimento
npm run dev
```

## 📝 Notas de Implementação

Este projeto prioriza a manutenibilidade através da separação clara de preocupações (Separation of Concerns). Cada decisão técnica, desde o uso de Nginx para cache de assets até à normalização de dados via Adapters, visa criar uma base de código pronta para escala real.

Desenvolvido com 🖤 por *Eduardo de Moraes Ferreira* / [GitHub](https://github.com/EduardoFerr)