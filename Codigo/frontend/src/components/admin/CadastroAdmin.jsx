import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CadastroEndereco from '../cliente/CadastroEndereco';
import UserService from '../service/UserService';
import { useAuth } from '../contexts/AuthProvider';
import { useNotification } from '../contexts/NotificacaoProvider';
import Header from '../common/Header';


const CadastroAdmin = () => { 

	let navigate = useNavigate();
	const {register, token} = useAuth()
	const { showNotification } = useNotification();


	const [admin, setAdmin] = useState({
		email: "",         
		senha: "",         
		cpf: "",
		nome: "",           
		userName: "",     
		telefone: "",     
		cep: "",          
		endereco: "",     
		numero: "",       
		cidade: "",      
		estado: "",        
		complemento: ""
	});

	const [confirmarSenha, setConfirmarSenha] = useState('');
	const [erroSenha, setErroSenha] = useState(false);

	const { email, senha, cpf, userName, nome, telefone } = admin;

	const handleCpfChange = (e) => {
		const formattedCpf = formatCpf(e.target.value);
		setAdmin({
		  ...admin,
		  cpf: formattedCpf,
		});
	  };

	  const handleTelefoneChange = (e) => {
		const formattedTelefone = formatTelefone(e.target.value);
		setAdmin({
		  ...admin,
		  telefone: formattedTelefone,
		});
	  };
	

	const handleConfirmarSenhaChange = (e) => {
		setConfirmarSenha(e.target.value);
		setErroSenha(e.target.value !== admin.senha);
	  };
	

	  const handleSenhaChange = (e) => {
		setSenha(e.target.value);
		if (confirmarSenha && e.target.value !== confirmarSenha) {
		  setErroSenha(true);
		} else {
		  setErroSenha(false);
		}
	  };

	const handleInputChange = (e) => {
		setAdmin({
			...admin,
			[e.target.name]: e.target.value,
		});
	};

	const formatCpf = (value) => {
		value = value.replace(/\D/g, '');
	
		if (value.length <= 11) {
		  return value
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d)/, '$1.$2')
			.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
		}
	
		return value;
	  };

	  const formatTelefone = (value) => {
		value = value.replace(/\D/g, ''); 
	

		if (value.length <= 10) {
		  return value.replace(/(\d{2})(\d{4})(\d{4})/, '($1) $2-$3');
		} else {
		  return value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
		}
	  };

	const salvarAdmin = async (e) => {
		e.preventDefault();

		const data = {
			usuario: {
				email: admin.email,          
				senha: admin.senha,           
				cpf: admin.cpf,               
				role: "ADMIN",                   
				username: admin.userName,
				nome: admin.nome,     
				telefone: admin.telefone,    
				dadosDeEntrega: {
					cep: admin.cep,          
					endereco: admin.endereco, 
					numero: admin.numero,    
					cidade: admin.cidade,    
					estado: admin.estado,    
					complemento: admin.complemento,  
				},
			}
		};

		try {

            const response = await UserService.registerAdmin(token, data);

            // Clear the form fields after successful registration
            setAdmin({
				email: "",         
				senha: "",         
				cpf: "",           
				userName: "",
				nome: "",     
				telefone: "",     
				cep: "",          
				endereco: "",     
				numero: "",       
				cidade: "",      
				estado: "",        
				complemento: ""
            });
			register(response.token, response.role)
            showNotification('Administrador registrado!', 'success'); 
            setTimeout(() => navigate('/home'), 3000);

        } catch (error) {
			showNotification('Erro ao registrar administrador. ', 'danger');
        }
	};

	return (
        <>
            <Header/>
            <div   className="w-100 py-2 px-5 shadow ">
                <form style={{backgroudColor: "#00008b"}} className="row mx-auto bg-primary-subtle" onSubmit={salvarAdmin}>

                
                    <div className="col-md-6 col-sm-12">
                        <h2 className="mt-4 mb-5">Dados Pessoais</h2>
                    
                
                        <div className="mb-4">
                            <label className="form-label" htmlFor="userName">Nome completo**</label>
                            <input
                                placeholder='Ex: Jose Siqueira Silva'
                                className="form-control"
                                type="text"
                                name="nome"
                                id="nome"
                                required
                                value={nome}
                                onChange={handleInputChange}
                            />
                        </div>


                        <div className="mb-4">
                            <label className="form-label" htmlFor="cpf">CPF **</label>
                            <input
                                placeholder='000.000.000-00'
                                className="form-control"
                                type="text"
                                name="cpf"
                                id="cpf"
                                required
                                value={cpf}
                                onChange={handleCpfChange}
                                maxLength={14}
                            />
                        </div>


                        <div className="mb-4">
                            <label className="form-label" htmlFor="telefone">Telefone **</label>
                            <input
                            placeholder='(00) 00000-0000'
                            className="form-control col-sm-6"
                            type="text"
                            name="telefone"
                            id="telefone"
                            required
                            value={telefone}
                            onChange={handleTelefoneChange}
                            maxLength={15} 
                            />
                        </div>

                        <div className="mb-4">
                            <label className="form-label" htmlFor="userName">User Name **</label>
                            <input
                                placeholder='Ex: jose123'
                                className="form-control col-sm-6"
                                type="text"
                                name="userName"
                                id="userName"
                                required
                                value={userName}
                                onChange={handleInputChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label  className="form-label" htmlFor="email">Email **</label>
                            <input
                                placeholder='Ex: xxxxx@gmail.com'
                                className="form-control col-sm-6"
                                type="email"
                                name="email"
                                id="email"
                                required
                                value={email}
                                onChange={handleInputChange}
                            />
                        </div>
                        <div className="row">
                            <div className="mb-4 col-md-6">
                                <label className="form-label" htmlFor="senha">Senha **</label>
                                <input
                                className="form-control col-sm-6"
                                type="password"
                                name="senha"
                                id="senha"
                                required
                                value={senha}
                                onChange={handleInputChange}
                                />
                            </div>
                            <div className="mb-4 col-md-6">
                                <label className="form-label" htmlFor="confirmarSenha">Digite a senha novamente</label>
                                <input
                                className="form-control col-sm-6"
                                type="password"
                                name="confirmarSenha"
                                required
                                value={confirmarSenha}
                                onChange={handleConfirmarSenhaChange}
                                />
                                {erroSenha && <div className="text-danger">As senhas não coincidem</div>}
                            </div>
                        </div>

                    </div>

                    <div className="col-md-6 col-sm-12 ">
                        <CadastroEndereco enderecoData={admin} handleInputChange={handleInputChange} />
                    </div>

                    <div className="d-flex justify-content-end mt-4 mb-4"> 
                        <Link to={"/home"} className="btn btn-outline-warning btn-lg">
                            Cancelar
                        </Link>
                        <div className="col-sm-12 col-md-3">
                            <button type="submit" className="btn btn-outline-success btn-lg">
                                Salvar
                            </button>
                        </div>
                    </div>

                </form>
            </div>
        </>
	);
};

export default CadastroAdmin;
