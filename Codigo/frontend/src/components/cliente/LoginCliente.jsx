import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../service/UserService'
import { useAuth } from '../contexts/AuthProvider';
import Header from '../common/Header';
import { useNotification } from '../contexts/NotificacaoProvider';


import COVER_IMAGE from '../../assets/images/login_img.jpg';

const colors = {
    primary: "#060606",
    background: "#E0E0E0",
    disabled: "#D9D9D9"

}

const LoginCliente = () => {
    const { showNotification } = useNotification();
    let navigate = useNavigate();
    const { login } = useAuth();


    const [credentials, setCredentials] = useState({
        email: "",
        senha: ""
    });

    const { email, senha } = credentials;

    const handleInputChange = (e) => {
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value,
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const response = await UserService.login(email, senha);
            login(response.token, response.role)
            showNotification('Login bem sucedido!', 'success');            
            setTimeout(() => navigate('/home'), 2500);
        } catch (error) {
            showNotification('Falha ao logar! Por favor, confira suas credenciais.', 'danger');
        }
    };

    return (
        <>
            <div className="w-full h-screen flex items-start">
                <div className="relative w-1/2 h-full flex flex-col">
                    <div className="absolute top-[20%] left-[10%] flex flex-col">
                        <h1 className="text-4xl text-white font-bold my-4">casa&condomínio.bh</h1>
                        <p className="text-3x1 text-white font-normal">Onde você encontra os produtos mais indispensáveis para o funcionamento da sua Casa e Condomínio.</p>
                    </div>
                    <img src={COVER_IMAGE} alt="" className="w-full h-full object-cover" />
                </div>

                <div className='w-1/2  h-full bg-[#f5f5f5] flex flex-col p-20 justify-between items-center'>

                    <div>

                    </div>

                    <h1 className='text-xl mx-auto text-[#060606] font-semibold max-w-[500px] mr-auto'>Casa & Condomínio BH</h1>

                    <div className='w-full flex flex-col max-w-[500px]'>
                        <div className='w-full flex flex-col mb-2'>
                            <h3 className='text-3x1 font-semibold mb-2'>Login</h3>
                            <p className='text-base mb-2'></p>
                        </div>

                        <div className='w-full flex flex-col'>
                            <input
                                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={email}
                                onChange={handleInputChange}
                                autoComplete="email"
                                placeholder="Email" />

                            <input
                                className="w-full text-black py-2 my-2 bg-transparent border-b border-black outline-none focus:outline-none"
                                type="password"
                                name="senha"
                                id="senha"
                                required
                                value={senha}
                                onChange={handleInputChange}
                                autoComplete="current-password"
                                placeholder="Senha" />

                        </div>

                        <div className='w-full flex items-center justify-between'>
                            <p className='text-sm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Esqueci a Senha.</p>
                        </div>

                        <div className='w-full flex flex-col my-4'>
                            <button type='submit' onClick={handleLogin} className='w-full text-white my-2 font-semibold bg-[#060606] rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                                Entrar
                            </button>

                            <button className='w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                                Registrar
                            </button>
                        </div>

                        {/* <div className='w-full flex items-center justify-center relative py-2'>
                        <div className='w-full h-[1px] bg-black'></div>
                        <p className='text-lg absolute text-black/80 bg-[#f5f5f5]'>ou</p>
                    </div>
                    <div className='w-full text-[#060606] my-2 font-demibold bg-white border border-black/40 rounded-md p-4 text-center flex items-center justify-center cursor-pointer'>
                        <img src={GOOGLE_ICON} className='h-6 mr-2' />
                            Entrar com o Google
                    </div> */}



                    </div>


                    <div className='w-full flex items-center justify-center'>
                        <p className='text-sm font-normal text-[#060606]'>Ainda não possui uma conta na loja? <span className='font-semibold underline underline-offset-2 cursor-pointer'><Link className="nav-link " to={"/cadastrar-cliente"}> Registre-se!</Link></span></p>

                    </div>

                </div>

            </div>

        </>
    );
};

export default LoginCliente;

