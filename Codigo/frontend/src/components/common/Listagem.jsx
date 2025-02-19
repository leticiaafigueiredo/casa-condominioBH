import React, { useEffect, useState } from "react";
import { useAuth } from '../contexts/AuthProvider';
import axios from "axios";
import FiltrosProdutos from "./FiltrosProdutos";
import Header from "./Header";
import ProdutoCard from "../home/ProdutoCard";
import ProdutoCardAdmin from "../home/ProdutoCardAdmin";
import FooterAdmin from "../admin/FooterAdmin";

const ListagemProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const { token, userType } = useAuth();
    const [filtros, setFiltros] = useState({
        searchTerm: "",
        priceRange: [0, 0],
        selectedCategory: "",
    });
    const [maxPrice, setMaxPrice] = useState(0);

    const [currentPage, setCurrentPage] = useState(1);
    const produtosPorPagina = 12;

    const indexInicio = (currentPage - 1) * produtosPorPagina;
    const indexFim = indexInicio + produtosPorPagina;

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await axios.get("http://127.0.0.1:8080/produto/listagem");
                const produtosData = response.data;


                const maiorPreco = Math.max(...produtosData.map((produto) => Number(produto.preco)));
                setMaxPrice(maiorPreco);

                setFiltros((prevFiltros) => ({
                    ...prevFiltros,
                    priceRange: [0, maiorPreco],
                }));

                setProdutos(produtosData);
            } catch (error) {
                console.error("Erro ao buscar produtos:", error);
            }
        };

        fetchProdutos();
    }, []);

    const produtosFiltrados = produtos.filter((produto) => {
        const preco = Number(produto.preco);
        const matchesSearch = produto.nome.toLowerCase().includes(filtros.searchTerm.toLowerCase());
        const matchesCategory =
            filtros.selectedCategory === "" ||
            Array.from(produto.categorias).some((categoria) => categoria.nome === filtros.selectedCategory);
        const matchesPrice =
            preco >= filtros.priceRange[0] && preco <= filtros.priceRange[1];


        return matchesSearch && matchesCategory && matchesPrice;
    });

    const produtosExibidos = produtosFiltrados.slice(indexInicio, indexFim);

    const totalPaginas = Math.ceil(produtosFiltrados.length / produtosPorPagina);

    const handleProximaPagina = () => {
        if (currentPage < totalPaginas) {
            setCurrentPage(currentPage + 1);
        }
    };

    const handlePaginaAnterior = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const handlePaginaEspecifica = (numeroPagina) => {
        setCurrentPage(numeroPagina);
    };

    const renderNumerosPaginas = () => {
        const paginas = [];
        const inicio = Math.max(1, currentPage - 2); // Mostra 2 antes da página atual
        const fim = Math.min(totalPaginas, currentPage + 2); // Mostra 2 depois da página atual

        for (let i = inicio; i <= fim; i++) {
            paginas.push(
                <button
                    key={i}
                    onClick={() => handlePaginaEspecifica(i)}
                    className={`px-3 py-2 mx-1 rounded ${currentPage === i
                        ? "bg-blue-500 text-white"
                        : "bg-gray-300 text-gray-700"
                        }`}
                >
                    {i}
                </button>
            );
        }

        if (inicio > 1) paginas.unshift(<span key="start">...</span>);
        if (fim < totalPaginas) paginas.push(<span key="end">...</span>);

        return paginas;
    };

    const renderTitulo = () => {
        if (userType === 'ROLE_ADMIN') {
            return (
                <div className="text-center mb-6 mt-5">
                    <h1 className="text-3xl font-semibold text-[#00008B]">Controle de Estoque</h1>
                    <p className="text-sm text-gray-500">Gerencie seus produtos de forma eficiente</p>
                </div>
            );
        } else {
            return (
                <div className="text-center mb-6 mt-5">
                    <h1 className="text-3xl font-semibold text-[#00008B]">Produtos da Loja</h1>
                    <p className="text-sm text-gray-500">Explore os produtos disponíveis</p>
                </div>
            );
        }
    };



    return (
        <>
            <Header />
            {/* Título */}


            {renderTitulo()}

            <div className="container mx-auto p-4">
                <FiltrosProdutos onFilterChange={setFiltros} maxPrice={maxPrice} />
                <div className="row">
                    {produtosFiltrados.map((produto, index) => {
                        // Verifica se existe uma imagem associada ao produto
                        const imagemProduto = produto.images && produto.images.length > 0
                            ? produto.images[0].image
                            : null;

                        // Obtém a primeira categoria do produto ou usa "Sem categoria"
                        const categoria = produto.categorias && produto.categorias.length > 0
                            ? produto.categorias[0].nome
                            : 'Sem categoria';

                        // Define a quantidade (ou 0 se não estiver definida)
                        const quantidade = produto.quantidade || 0;

                        // Renderiza o card de acordo com o tipo de usuário
                        return userType === 'ROLE_ADMIN' ? (
                            <ProdutoCardAdmin
                                key={index}
                                id={produto.produtoId}
                                nome={produto.nome}
                                img={imagemProduto}
                                preco={produto.preco}
                                categoria={categoria}
                                quantidade={quantidade}
                            />
                        ) : (
                            <ProdutoCard
                                key={index}
                                id={produto.produtoId}
                                nome={produto.nome}
                                img={imagemProduto}
                                preco={produto.preco}
                                descricao={produto.descricao}
                            />
                        );
                    })}
                </div>

                <div className="flex justify-center items-center mt-6">
                    <button
                        onClick={handlePaginaAnterior}
                        disabled={currentPage === 1}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        {"<"}
                    </button>
                    <div className="flex">
                        {renderNumerosPaginas()}
                    </div>
                    <button
                        onClick={handleProximaPagina}
                        disabled={currentPage === totalPaginas}
                        className="px-4 py-2 mx-2 bg-gray-300 rounded disabled:opacity-50"
                    >
                        {">"}
                    </button>
                </div>

            </div>
            <FooterAdmin />

        </>
    );

};

export default ListagemProdutos;
