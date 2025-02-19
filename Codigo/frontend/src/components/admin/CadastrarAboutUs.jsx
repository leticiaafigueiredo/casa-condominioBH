import React, { useState, useEffect } from 'react';
import QuemSomosService from '../service/QuemSomosService';
import { useAuth } from '../contexts/AuthProvider';
import Header from '../common/Header';
import alerta from '../../js/alert';
import { useNotification } from '../contexts/NotificacaoProvider';

const CadastrarAboutUs = () => {
    const { showNotification } = useNotification();
    const { token } = useAuth();
    const [aboutUsContent, setAboutUsContent] = useState({
        titulo: '',
        descricao: ''
    });

    useEffect(() => {
        const fetchQuemSomos = async () => {
            try {
                const data = await QuemSomosService.getQuemSomos(token);
                setAboutUsContent(data);
            } catch (error) {
                console.error('Erro ao buscar informações de "Quem Somos":', error);
            }
        };

        fetchQuemSomos();
    }, [token]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setAboutUsContent({ ...aboutUsContent, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await QuemSomosService.saveOrUpdateQuemSomos(aboutUsContent, token);
            alerta('success', 'Informações de "Quem Somos" cadastradas com sucesso!'); // Sucesso
        } catch (error) {
            console.error('Erro ao cadastrar informações:', error);
            alerta('danger', 'Erro ao cadastrar informações.'); // Erro
        }
    };

    return (
        <>
            <Header />
            <h1 className="text-center mt-4">Cadastrar Informações de "Quem Somos"</h1>
            <div id="alert-container" className="mb-3"></div> {/* Container para exibir os alertas */}
            <form onSubmit={handleSubmit} className="container mt-4">
                <div className="mb-3">
                    <label className="form-label" htmlFor="titulo">Título:</label>
                    <input
                        type="text"
                        className="form-control"
                        name="titulo"
                        value={aboutUsContent.titulo}
                        onChange={handleInputChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label" htmlFor="descricao">Descrição:</label>
                    <textarea
                        className="form-control"
                        name="textoApresentacao"
                        value={aboutUsContent.descricao}
                        onChange={handleInputChange}
                        rows="10"
                        style={{ minHeight: '150px' }}
                        required
                    ></textarea>
                </div>
                <button className="btn btn-primary" type="submit">Cadastrar Informações</button>
            </form>
        </>
    );
};

export default CadastrarAboutUs;
