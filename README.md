# LA MODA - E-commerce de Moda Minimalista

Este projeto é uma aplicação de e-commerce de alta performance, desenvolvida com **React**, **TypeScript** e **Tailwind CSS**. A arquitetura foi desenhada seguindo os princípios **SOLID** e **Atomic Design**, focando-se em métricas de performance (**Core Web Vitals**) e uma experiência de utilizador fluida.

---


## 🏗️ Arquitetura do Projeto

A estrutura foi desenhada seguindo princípios de Clean Architecture e S.O.L.I.D., visando o desacoplamento total entre a interface e as regras de negócio.

Diferente de abordagens tradicionais onde os componentes consomem APIs diretamente, aqui é implementada uma camada de Adapters. Isso garante que o contrato da UI seja estável; se o backend mudar o formato de um JSON, o impacto é mitigado em um único arquivo de adaptação, protegendo toda a lógica de renderização e os testes de unidade.

No coração do projeto, o ProductService opera como um Singleton que gerencia o estado das requisições. Implementei uma estratégia de fetchPromise para evitar o Race Condition e o "double-fetch", um problema comum onde componentes montados simultaneamente disparam requisições idênticas, desperdiçando recursos de rede.

O projeto utiliza uma estrutura de pastas organizada por responsabilidades:

- **src/@types**: Definições de interfaces TypeScript para garantir a integridade dos dados.
- **src/adapters**: Camada de transformação de dados (proteção contra mudanças no backend).
- **src/components**: Organizado seguindo o Atomic Design (**Atoms, Molecules, Organisms**).
- **src/context**: Gestão de estado global (Carrinho de Compras).
- **src/hooks**: Lógica de negócio reutilizável e encapsulamento de chamadas.
- **src/services**: Comunicação com APIs externas e mocks.

## 🛠️ Tecnologias Utilizadas

- React 18 & Vite
- TypeScript
- Tailwind CSS
- Docker & Docker Compose (Contentorização de Desenvolvimento)

## 📦 Funcionalidades Principais

- Catálogo Dinâmico: Carregamento assíncrono com tratamento de erros.

- Carrinho de Compras: Persistência no localStorage e gestão de estado otimizada.

- Adaptação de Dados: Sanitização de dados da API via adapters.

---


## 🐳 Infraestrutura, Teste e Deployment
O projeto está containerizado com Docker, utilizando um fluxo de Multi-stage Build.

1. O primeiro estágio compila o código em um ambiente Node isolado.

2. O segundo estágio utiliza um servidor Nginx Alpine ultra-leve para servir os estáticos.

Esta abordagem  reduz o tamanho da imagem final e também aumenta a segurança, removendo dependências de desenvolvimento do ambiente de produção.


## 📥 Instalação e Configuração

**Pré-requisitos**

- Node.js v20.0 ou superior
- Docker & Docker Compose

### **Passo a Passo (Local)**

1. Instalar dependências:
```bash
npm install
```
2. Executar em modo de desenvolvimento:

```bash
npm run dev
```


### 🐳 Execução com Docker (Ambiente de Dev)

1. Subir o ambiente:

   ```bash
   docker compose up --build
   ```

   > A aplicação ficará disponível em http://localhost:5173.


### 🧪 Estratégia de Testes e Confiabilidade

A suíte de testes com Vitest e Testing Library foca em fluxos críticos. O CartContext, por exemplo, é testado em integração com o LocalStorage para garantir a persistência de dados. Já os Adapters possuem testes unitários rigorosos para validação de lógica matemática de descontos e formatação de moeda, garantindo que erros de arredondamento nunca cheguem ao usuário final. Os teste foram revisador por IA.

O projeto conta com testes automatizados divididos em:

1. Testes de Unidade (Adapters/Utils): Verificação lógica de cálculos de desconto e formatação de moeda.

2. Testes de Componentes (Molecules/Organisms): Garantia de que a UI reage corretamente às interações do usuário.

3. Testes de Contexto: Simulação do ciclo de vida completo do carrinho (adicionar, remover, persistir).

Para rodar os testes com docker:

```bash
docker compose -f docker-compose.test.yml up --build
```

Para rodar os testes sem docker (não recomendado em WSL):
```bash
npm run test
```

---


## 📁 Mapa de Ficheiros Detalhado

```
    src/
      ├── @types/          # Definições de interfaces de Domínio e API
      ├── adapters/        # Transformação de dados (Data Mapping)
      ├── components/      # Atomic Design (Atoms, Molecules, Organisms)
      ├── context/         # Gerenciamento de estado global
      ├── hooks/           # Abstração de lógica de negócio e consumo de dados
      ├── services/        # Camada de infraestrutura e chamadas de API
      └── utils/           # Funções utilitárias puras
```


## 📈 Próximos Passos (Roadmap Técnico)

- [ ] Implementação de testes de integração

- [ ] Implementação de Server Side Rendering (SSR) para SEO agressivo.

- [ ] Adição de Playwright para testes de E2E (ponta a ponta).

- [ ] Integração com Storybook para documentação de componentes visuais.


## 📄 Licença

Este projeto está sob a licença MIT.

---

> Desenvolvido por Eduardo - Ver [Github](https://github.com/EduardoFerr)
