import React from 'react';
import { Link } from 'react-router-dom';
import CarrinhoService from '../service/CarrinhoService';
import { useAuth } from '../contexts/AuthProvider';
import '../../assets/css/ProdutoCard.css';
import { useNotification } from '../contexts/NotificacaoProvider';


const ProdutoCard = (props) => {
    const { token } = useAuth();
    const { showNotification } = useNotification();


    const salvarProduto = async (e) => {
        e.preventDefault();
        try {
            const response = await CarrinhoService.adicionarProduto(props.id, token);
            showNotification('Produto adicionado ao carrinho!', 'success');
            console.log(response);
        } catch (error) {
            showNotification('Erro ao adicionar produto ao carrinho.', 'danger');
        }
    };

    return (
        <div className="col-12 col-md-4 col-lg-3 mb-5">
            <div className="card position-relative" style={{ width: '100%', minHeight: '450px', borderRadius: '8px', overflow: 'hidden', backgroundColor: '#f0f0f0' }}>
                
                <Link to={`/produto/${props.id}`} style={{ display: 'block', height: '250px', overflow: 'hidden' }}>
                    {props.img ? (
                        <img 
                            src={`data:image/jpeg;base64,${props.img}`} 
                            className="card-img-top" 
                            alt={props.nome} 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    ) : (
                        <Link to={`/editar-produto/${props.id}`} className="no-image-link" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '250px', backgroundColor: '#f0f0f0', color: '#888' }}>
                            <div>
                                <i className="fas fa-image" style={{ fontSize: '48px' }}></i>
                                <p>Não possui imagem</p>
                            </div>
                        </Link>
                    )}
                </Link>

                <div className="card-body text-center">
                    <h3 className="card-title mb-2" style={{ fontSize: '1rem', fontWeight: 'bold', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {props.nome}
                    </h3>
                    
                    {/* Descrição do Produto */}
                    <p className="card-description text-muted" style={{ fontSize: '0.875rem', minHeight: '40px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden', textOverflow: 'ellipsis', lineHeight: '1.2' }}>
                        {props.descricao}
                    </p>
                    
                    <p className="card-text mt-2" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>R$ {props.preco}</p>

                    <div className="d-grid gap-2 mt-3">
                        <button 
                            className="btn animacao-btn text-black bg-white p-2" 
                            style={{ borderRadius: '4px', border: '2px solid black', width: '100%' }}
                            onClick={salvarProduto}
                        >
                            adicionar à sacola
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdutoCard;
