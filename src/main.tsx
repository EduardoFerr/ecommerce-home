import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { CartProvider } from './context/CartContext.tsx';
import './index.css'
import App from './App.tsx'

/**
 * Ponto de Entrada: main.tsx
 * Aqui injetamos o CartProvider no topo da hierarquia.
 * Isto permite que qualquer componente dentro de <App /> (como o ProductCard)
 * tenha acesso às funções e estado do carrinho através do hook useCart.
 * * Nota Técnica: Adicionadas extensões explícitas para garantir a resolução
 * correta dos módulos pelo bundler no ambiente atual.
 */
createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CartProvider>
      <App />
    </CartProvider>
  </StrictMode>,
);