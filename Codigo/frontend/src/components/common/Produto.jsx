// src/components/ProductDetail.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import Header from './Header';

const ProductDetail = () => {
  const { produtoId } = useParams();
  const [produto, setProduto] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { userType, token } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProduto = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/produto/${produtoId}`, {
          headers: {
            Authorization: token
          }
        });
        const produtoData = response.data;
        setProduto(produtoData);

        if (produtoData.images && produtoData.images.length > 0) {
          const imageData = `data:image/jpeg;base64,${produtoData.images[0].image}`;
          setMainImage(imageData);
        }
      } catch (error) {
        console.error('Erro ao buscar produto:', error);
        setError('Erro ao carregar o produto.');
      } finally {
        setLoading(false);
      }
    };

    fetchProduto();
  }, [produtoId, token]);

  const handleDelete = async () => {
    if (window.confirm('Tem certeza de que deseja excluir este produto?')) {
      try {
        await axios.delete(`http://localhost:8080/produto/${produtoId}`, {
          headers: {
            Authorization: token
          }
        });
        alert('Produto excluído com sucesso.');
        navigate('/listagem-produtos');
      } catch (error) {
        console.error('Erro ao excluir o produto:', error);
        alert('Erro ao excluir o produto.');
      }
    }
  };

  const salvarProduto = async () => {
    try {
      await axios.post(
        `http://localhost:8080/carrinho/adicionar`,
        { produtoId, quantidade: 1 }, // Ajuste a quantidade conforme necessário
        {
          headers: {
            Authorization: token
          }
        }
      );
      alert('Produto adicionado ao carrinho com sucesso.');
    } catch (error) {
      console.error('Erro ao adicionar produto ao carrinho:', error);
      alert('Erro ao adicionar produto ao carrinho.');
    }
  };

  if (loading) {
    return (
      <>
        <Header />
        <div className="text-center mt-10">Carregando...</div>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Header />
        <div className="text-center mt-10 text-red-500">{error}</div>
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="max-w-6xl mx-auto p-4">
        <div className="flex flex-col md:flex-row md:space-x-8">
          {/* Imagens */}
          <div className="md:w-1/2">
            <div className="mb-4">
              <img
                src={mainImage}
                alt={produto.nome}
                className="w-full h-auto object-cover rounded-lg shadow-md"
              />
            </div>
            {/* Miniaturas */}
            {produto.images && produto.images.length > 1 && (
              <div className="flex space-x-2 overflow-x-auto">
                {produto.images.map((imageObj, index) => {
                  const imageData = `data:image/jpeg;base64,${imageObj.image}`;
                  return (
                    <img
                      key={index}
                      src={imageData}
                      alt={`Imagem ${index + 1}`}
                      className={`w-20 h-20 object-cover rounded cursor-pointer border ${
                        imageData === mainImage ? 'border-blue-500' : 'border-transparent'
                      }`}
                      onClick={() => setMainImage(imageData)}
                    />
                  );
                })}
              </div>
            )}
          </div>

          {/* Detalhes do Produto */}
          <div className="md:w-1/2">
            <h1 className="text-3xl font-bold mb-4">{produto.nome}</h1>
            <p className="text-lg mb-4">{produto.descricao}</p>
            <p className="text-2xl font-semibold text-green-600 mb-6">Preço: R${produto.preco}</p>

            {/* Renderização condicional dos botões */}
            {userType === 'ROLE_ADMIN' ? (
              <div className="grid gap-2">
                <button
                  className="w-full p-2 bg-yellow-500 text-white font-semibold rounded hover:bg-yellow-600"
                  onClick={() => navigate(`/editar-produto/${produtoId}`)}
                >
                  Editar Produto
                </button>
                <button
                  className="w-full p-2 bg-red-600 text-white font-semibold rounded hover:bg-red-700"
                  onClick={handleDelete}
                >
                  Excluir Produto
                </button>
              </div>
            ) : (
              <div className="grid gap-2">
                <button
                  className="w-full p-2 bg-blue-600 text-white font-semibold rounded hover:bg-blue-700"
                  onClick={salvarProduto}
                >
                  Adicionar à Sacola
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetail;
