import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import UserService from '../service/UserService';
import { useNotification } from '../contexts/NotificacaoProvider';

const CadastroProduto = () => {
    let navigate = useNavigate();
	const { showNotification } = useNotification();

	const [produto, setProduto] = useState({
		nome: "",         
		//categoria: "",   não pronto ainda              
		//imagem: "",  não pronto ainda   
		descricao: "",     
		id: "", 
        preco: "", 
        quantidade: ""          
	});

    const { nome, preco, quantidade, descricao, id} = produto;

	const handleInputChange = (e) => {
		setProduto({
			...produto,
			[e.target.name]: e.target.value,
		});
	};
    const salvarProduto = async (e) => {
		e.preventDefault();

		const data = {
			produto: {
				nome: produto.nome,          
				descricao: produto.descricao,           
				id: produto.id,                                 
				preco: produto.preco,     
				quantidade: produto.quantidade,    
				/* categoria dps
				categoria: {
					
				},
				*/
			}
		};

		try {

            await UserService.register(data);

            // Clear the form fields after successful registration
            setCliente({
				nome: "",         
				//categoria: "",         
				preco: "",           
				//imagem: "",     
				descricao: "",     
				id: "",    
                quantidade: ""      
            });
            showNotification('produto registrado!', 'success');

        } catch (error) {
            showNotification('Erro ao cadastrar produto.');
        }
	};

    return (
		<div className="col-sm-8 py-2 px-5 offset-1 shadow mt-4 col-md-10">
			<form className="row" onSubmit={salvarProduto}>
				<div className="col-md-6 col-sm-12">
					<h2 className="mt-4 mb-4">Cadastro produto</h2>

					<div className="input-group mb-4">
						<label className="input-group-text" htmlFor="nome">Nome</label>
						<input
							className="form-control col-sm-6"
							type="text"
							name="nome"
							id="nome"
							required
							value={nome}
							onChange={handleInputChange}
						/>
					</div>

                    <div className="input-group mb-4">
						<label className="input-group-text" htmlFor="valores">valores</label>
						<input
							className="form-control col-sm-6"
							type="number"
							name="valores"
							id="valores"
							required
							value={valores}
							onChange={handleInputChange}
						/>
					</div>


					<div className="input-group mb-4">
						<label className="input-group-text" htmlFor="quantidade">Quantidade</label>
						<input
							className="form-control col-sm-6"
							type="number"
							name="quantidade"
							id="quantidade"
							required
							value={quantidade}
							onChange={handleInputChange}
						/>
					</div>

                    <div className="input-group mb-4">
						<label className="input-group-text" htmlFor="descricao">descricao</label>
						<input
							className="form-control col-sm-6"
							type="text"
							name="descricao"
							id="descricao"
							required
							value={descricao}
							onChange={handleInputChange}
						/>
					</div>

					<div className="input-group mb-4">
						<label className="input-group-text" htmlFor="id">Codigo</label>
						<input
							className="form-control col-sm-6"
							type="id"
							name="id"
							id="id"
							required
							value={id}
							onChange={handleInputChange}
						/>
					</div>

	
				</div>

				<div className="display-flex mt-4 mb-4">
					<div className="col-sm-12 col-md-3">
						<Link to={"/"} className="btn btn-outline-warning btn-lg">
							Cancelar
						</Link>
					</div>

					<div className="col-sm-12 col-md-3">
						<button type="submit" className="btn btn-outline-success btn-lg">
							Salvar
						</button>
					</div>
				</div>
			</form>
		</div>
	);

};

export default CadastroProduto;