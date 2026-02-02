import { Header } from './components/organisms/Header.tsx';
import { ProductGrid } from './components/organisms/ProductGrid.tsx';
import { ProductCard } from './components/molecules/ProductCard.tsx';
import { Footer } from './components/organisms/Footer';
import { useProducts } from './hooks/useProducts.ts';

/**
 * App: Orquestrador Final (Container Pattern)
 * Aqui é onde o acoplamento "saudável" acontece.
 * O App injeta as moléculas dentro dos organismos através de composição (children).
 * * Nota Técnica: Reintroduzidas as extensões .tsx e .ts para garantir 
 * compatibilidade com o bundler e as regras de resolução de módulos do ambiente.
 */
function App() {
  const { products, loading, error } = useProducts();

  return (
    <div className="min-h-screen bg-white font-sans text-black selection:bg-black selection:text-white">
      {/* Organismo de Cabeçalho */}
      <Header />

      <main>
        {/* Secção Hero Minimalista */}
        <section className="bg-gray-50 py-12 text-center md:py-20">
          <h1 className="text-3xl font-light uppercase tracking-[0.2em] md:text-5xl">
            New Arrivals
          </h1>
          <p className="mt-4 text-sm text-gray-500 uppercase tracking-widest">
            Explora as últimas tendências da estação
          </p>
        </section>

        <ProductGrid isLoading={loading} error={error}>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ProductGrid>
      </main>


      <Footer />
    </div>
  );
}

export default App;