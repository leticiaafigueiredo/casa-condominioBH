import React, { useEffect, useState } from "react";
import ProdutoService from "../service/ProdutoService";
import ProdutoCard from "./ProdutoCard";
import { useAuth } from '../contexts/AuthProvider'


const ProdutosCarrossel = () => {
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { token } = useAuth();

  useEffect(() => {
    const fetchProdutos = async () => {
      try {
        const data = await ProdutoService.getAllProdutos(token);
        setProdutos(data.slice(0, 30)); // Limita a lista a 30 produtos
        setLoading(false);
      } catch (err) {
        setError("Erro ao carregar produtos.");
        setLoading(false);
      }
    };

    fetchProdutos();
  }, []);

  if (loading) {
    return <p>Carregando...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  // Função para dividir os produtos em grupos para cada slide do carrossel
  const chunkArray = (arr, size) => {
    const result = [];
    for (let i = 0; i < arr.length; i += size) {
      result.push(arr.slice(i, i + size));
    }
    return result;
  };

  const slides = chunkArray(produtos, 4); // Agrupa 4 produtos por slide

  return (
    <div id="produtosCarrossel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-inner">
        {slides.map((slide, index) => (
          <div className={`carousel-item ${index === 0 ? "active" : ""}`} key={index}>
            <div className="row">
              {slide.map(produto => (
                <div className="col-md-3" key={produto.id}>
                  <ProdutoCard
                    titulo={produto.titulo}
                    descricao={produto.descricao}
                    preco={produto.preco}
                    avaliacao={produto.avaliacao}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="carousel-control-prev" type="button" data-bs-target="#produtosCarrossel" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#produtosCarrossel" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default ProdutosCarrossel;
