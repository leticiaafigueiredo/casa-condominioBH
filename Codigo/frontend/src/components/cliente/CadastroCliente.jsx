import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CadastroEndereco from './CadastroEndereco';
import UserService from '../service/UserService';
import { useAuth } from '../contexts/AuthProvider';
import { useNotification } from '../contexts/NotificacaoProvider';


const CadastroCliente = () => { 

	let navigate = useNavigate();
  const { register } = useAuth();
  const { showNotification } = useNotification();

  const [senhaFormat, setSenhaFormat] = useState("");
  const [senhaErrorsFormat, setSenhaErrorsFormat] = useState([]);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [erroSenha, setErroSenha] = useState(false);

  const [cliente, setCliente] = useState({
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
    complemento: "",
  });

  const { email, senha, cpf, userName, nome, telefone } = cliente;

  const handleCpfChange = (e) => {
    const formattedCpf = formatCpf(e.target.value);
    setCliente({
      ...cliente,
      cpf: formattedCpf,
    });
  };

  const handleTelefoneChange = (e) => {
    const formattedTelefone = formatTelefone(e.target.value);
    setCliente({
      ...cliente,
      telefone: formattedTelefone,
    });
  };

  const handleConfirmarSenhaChange = (e) => {
    setConfirmarSenha(e.target.value);
    setErroSenha(e.target.value !== senhaFormat);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    if (name === "senhaFormat") {
      setSenhaFormat(value);
      const errors = validateSenha(value);
      setSenhaErrorsFormat(errors);
    }

    setCliente({
      ...cliente,
      [name]: value,
    });
  };

  const formatCpf = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length <= 11) {
      return value
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
    }
    return value;
  };

  const formatTelefone = (value) => {
    value = value.replace(/\D/g, "");
    if (value.length <= 10) {
      return value.replace(/(\d{2})(\d{4})(\d{4})/, "($1) $2-$3");
    } else {
      return value.replace(/(\d{2})(\d{5})(\d{4})/, "($1) $2-$3");
    }
  };

  const validateSenha = (senha) => {
    const errors = [];
    if (senha.length < 8) {
      errors.push("A senha deve ter pelo menos 8 caracteres.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      errors.push("A senha deve conter pelo menos um caractere especial.");
    }
    return errors;
  };

  const salvarCliente = async (e) => {
    e.preventDefault();

    if (senhaErrorsFormat.length > 0) {
      showNotification("A senha não atende aos requisitos.", "danger");
      return;
    }

    if (senhaFormat !== confirmarSenha) {
      showNotification("As senhas não coincidem.", "danger");
      return;
    }

    const data = {
      usuario: {
        email: cliente.email,
        senha: senhaFormat,
        cpf: cliente.cpf,
        role: "USER",
        username: cliente.userName,
        nome: cliente.nome,
        telefone: cliente.telefone,
        dadosDeEntrega: {
          cep: cliente.cep,
          endereco: cliente.endereco,
          numero: cliente.numero,
          cidade: cliente.cidade,
          estado: cliente.estado,
          complemento: cliente.complemento,
        },
      },
    };

    try {
      const response = await UserService.register(data);

      setCliente({
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
        complemento: "",
      });

      register(response.token, response.role);
      showNotification("Usuário registrado!", "success");
      setTimeout(() => navigate("/home"), 3000);
    } catch (error) {
      showNotification("Erro ao registrar usuário.", "danger");
    }
  };

	return (
		<div   className="w-100 py-2 px-5 shadow ">
			<form style={{backgroudColor: "#00008b"}} className="row mx-auto bg-primary-subtle" onSubmit={salvarCliente}>

			
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
							name="senhaFormat"
							id="senha"
							required
							value={senhaFormat}
							onChange={handleInputChange}
							onBlur={() => setSenhaErrorsFormat(validateSenha(senhaFormat))}
							/>
							{senhaErrorsFormat.length > 0 && (
							<ul className="text-danger mt-2">
								{senhaErrorsFormat.map((error, index) => (
								<li key={index}>{error}</li>
								))}
							</ul>
							)}
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
					<CadastroEndereco enderecoData={cliente} handleInputChange={handleInputChange} />
				</div>

				<div className="d-flex justify-content-end mt-4 mb-4">
					<Link to={"/"} className="btn btn-outline-warning btn-lg">
						Cancelar
					</Link>
					<div className="col-sm-12 col-md-3">
						<button type="submit" className="btn btn-outline-success btn-lg">
							Cadastrar
						</button>
					</div>
				</div>

			</form>
		</div>
	);
};

export default CadastroCliente;
