import React, { useEffect, useState } from 'react';
import QuemSomosService from '../service/QuemSomosService';
import { useAuth } from '../contexts/AuthProvider';
import Header from '../common/Header';
import Footer from '../common/Footer';
import alerta from '../../js/alert';

const AboutUs = () => {
    const { token } = useAuth();
    const [aboutUsContent, setAboutUsContent] = useState({ titulo: '', descricao: '' });

    useEffect(() => {
        const fetchAboutUsContent = async () => {
            try {
                const data = await QuemSomosService.getQuemSomos(token);
                setAboutUsContent(data);
            } catch (error) {
                console.error('Erro ao carregar informações de "Quem Somos":', error);
                alerta('danger', 'Erro ao carregar as informações de "Quem Somos". Tente novamente mais tarde.');
            }
        };

        if (token) {
            fetchAboutUsContent();
        } else {
            alerta('danger', 'Usuário não autenticado. Por favor, faça login.');
        }
    }, [token]);

    return (
        <>
            <Header />
            <div id="alert-container" className="mb-3"></div> {/* Container para exibir os alertas */}
            <div className="container mt-4">
                {aboutUsContent.titulo ? (
                    <>
                        <h1 className="text-center" style={{ fontSize: '3rem' }}>{aboutUsContent.titulo}</h1>
                        <div style={{ whiteSpace: 'pre-wrap' }}>
                            {aboutUsContent.textoApresentacao}
                        </div>
                    </>
                ) : (
                    <p className="text-center">Carregando informações...</p>
                )}
            </div>
            <Footer />
        </>
    );
};

export default AboutUs;
