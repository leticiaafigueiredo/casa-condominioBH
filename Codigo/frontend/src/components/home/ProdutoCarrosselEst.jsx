import React, { useEffect, useState } from 'react';
import { useAuth } from '../contexts/AuthProvider';
import ProdutoCard from './ProdutoCard';
import ProdutoCardAdmin from './ProdutoCardAdmin';
import { Link } from 'react-router-dom';

const ProdutoCarrosselEst = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const { token, userType } = useAuth();

    useEffect(() => {
        const fetchProdutos = async () => {
            try {
                const response = await fetch(`http://localhost:8080/produto/listagem`, {
                    headers: {
                        Authorization: token
                    }
                });
                if (!response.ok) throw new Error('Erro ao buscar produtos');
                const data = await response.json();
                setProdutos(data);
                setLoading(false);
            } catch (err) {
                setError('Erro ao carregar produtos');
                setLoading(false);
            }
        };

        fetchProdutos();
    }, [token]);

    const handleDeleteProduct = (productId) => {
        setProdutos((prevProdutos) => prevProdutos.filter((produto) => produto.produtoId !== productId));
    };

    if (loading) {
        return <p>Carregando produtos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="product-section">
            <div className="container">
                <div className="row">
                    {produtos.map((produto, index) => {
                        const imagemProduto = produto.images && produto.images.length > 0
                            ? produto.images[0].image
                            : null; // `null` se não houver imagem


                        const categoria = produto.categorias[0] ? produto.categorias[0].nome : 'Sem categoria';
                        const quantidade = produto.quantidade || 0;
                        return userType === 'ROLE_ADMIN' ? (
                            <ProdutoCardAdmin
                                key={index}
                                id={produto.produtoId}
                                nome={produto.nome}
                                img={imagemProduto}
                                preco={produto.preco}
                                categoria={categoria}
                                quantidade={quantidade}

                                onDelete={handleDeleteProduct} // Passa a função handleDeleteProduct
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

                {/* Botão Ver Mais */}
                <div className="flex justify-center mt-6">
                    <Link
                        to="/listagem-produtos"
                        className="px-8 py-3 text-white bg-[#00008B] hover:bg-[#00006B] transition-all"
                        style={{
                            borderRadius: '4px',
                            border: 'none',
                            fontWeight: '500',
                            textAlign: 'center',
                            textDecoration: 'none', // Remove text decoration
                            minWidth: '200px', // Largura mínima ajustada
                        }}
                    >
                        Ver Mais
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default ProdutoCarrosselEst;
