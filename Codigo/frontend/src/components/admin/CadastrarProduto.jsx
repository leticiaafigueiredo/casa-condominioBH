import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthProvider';
import { useNavigate } from 'react-router-dom';
import Header from '../common/Header';
import SAMPLE_IMAGE from '../../assets/images/background_option3.jpg'; // Adicione a imagem desejada na pasta de assets
import { useNotification } from '../contexts/NotificacaoProvider';


const CadastrarProduto = () => {
    const { token } = useAuth();
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    const [produto, setProduto] = useState({
        nome: '',
        descricao: '',
        quantidade: '',
        preco: '',
        categoriasIds: []
    });
    const [imagens, setImagens] = useState([]);
    const [categorias, setCategorias] = useState([]);

    useEffect(() => {
        const fetchCategorias = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8080/categoria/getAll', {
                    headers: {
                        Authorization: token,
                    },
                });
                setCategorias(response.data);
            } catch (error) {
                console.error('Erro ao carregar categorias:', error);
            }
        };
        fetchCategorias();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setProduto({ ...produto, [name]: value });
    };

    const handleFileChange = (e) => {
        setImagens(e.target.files);
    };

    const handleSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions);
        const selectedIds = options.map(option => option.value);
        setProduto({ ...produto, categoriasIds: selectedIds });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const responseProduto = await axios.post('http://127.0.0.1:8080/produto/cadastrar', produto, {
                headers: {
                    Authorization: token
                },
            });
            const produtoId = responseProduto.data.produtoId;

            const formData = new FormData();
            for (let i = 0; i < imagens.length; i++) {
                formData.append('images', imagens[i]);
            }

            await axios.post(`http://127.0.0.1:8080/imagem/${produtoId}/cadastrar`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: token,
                },
            });

            showNotification('Produto cadastrado com sucesso!', 'success');
            navigate('/');
        } catch (error) {
            console.error('Erro ao cadastrar produto:', error);
            showNotification('Erro ao cadastrar produto.', 'danger');
        }
    };

    return (
        <>
            <Header />
            <div className="overlay" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0, 0, 0, 0.6)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
                <div className="modal-content d-flex" style={{ backgroundColor: '#fff', padding: '2rem', borderRadius: '8px', width: '800px', maxWidth: '90%', boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)', display: 'flex', flexDirection: 'row' }}>
                    
                    {/* Seção da Imagem */}
                    <div className="modal-image" style={{ flex: '1', paddingRight: '1rem' }}>
                        <img src={SAMPLE_IMAGE} alt="Produto Exemplo" style={{ width: '100%', height: '100%', borderRadius: '8px', objectFit: 'cover' }} />
                    </div>

                    {/* Seção do Formulário */}
                    <div className="modal-form" style={{ flex: '1', paddingLeft: '1rem' }}>
                        <h2 className="text-center mb-4">Cadastrar Novo Produto</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="mb-3">
                                <label className="form-label">Nome:</label>
                                <div className="input-group">
                                    <span className="input-group-text"><i className="fas fa-tag"></i></span>
                                    <input type="text" className="form-control" name="nome" value={produto.nome} onChange={handleInputChange} required />
                                </div>
                            </div>
                            
                            <div className="mb-3">
                                <label className="form-label">Descrição:</label>
                                <textarea name="descricao" className="form-control" value={produto.descricao} onChange={handleInputChange} required></textarea>
                            </div>

                            <div className="mb-3 row">
                                <div className="col-6">
                                    <label className="form-label">Quantidade:</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-box"></i></span>
                                        <input type="number" className="form-control" name="quantidade" value={produto.quantidade} onChange={handleInputChange} required />
                                    </div>
                                </div>
                                <div className="col-6">
                                    <label className="form-label">Preço:</label>
                                    <div className="input-group">
                                        <span className="input-group-text"><i className="fas fa-dollar-sign"></i></span>
                                        <input type="number" className="form-control" name="preco" value={produto.preco} onChange={handleInputChange} required />
                                    </div>
                                </div>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Categorias:</label>
                                <select multiple className="form-select" onChange={handleSelectChange} required>
                                    {categorias.map(categoria => (
                                        <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                            {categoria.nome}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Imagem:</label>
                                <input type="file" className="form-control" multiple onChange={handleFileChange} required />
                            </div>

                            <button type="submit" className="btn btn-dark w-100">Cadastrar Produto</button>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CadastrarProduto;
