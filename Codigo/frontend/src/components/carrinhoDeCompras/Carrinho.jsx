import { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import Header from '../common/Header';
import axios from 'axios'
import Footer from '../common/Footer';
import CadaProduto from './CadaProduto';
import { useAuth } from '../contexts/AuthProvider';
import { Link } from 'react-router-dom'
import PaymentBrick from './PaymentBrinck';
import CarrinhoService from '../service/CarrinhoService';


const Carrinho = () => {
    const { token } = useAuth();
    const navigate = useNavigate();

    const [produtos, setProdutos] = useState([]);
    const [carrinho, setCarrinho] = useState({});
    const [error] = useState(null);
    const [loading, setLoading] = useState(true);
    const [preferenceId, setPreferenceId] = useState(null);
    const [url, setUrl] = useState(null)

    

    const fetchProdutos = async () => {

        try {
            const response = await CarrinhoService.getCarrinho(token)
            console.log("Produtos data:", response);
            setCarrinho(response);
            setProdutos(response.produtos);
            setLoading(false);
        } catch (error) {
            console.error('Erro ao carregar produtos:', error);
        }
    };

    const removerProdutoDoCarrinho = (id) => {
        const updatedProdutos = produtos.filter((produto) => produto.produtoId !== id);
        setProdutos(updatedProdutos);
        setCarrinho((prevCarrinho) => ({
            ...prevCarrinho,
            precoTotal: calculatePrecoTotal(updatedProdutos)
        }));
    };

    const calculatePrecoTotal = (produtos) => {
        return produtos.reduce((acc, produto) => acc + produto.preco * produto.quantidadeNoCarrinho, 0);
    };

    const atualizarProduto = (id, newQuantity) => {
        const updatedProdutos = produtos.map((produto) =>
            produto.produtoId === id ? { ...produto, quantidadeNoCarrinho: newQuantity } : produto
        );
        setProdutos(updatedProdutos);
        setCarrinho((prevCarrinho) => ({
            ...prevCarrinho,
            precoTotal: calculatePrecoTotal(updatedProdutos)
        }));
    };

    useEffect(() => {
        fetchProdutos();
    }, []);

    

    useEffect(() => {
        const fetchPreferenceId = async () => {
            try {
                const response = await fetch("http://localhost:8080/pagamento/v1/checkoutpro", {
                    method: "POST", 
                    headers: {
                        Authorization: `Bearer ${token}`, 
                        "Content-Type": "application/json", 
                    },
                    body: { },
                });

                if (!response.ok) {
                    throw new Error(`Erro na API: ${response.status}`);
                }

                const data = await response.json();
                setPreferenceId(data.id);
                setUrl(data.initPoint);
                navigate(url); 
            } catch (error) {
                console.error("Erro ao buscar preferência:", error);
            }
        };

        fetchPreferenceId();
    }, [token, navigate]); 

     if (loading) {
        return <p>Carregando produtos...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    } 

    return (
        <div>
            <Header />
            <div className="container mt-5">
                <div className="row justify-content-between">
                    <div className="col-lg-5">
                        <div className="intro-excerpt">
                            <h1>Carrinho</h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="untree_co-section before-footer-section">
                <div className="container">
                    <div className="site-blocks-table">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="product-thumbnail"></th>
                                    <th className="product-name">Produto</th>
                                    <th className="product-price">Preco</th>
                                    <th className="product-quantity">Quantidade</th>
                                    <th className="product-total">Total</th>
                                    <th className="product-remove">Remover</th>
                                </tr>
                            </thead>
                            <tbody>
                                {produtos.map((produto, index) => (
                                    <CadaProduto
                                        key={index}
                                        id={produto.produtoId}
                                        nome={produto.nome}
                                        img={produto.imagens.length > 0 ? produto.imagens[0].image : 'Não possui imagem'}
                                        preco={produto.preco}
                                        quantidade={produto.quantidadeNoCarrinho}
                                        atualizarProduto={atualizarProduto}
                                        removerProdutoDoCarrinho={removerProdutoDoCarrinho}
                                    />
                                ))}
                            </tbody>
                        </table>
                    </div>

                    <div className="row mt-5">
                        <div className="col-md-6">
                            <div className="row mb-5">
                                <div className="col-md-6 mb-3 mb-md-0">
                                    <Link to={"/"} className="btn btn-secondary me-2" >Continuar comprando</Link>
                                </div>
                            </div>
                            <div className="container-fluid mt-3">
      <div
        className="d-flex justify-content-center align-items-center"
        style={{
          backgroundColor: '#FFEB3B', // Amarelo
          color: '#000', // Texto preto
          padding: '15px',
          position: 'fixed',
          bottom: '0',
          left: '0',
          right: '0',
          zIndex: 9999, // Garante que o aviso ficará por cima dos outros componentes
          textAlign: 'center',
        }}
      >
        <p className="mb-0">
          Após a compra, você será redirecionado para o WhatsApp da loja para combinar a entrega.
        </p>
      </div>
    </div>
                        </div>
                        <div className="col-md-6 pl-5">
                            <div className="row justify-content-end">
                                <div className="col-md-7">
                                    <div className="row">
                                        <div className="col-md-12 text-right border-bottom mb-5">
                                            <h3 className="text-black h4 text-uppercase">Total do carrinho</h3>
                                        </div>
                                    </div>
                                    <div className="row mb-5">
                                        <div className="col-md-6">
                                            <span className="text-black">Total</span>
                                        </div>
                                        <div className="col-md-6 text-right">
                                            <strong className="text-black">R$ {carrinho.precoTotal}</strong>
                                        </div>
                                    </div>

                                    <div className="row">
                                        <div className="col-md-12">
                                            <div id="wallet_container">
                                            <PaymentBrick  
                                                className='btn btn-secondary btn-lg'
                                                preferenceId = {preferenceId}
                                                ></PaymentBrick>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Carrinho;
