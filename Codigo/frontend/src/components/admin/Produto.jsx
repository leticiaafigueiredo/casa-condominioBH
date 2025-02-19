import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProdutoCard from './ProdutoCard';
import ProdutoService from '../service/ProdutoService';
import CategoriaService from '../service/CategoriaService';
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react';
import { PlusIcon, MinusIcon } from '@heroicons/react/20/solid';
import '../styles/produto.css';
import { useAuth } from '../contexts/AuthProvider';

export default function Produto() {
  const [produtos, setProdutos] = useState([]);
  const [categorias, setCategorias] = useState([]);
  const [filteredProdutos, setFilteredProdutos] = useState([]);
  const [selectedCategorias, setSelectedCategorias] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, userType } = useAuth();
    useEffect(() => {
        console.log('User Type:', userType);
        const fetchProdutos = async () => {
            try {
                const data = await ProdutoService.getAllProdutos(token);
                console.log("Produtos: ", data)
                setProdutos(data);
                const dataCategoria = await CategoriaService.getAllCategorias(token);
                console.log("Produtos: ", data)
                setCategorias(dataCategoria);
                setLoading(false);
            } catch (err) {
                setError(true);
                console.log(err)
                setLoading(false);
            }
        };

        fetchProdutos();
    }, []);

    useEffect(() => {
      console.log('User Type:', userType);
      const fetchCategoria = async () => {
          try {
              const data = await CategoriaService.getAllCategorias(token);
              console.log("Produtos: ", data)
              setCategorias(data);
              setLoading(false);
          } catch (err) {
              setError(true);
              console.log(err)
              setLoading(false);
          }
      };

      fetchCategoria();
  }, []);

  const handleFilterChange = (categoria) => {
    const updatedSelectedCategorias = selectedCategorias.includes(categoria)
      ? selectedCategorias.filter((cat) => cat !== categoria)
      : [...selectedCategorias, categoria];

    setSelectedCategorias(updatedSelectedCategorias);

    if (updatedSelectedCategorias.length === 0) {
      setFilteredProdutos(produtos);
    } else {
      const produtosFiltrados = produtos.filter((produto) =>
        updatedSelectedCategorias.includes(produto.categoria)
      );
      setFilteredProdutos(produtosFiltrados);
    }
  };
    
    if (loading) {
        return <p>Carregando produtos...</p>; responde
    }

    if (error) {
        return <p>{error}</p>;
    }

  const handleCadastroClick = () => {
    navigate('/cadastro-produto');
  };

  return (
    <div className="bg-white">
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex items-baseline justify-between border-b border-gray-200 pb-6 pt-24">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900">Produtos</h1>
          <div>
            <button className="button-16" role="button" onClick={handleCadastroClick}>
              Cadastrar Produto
            </button>
          </div>
        </div>

        <section aria-labelledby="products-heading" className="pb-24 pt-6">
          <h2 id="products-heading" className="sr-only">Produtos</h2>
          <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-4">
            {/* Filtros */}
            <form className="hidden lg:block">
              <Disclosure as="div" className="border-b border-gray-200 py-6">
                <h3 className="-my-3 flow-root">
                  <DisclosureButton className="group flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500">
                    <span className="font-medium text-gray-900">Categoria</span>
                    <span className="ml-6 flex items-center">
                      <PlusIcon aria-hidden="true" className="h-5 w-5 group-data-[open]:hidden" />
                      <MinusIcon aria-hidden="true" className="h-5 w-5 [.group:not([data-open])_&]:hidden" />
                    </span>
                  </DisclosureButton>
                </h3>
                <DisclosurePanel className="pt-6">
                  <div className="space-y-4">
                  {categorias.map((categoria, idx) => (
                  <div key={categoria.id} className="flex items-center">
                    <input
                      id={`filter-${categoria.nome}-${idx}`}
                      name="categoria"
                      type="checkbox"
                      checked={selectedCategorias.includes(categoria.nome)}
                      onChange={() => handleFilterChange(categoria.nome)}
                      className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                    />
                    <label htmlFor={`filter-${categoria.nome}-${idx}`} className="ml-3 text-sm text-gray-600">
                      {categoria.nome}
                    </label>
                  </div>
                ))}
                  </div>
                </DisclosurePanel>
              </Disclosure>
            </form>

            {/* Grid de Produtos */}
            <div className="lg:col-span-3">
              <div className="flex flex-wrap justify-center bg-white py-5">
              {produtos.map((produto, index) => (

                  userType === 'ROLE_ADMIN' ? (
                      <ProdutoCard
                          id={produto.produtoId}
                          key={index}
                          nome={produto.nome}
                          img={produto.images[0].image}
                          preco={produto.preco}
                      />
                  ) : <ProdutoCard
                      key={index}
                      nome={produto.nome}
                      img={produto.images[0].image}
                      preco={produto.preco}
                  />
                  ))}
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
