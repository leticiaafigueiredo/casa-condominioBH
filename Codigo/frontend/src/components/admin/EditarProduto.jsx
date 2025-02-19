import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate  } from 'react-router-dom';
import Header from '../common/Header';
import ConfirmationModal from './ConfirmationModal'; 
import BACKGROUND_IMAGE from '../../assets/images/background_option2.jpg';
import { useNotification } from '../contexts/NotificacaoProvider';
import { useAuth } from '../contexts/AuthProvider';


const EditarProduto = () => {
    const { id } = useParams();
    const {token} = useAuth()
    const [produto, setProduto] = useState(null);
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        quantidade: '',
        preco: '',
        categorias: [],
        imagens: [],
    });
    const [categorias, setCategorias] = useState([]);
    const [imagemIdToDelete, setImagemIdToDelete] = useState(null); 
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const navigate = useNavigate();
    const { showNotification } = useNotification();

    useEffect(() => {
        const fetchProduto = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/produto/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                const produto = response.data;

                console.log("Produto data:", produto);

                if (produto) {
                    const imagens = Array.isArray(produto.images)
                        ? produto.images.map(img => ({
                            src: `data:${img.mimeType};base64,${img.image}`,
                            id: img.id, // Assumindo que cada imagem tem um ID único
                        }))
                        : [];

                    setProduto(produto);
                    setFormData({
                        nome: produto.nome,
                        descricao: produto.descricao,
                        quantidade: produto.quantidade,
                        preco: produto.preco,
                        categorias: Array.isArray(produto.categorias) ? produto.categorias.map(cat => cat.categoriaId) : [],
                        imagens: imagens,
                    });
                } else {
                    console.error('Produto não encontrado ou estrutura de dados inesperada');
                }
            } catch (error) {
                console.error('Erro ao buscar o produto:', error);
            }
        };

        const fetchCategorias = async () => {
            try {
                const response = await axios.get(`http://localhost:8080/categoria/getAll`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                console.log("Categorias data:", response.data);
                setCategorias(response.data);
            } catch (error) {
                console.error('Erro ao buscar categorias:', error);
            }
        };

        fetchProduto();
        fetchCategorias();
    }, [id, token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSelectChange = (e) => {
        const options = Array.from(e.target.selectedOptions);
        const values = options.map(option => option.value);
        setFormData((prev) => ({ ...prev, categorias: values }));
    };

    const openDeleteModal = (index) => {
        setImagemIdToDelete(formData.imagens[index].id); // Define o ID da imagem para deletar
        setShowDeleteModal(true);
    };

    const confirmDeleteImage = async () => {
        try {
            await axios.delete(`http://localhost:8080/imagem/deletar/${imagemIdToDelete}`, {
                headers: {
                    Authorization: token,
                },
            });
            setFormData((prev) => ({
                ...prev,
                imagens: prev.imagens.filter((img) => img.id !== imagemIdToDelete),
            }));
            setShowDeleteModal(false);
        } catch (error) {
            console.error('Erro ao deletar a imagem:', error);
        }
    };

    const handleImageUpload = async (event, index) => {
        const file = event.target.files[0];
        if (file) {
            const formData = new FormData();
            formData.append('images', file);
    
            try {
                const response = await axios.post(
                    `http://localhost:8080/imagem/${id}/cadastrar`,
                    formData,
                    {
                        headers: {
                            Authorization: token,
                            'Content-Type': 'multipart/form-data',
                        },
                    }
                );
    
                const novaImagem = response.data[0]; // Considerando que o ID da nova imagem está na resposta
    
                // Atualiza o estado da imagem no slot específico
                setFormData((prev) => {
                    const updatedImages = [...prev.imagens];
                    updatedImages[index] = { src: URL.createObjectURL(file), id: novaImagem.id };
                    return { ...prev, imagens: updatedImages };
                });
            } catch (error) {
                console.error('Erro ao fazer upload da imagem:', error);
            }
        }
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();
        const dataToSubmit = {
            nome: formData.nome,
            descricao: formData.descricao,
            quantidade: formData.quantidade,
            preco: formData.preco,
            categoriasIds: formData.categorias,
        };

        try {
            await axios.put(`http://localhost:8080/produto/atualizar/${id}`, dataToSubmit, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json',
                },
            });
            showNotification('Produto atualizado com sucesso!', 'success');
            navigate('/');
        } catch (error) {
            console.error('Erro ao atualizar o produto:', error);
            showNotification('Erro ao atualizar produto.', 'danger');
        }
    };

    const renderImageOrPlaceholder = (image, index) => {
        if (image) {
            return (
                <div className="relative flex flex-col overflow-hidden rounded-lg">
                    <img
                        src={image.src}
                        alt={`Produto ${index + 1}`}
                        style={{
                            width: '100%',
                            objectFit: 'cover',
                        }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-900/25 to-gray-900/5"></div>
                    <button
                        className="absolute top-2 right-2 bg-vibrant-red text-white p-2 rounded-full hover:bg-dark-blue-hover flex items-center justify-center"
                        onClick={() => openDeleteModal(index)}
                    >
                        <i className="fas fa-trash-alt"></i>
                    </button>
                </div>
            );
        } else {
            return (
                <label className="relative flex items-center justify-center border-2 border-dashed rounded-lg cursor-pointer h-full">
                    <input type="file" className="hidden" onChange={(e) => handleImageUpload(e, index)} />
                    <div className="flex flex-col items-center justify-center text-gray-500">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                        </svg>
                        <span>Adicionar Imagem</span>
                    </div>
                </label>
            );
        }
    };
    
    return (
        <>
            <Header />
            <div className="container mt-4">
                <div className="row">
                    {/* Seção do Formulário */}
                    <div className="col-md-6">
                        <div className="p-4 rounded shadow-sm" style={{
                            backgroundImage: `url(${BACKGROUND_IMAGE})`,
                            backgroundSize: 'cover',
                            backgroundRepeat: 'no-repeat',
                            backgroundPosition: 'center',
                            padding: '1.5rem',
                        }}>
                            <div className="bg-white p-4 rounded shadow">
                                <h2 className="text-center mb-4">Editar Produto</h2>
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="nome" className="form-label">Nome:</label>
                                        <input type="text" id="nome" className="form-control" name="nome" value={formData.nome} onChange={handleInputChange} required />
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="descricao" className="form-label">Descrição:</label>
                                        <textarea id="descricao" name="descricao" className="form-control" value={formData.descricao} onChange={handleInputChange} required></textarea>
                                    </div>

                                    <div className="mb-3 row">
                                        <div className="col-md-6">
                                            <label htmlFor="quantidade" className="form-label">Quantidade:</label>
                                            <input type="number" id="quantidade" className="form-control" name="quantidade" value={formData.quantidade} onChange={handleInputChange} required />
                                        </div>
                                        <div className="col-md-6">
                                            <label htmlFor="preco" className="form-label">Preço:</label>
                                            <input type="number" id="preco" name="preco" className="form-control" value={formData.preco} onChange={handleInputChange} required />
                                        </div>
                                    </div>

                                    <div className="mb-3">
                                        <label htmlFor="categorias" className="form-label">Categorias:</label>
                                        <select multiple id="categorias" className="form-select" value={formData.categorias} onChange={handleSelectChange} required>
                                            {categorias.map((categoria) => (
                                                <option key={categoria.categoriaId} value={categoria.categoriaId}>
                                                    {categoria.nome}
                                                </option>
                                            ))}
                                        </select>
                                    </div>

                                    <button type="submit" className="btn btn-primary w-100">Atualizar Produto</button>
                                </form>
                            </div>
                        </div>
                    </div>

                    {/* Seção de Galeria de Imagens */}
                    <div className="col-md-6 py-4 px-2">
                        <h2 className="text-center mb-4">Fotos do Produto</h2>
                        <div className="grid grid-cols-2 gap-4 h-full items-stretch" style={{ maxHeight: '450px' }}>
                            {Array.from({ length: 4 }).map((_, index) => (
                                <div
                                    key={index}
                                    className="bg-gray-50 flex flex-col relative rounded-lg overflow-hidden"
                                    style={{ height: '100%' }}
                                >
                                    {renderImageOrPlaceholder(formData.imagens[index], index)}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Modal de Confirmação */}
            <ConfirmationModal
                show={showDeleteModal}
                handleClose={() => setShowDeleteModal(false)}
                onConfirm={confirmDeleteImage}
                title="Confirmar Exclusão"
                message="Tem certeza de que deseja excluir esta imagem?"
                confirmText="Excluir"
                cancelText="Cancelar"
            />
        </>
    );
};

export default EditarProduto;
