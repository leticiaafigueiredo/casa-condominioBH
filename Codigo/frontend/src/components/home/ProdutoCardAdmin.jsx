import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthProvider';
import '../../assets/css/produtoCard.css';
import { useNotification } from '../contexts/NotificacaoProvider';

const ProdutoCardAdmin = (props) => {
    const { token } = useAuth();
    const { showNotification } = useNotification();


    const handleDelete = async () => {
        if (window.confirm('Tem certeza de que deseja excluir este produto?')) {
            try {
                const response = await fetch(`http://127.0.0.1:8080/produto/${props.id}`, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': token
                    }
                });

                if (response.ok) {
                    showNotification('Produto excluído com sucesso!', 'succes');
                    props.onDelete(props.id);
                } else {
                    showNotification('Erro ao excluir o produto.');
                }
            } catch (error) {
                showNotification('Ocorreu um erro ao tentar excluir o produto.');
            }
        }
    };


    return (
        <div className="col-12 col-md-4 col-lg-3 mb-5">
            <div className="card position-relative" style={{ width: '100%', minHeight: '450px', borderRadius: '8px', overflow: 'hidden' }}>
                
                {/* Badge de Categoria */}
                <span className="badge position-absolute top-0 start-0 m-2 text-uppercase" style={{ fontSize: '0.75rem', padding: '0.4rem 0.6rem', backgroundColor: '#00008B'}}>
                    {props.categoria}
                </span>

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
                    <strong className="text-muted m-3">Estoque: {props.quantidade} exemplares</strong>
                    <p className="card-text mt-2" style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#333' }}>R$ {props.preco}</p>

                    <div className="d-grid gap-2 mt-3">
                        <Link to={`/editar-produto/${props.id}`}>
                            <button 
                                className="btn text-black animacao-btn bg-white p-2" 
                                style={{ borderRadius: '4px', border: '2px solid #ffc107', width: '100%' }}
                            >
                                editar produto
                            </button>
                        </Link>
                        <button 
                            className="btn text-black bg-white animacao-btn p-2 mt-2" 
                            style={{borderRadius: '4px', border: '2px solid #dc3545', width: '100%' }}
                            onClick={handleDelete}
                        >
                            excluir produto
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProdutoCardAdmin;
