import { lazy, Suspense } from "react";
import { Header } from "./components/organisms/Header";
import { Hero } from "./components/organisms/Hero";
import { ProductGrid } from "./components/organisms/ProductGrid";
import { ProductCard } from "./components/molecules/ProductCard";
import { useProducts } from "./hooks/useProducts";

// Lazy load do Footer, não crítico
const Footer = lazy(() =>
  import("./components/organisms/Footer").then((module) => ({
    default: module.Footer,
  }))
);

export default function App() {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen bg-white font-sans text-black antialiased">
      <Header />

      <main>
        <Hero />

        <ProductGrid isLoading={loading} error={error}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </main>

      <Suspense fallback={<div className="h-64 bg-gray-50" />}>
        <Footer />
      </Suspense>
    </div>
  );
}
