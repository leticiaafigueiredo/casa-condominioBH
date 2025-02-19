import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from './Header';
import { useNotification } from '../contexts/NotificacaoProvider';
import { useAuth } from '../contexts/AuthProvider';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';


const Perfil = () => {
  const { token, userType } = useAuth();
  const { showNotification } = useNotification();
  const [confirmSenha, setConfirmSenha] = useState("");
  const [ufs, setUfs] = useState([]);
  const [cities, setCities] = useState([]);
  const [selectedUf, setSelectedUf] = useState("");
  const [senhaErrorsFormat, setSenhaErrorsFormat] = useState([]);
  const [erroSenha, setErroSenha] = useState(false);

  const [userData, setUserData] = useState({
    nome: "",
    username: "",
    cpf: "",
    telefone: "",
    email: "",
    senha: "",
    dadosDeEntrega: {
      cep: "",
      estado: "",
      cidade: "",
      endereco: "",
      numero: "",
      complemento: "",
    },
  });

  useEffect(() => {
    axios
      .get('https://servicodados.ibge.gov.br/api/v1/localidades/estados/')
      .then((response) => {
        setUfs(response.data);
      });
  }, []);

  useEffect(() => {
    if (!selectedUf) {
      return;
    }
    axios
      .get(
        `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${selectedUf}/municipios`
      )
      .then((response) => {
        setCities(response.data);
      });
  }, [selectedUf]);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const data = await UserService.getUser(token);

        setUserData({
          nome: data.nome,
          username: data.username,
          cpf: data.cpf,
          telefone: data.telefone,
          email: data.email,
          senha: "", // senha não é carregada inicialmente
          dadosDeEntrega: {
            cep: data.dadosDeEntrega.cep,
            estado: data.dadosDeEntrega.estado,
            cidade: data.dadosDeEntrega.cidade,
            endereco: data.dadosDeEntrega.endereco,
            numero: data.dadosDeEntrega.numero,
            complemento: data.dadosDeEntrega.complemento,
          },
        });
      } catch (error) {
        showNotification('Erro ao buscar dados do usuário', 'danger');
      }
    };

    fetchUserData();
  }, [token, showNotification]);

  const handleSave = async () => {
    const updatedData = prepareUserData(userData);

    if (userData.senha === "" && confirmSenha === "") {
      delete updatedData.senha; // remove senha se não for alterada
    }

    if (userData.senha !== confirmSenha) {
      showNotification('As senhas não coincidem', 'danger');
      return;
    }

    if (userData.senha && senhaErrorsFormat.length > 0) {
      showNotification('A senha não atende aos requisitos', 'danger');
      return;
    }

    try {
      const response = await UserService.updateUser(updatedData, token);
      if (response.role) {
        showNotification('Perfil salvo com sucesso!', 'success');
      } else {
        showNotification('Erro ao salvar perfil.', 'danger');
      }
    } catch (error) {
      showNotification('Erro ao salvar os dados', 'danger');
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let formattedValue = value;

    if (name === 'cpf') {
      formattedValue = formatCpf(value);
    } else if (name === 'telefone') {
      formattedValue = formatTelefone(value);
    }

    if (name === 'senha') {
      const errors = validateSenha(value);
      setSenhaErrorsFormat(errors);
    }

    if (['cep', 'estado', 'cidade', 'endereco', 'numero', 'complemento'].includes(name)) {
      setUserData((prevData) => ({
        ...prevData,
        dadosDeEntrega: {
          ...prevData.dadosDeEntrega,
          [name]: formattedValue,
        },
      }));
    } else {
      setUserData((prevData) => ({
        ...prevData,
        [name]: formattedValue,
      }));
    }
  };

  const validateSenha = (senha) => {
    const errors = [];
    if (!senha) return errors;
    if (senha.length < 8) {
      errors.push("A senha deve ter pelo menos 8 caracteres.");
    }
    if (!/[!@#$%^&*(),.?":{}|<>]/.test(senha)) {
      errors.push("A senha deve conter pelo menos um caractere especial.");
    }
    return errors;
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

  const prepareUserData = (userData) => {
    const updatedData = {};
    for (const key in userData) {
      if (userData[key] !== "" && userData[key] !== null) {
        updatedData[key] = userData[key];
      }
    }
    return updatedData;
  };

  const handleConfirmarSenhaChange = (e) => {
    setConfirmSenha(e.target.value);
    setErroSenha(e.target.value !== userData.senha);
  };

  return (
    <>
      <Header />
      <div className="container rounded bg-white mt-5 mb-5">
        <div className="row">
          <div className="col-md-3 border-right">
            <div className="d-flex flex-column align-items-center text-center p-3 py-5">
              <img
                className="rounded-circle mt-5"
                width="150px"
                src="https://st2.depositphotos.com/4060975/8061/v/450/depositphotos_80611608-stock-illustration-user-vector-icon.jpg"
                alt="User"
              />
              <span className="font-weight-bold">{userData.username}</span>
              <span className="text-black-50">{userData.email}</span>
              {
                 userType === 'ROLE_USER' ? (
                   <Link
                  className="btn btn-primary mt-3"
                  type="button"
                  to={"/historico-compras"}
                >
                  Pedidos
                </Link>
                 ) : null
              }
             
            </div>
          </div>
          <div className="col-md-5 border-right mt-3">
            <div className="p-3 py-5 pe-5">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <h4 className="text-right">Dados Pessoais</h4>
              </div>
              <div className="row mt-2">
                <div className="col-md-6">
                  <label className="labels">Nome</label>
                  <input
                    type="text"
                    className="form-control"
                    name="nome"
                    value={userData.nome}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-6">
                  <label className="labels">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    name="username"
                    value={userData.username}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="row">
                <div className="col-md-12 mt-2">
                  <label className="labels">CPF</label>
                  <input
                    type="text"
                    className="form-control"
                    name="cpf"
                    maxLength="14"
                    value={atob(userData.cpf)}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Telefone</label>
                  <input
                    type="text"
                    maxLength="15"
                    className="form-control"
                    name="telefone"
                    value={userData.telefone}
                    onChange={handleChange}
                  />
                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Email</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email"
                    value={userData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <h4 className="mt-3">Alterar Senha</h4>
              <div className="row mt-2">
                <div className="col-md-12">
                  <label className="labels">Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    name="senha"
                    value={userData.senha}
                    onChange={handleChange}
                  />
                 {senhaErrorsFormat.length > 0 && (
                  <ul>
                    {senhaErrorsFormat.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                )}

                </div>
                <div className="col-md-12 mt-2">
                  <label className="labels">Confirmar Senha</label>
                  <input
                    type="password"
                    className="form-control"
                    value={confirmSenha}
                    onChange={handleConfirmarSenhaChange}
                  />
                  {erroSenha && (
                    <small className="text-danger">As senhas não coincidem</small>
                  )}
                </div>
              </div>

              <div className="mt-3">
                <button
                  className="btn btn-primary"
                  type="button"
                  onClick={handleSave}
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
              <div className="col-md-4 mt-2">
                  <div className="p-3 py-5 pe-5">
                      <div className="d-flex justify-content-between align-items-center experience">
                        <span>Dados de entrega</span>
                      </div>
                      <div className="col-md-12 mt-2">
                        <label className="labels">CEP</label>
                        <input
                          type="text"
                          className="form-control"
                          name="cep"
                          value={userData.dadosDeEntrega.cep}
                          onChange={handleChange}
                        />                        
                      </div> 
                      <div className="col-md-12 mt-2">
                        <label className="labels">Estado</label>
                        <select
                          className="form-control"
                          name="estado"
                          value={userData.dadosDeEntrega.estado}
                          onChange={(e) => {
                            handleChange(e);
                            setSelectedUf(e.target.value);
                          }}
                        >
                          <option value="">Selecione um estado</option>
                          {ufs.map((uf) => (
                            <option key={uf.id} value={uf.sigla}>
                              {uf.nome}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-12 mt-2">
                        <label className="labels">Cidade</label>
                        <select
                          className="form-control"
                          name="cidade"
                          value={userData.dadosDeEntrega.cidade}
                          onChange={handleChange}
                        >
                          <option value="">{userData.dadosDeEntrega.cidade}</option>
                          {cities.map((city) => (
                            <option key={city.id} value={city.nome}>
                              {city.nome}
                            </option>
                          ))}
                        </select>
                      </div>

                      <div className="col-md-12 mt-2">
                        <label className="labels">Endereco</label>
                        <input
                          type="text"
                          className="form-control"
                          name="endereco"
                          value={userData.dadosDeEntrega.endereco}
                          onChange={handleChange}
                        />                       </div>
                      <div className="row mt-2">
                         <div className="col-md-6">
                          <label className="labels">Numero</label>
                          <input
                          type="text"
                          className="form-control"
                          name="numero"
                          value={userData.dadosDeEntrega.numero}
                          onChange={handleChange}
                        />                         </div>
                        <div className="col-md-6">
                          <label className="labels">Complemento</label>
                          <input
                          type="text"
                          className="form-control"
                          name="complemento"
                          value={userData.dadosDeEntrega.complemento}
                          onChange={handleChange}
                        />                         </div>
                      </div>
                     
                  </div>
              </div>
          </div>
      </div>
    </>
  )
}

export default Perfil
