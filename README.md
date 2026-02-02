# LA MODA - E-commerce de Moda Minimalista

Este projeto é uma aplicação de e-commerce de alta performance, desenvolvida com **React**, **TypeScript** e **Tailwind CSS**. A arquitetura foi desenhada seguindo os princípios **SOLID** e **Atomic Design**, focando-se em métricas de performance (**Core Web Vitals**) e uma experiência de utilizador fluida.

---

## 🏗️ Arquitetura do Projeto

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

---

## 📥 Instalação e Configuração

**Pré-requisitos**

- Node.js v18.0 ou superior  
- Docker & Docker Compose  

**Passo a Passo (Local)**

1. Instalar dependências:
   ```bash
   npm install
   ```
2. Executar em modo de desenvolvimento:
  ```bash
   npm run dev
  ```

## 🐳 Execução com Docker (Ambiente de Dev)

1. Subir o ambiente:
   ```bash
   docker-compose up --build
   ```
   > A aplicação ficará disponível em http://localhost:5173.

2. Parar o ambiente:
  ```bash
   docker-compose down
  ```

## 📦 Funcionalidades Principais

- Catálogo Dinâmico: Carregamento assíncrono com tratamento de erros.

- Carrinho de Compras: Persistência no localStorage e gestão de estado otimizada.

- Adaptação de Dados: Sanitização de dados da API via adapters.


## 📄 Licença

Este projeto está sob a licença MIT.

---

> Desenvolvido por Eduardo - Ver [Github](https://github.com/EduardoFerr)
