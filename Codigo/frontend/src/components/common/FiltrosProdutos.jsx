import React, { useEffect, useState } from "react";
import axios from "axios";

const FiltrosProdutos = ({ onFilterChange, maxPrice }) => {
  const [categorias, setCategorias] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [priceRange, setPriceRange] = useState([0, maxPrice]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    setPriceRange([0, maxPrice]);
  }, [maxPrice]);

  useEffect(() => {
    const fetchCategorias = async () => {
      try {
        const response = await axios.get("http://127.0.0.1:8080/categoria/getAll");

        // Ordena as categorias pelo número de produtos (maior para menor)
        const categoriasOrdenadas = response.data.sort(
          (a, b) => b.produtos.length - a.produtos.length
        );



        setCategorias(categoriasOrdenadas);
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    };

    fetchCategorias();
  }, []);

  const handleFilterChange = () => {
    onFilterChange({
      searchTerm,
      priceRange,
      selectedCategory,
    });
  };

  useEffect(() => {
    handleFilterChange();
  }, [searchTerm, priceRange, selectedCategory]);

  // Categorias a serem exibidas diretamente
  const categoriasPrincipais = categorias.slice(0, 10);
  const categoriasRestantes = categorias.slice(10);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <div className="mb-10">
     

      {/* Filtros */}
      <div className="flex flex-col gap-6 p-6 bg-white rounded-lg shadow-md">
        <div className="flex flex-col md:flex-row gap-4 items-center">
          {/* Campo de pesquisa */}
          <input
            type="text"
            placeholder="Pesquisar por nome"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full md:w-1/2 px-4 py-2 border border-[#00008B] rounded-lg text-gray-700 focus:outline-none focus:ring focus:ring-[#00008B]/50"
          />

          {/* Slider para intervalo de preço */}
          <div className="flex flex-col w-full md:w-1/2">
            <label className="text-[#00008B] font-medium">Faixa de Preço</label>
            <input
              type="range"
              min="0"
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="w-full mt-2 accent-[#00008B]"
            />
            <div className="flex justify-between text-sm text-gray-700 mt-2">
              <span>R$ {priceRange[0]}</span>
              <span>R$ {priceRange[1]}</span>
            </div>
          </div>
        </div>

        {/* Grid de categorias */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-3">
          {/* Categoria "Todas" */}
          <button
            onClick={() => setSelectedCategory("")}
            className={`py-2 px-4 text-center rounded-lg font-medium ${
              selectedCategory === ""
                ? "bg-[#00008B] text-white"
                : "bg-gray-200 text-gray-700 hover:bg-gray-300"
            }`}
          >
            Todas
          </button>

          {/* Exibe as 10 principais categorias */}
          {categoriasPrincipais.map((categoria) => (
            <button
              key={categoria.categoriaId}
              onClick={() => setSelectedCategory(categoria.nome)}
              className={`py-2 px-4 text-center rounded-lg font-medium ${
                selectedCategory === categoria.nome
                  ? "bg-[#00008B] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}
            >
              {categoria.nome}
            </button>
          ))}

          {/* Botão para abrir o dropdown */}
          {categoriasRestantes.length > 0 && (
            <div className="relative">
              <button
                onClick={toggleDropdown}
                className="py-2 px-4 text-center rounded-lg font-medium bg-gray-200 text-gray-700 hover:bg-gray-300"
              >
                Outras Categorias
              </button>

              {/* Dropdown de categorias adicionais */}
              {dropdownOpen && (
                <div className="absolute z-10 bg-white shadow-md rounded-lg p-2 mt-2 w-48">
                  {categoriasRestantes.map((categoria) => (
                    <button
                      key={categoria.categoriaId}
                      onClick={() => {
                        setSelectedCategory(categoria.nome);
                        toggleDropdown();
                      }}
                      className={`block w-full text-left py-2 px-4 rounded-lg font-medium ${
                        selectedCategory === categoria.nome
                          ? "bg-[#00008B] text-white"
                          : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                      }`}
                    >
                      {categoria.nome}
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FiltrosProdutos;
