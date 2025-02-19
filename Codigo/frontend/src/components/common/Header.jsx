import React from 'react'
import '../styles/header.css'
import { Link } from "react-router-dom";
import { useAuth } from '../contexts/AuthProvider';
import home from '../../json/home.json'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react'
import LogoutModal from './LogoutModal';


const Header = () => {
    const { userType } = useAuth()

    const { logout } = useAuth();
    const navigate = useNavigate();

    const [showModal, setShowModal] = useState(false);
    const handleShow = () => setShowModal(true);
    const handleClose = () => setShowModal(false);
    const handleLogout = () => {
        logout();
        navigate('/');
        handleClose();
    };


    return (
        <>
            <nav className="custom-navbar navbar navbar navbar-expand-md navbar-dark bg-dark" arial-label="Furni navigation bar">

                <div className="container">
                    <Link className="navbar-brand" to={"/"}>casa&condominio.bh</Link>

                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarsFurni" aria-controls="navbarsFurni" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="" id="navbarsFurni">
                        <ul className="custom-navbar-nav navbar-nav ms-auto mb-2 mb-md-0">
                            <li className="nav-item active">
                                <Link className="nav-link" to={"/"}><i className="fa-solid fa-shop me-2"></i>{home.header.home}</Link>
                            </li>
                            {
                                userType === 'ROLE_USER' ?
                                    (
                                        <>
                                            <ul className="navbar-nav mb-2 mb-md-0 ms-4">
                                                <li className="nav-item">
                                                    <Link className="nav-link " to={"/listagem-produtos"}>
                                                        <i className="fa-solid fa-list me-2"></i> Produtos
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link " to={"/quem-somos"}>
                                                        <i className="fa-regular fa-user me-2"></i> Quem Somos
                                                </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link " to={"/perfil"}>
                                                        <i className="fa-regular fa-user me-2"></i> Perfil
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link text-dark" to={"/carrinho"}>
                                                        <i className="fa-solid fa-cart-shopping"></i> Carrinho
                                                    </Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link text-dark" onClick={handleShow}>
                                                        Sair
                                                    </Link>
                                                </li>
                                            </ul>

                                            {/* Modal */}
                                            <LogoutModal show={showModal} handleClose={handleClose} onLogout={handleLogout} />
                                        </>

                                    )
                                    : userType === 'ROLE_ADMIN' ?
                                        (
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link " to={"/listagem-produtos"}>
                                                        <i className="fa-regular fa-user me-2"></i> Controle de Estoque
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link " to={"/cadastro-admin"}>
                                                        <i className="fa-regular fa-user me-2"></i> Controle de acesso
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link " to={"/admin/cadastrar-about-us"}>
                                                        <i className="fa-regular fa-user me-2"></i> Editar Quem Somos
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link " to={"/perfil"}>
                                                        <i className="fa-regular fa-user me-2"></i> Perfil
                                                    </Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link  text-dark" onClick={handleShow}>
                                                        Sair
                                                    </Link>
                                                </li>
                                                <LogoutModal show={showModal} handleClose={handleClose} onLogout={handleLogout} />
                                            </>
                                        ) : (
                                            <>
                                                <li className="nav-item">
                                                    <Link className="nav-link " to={"/listagem-produtos"}>Produtos
                                                    </Link>
                                                </li>
                                                <li>
                                                    <Link className="nav-link text-dark" to={"/cadastrar-cliente"}>Cadastrar</Link>
                                                </li>
                                                <li className="nav-item">
                                                    <Link className="nav-link text-dark" to={"/login"}><i className="fa-regular fa-user"></i> Entrar</Link>
                                                </li>

                                                <li className="nav-item">
                                                    <Link className="nav-link text-dark" to={"/login"}>
                                                        <i className="fa-solid fa-cart-shopping"></i> Carrinho
                                                    </Link>
                                                </li>
                                            </>
                                        )
                            }
                        </ul>

                    </div>
                </div>

            </nav>
        </>

    )
}

export default Header