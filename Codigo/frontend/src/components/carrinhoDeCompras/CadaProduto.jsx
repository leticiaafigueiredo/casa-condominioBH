import React, { useState } from 'react';
import CarrinhoService from '../service/CarrinhoService';
import RemoverProdutoModal from './RemoverProdutoModal';
import { useAuth } from '../contexts/AuthProvider';
import { useNotification } from '../contexts/NotificacaoProvider';


const CadaProduto = ({ id, nome, img, preco, quantidade, atualizarProduto, removerProdutoDoCarrinho }) => {
    const { token } = useAuth();
    const [contador, setContador] = useState(quantidade);
    const [total, setTotal] = useState(preco * quantidade);
    const [showModal, setShowModal] = useState(false);
    const { showNotification } = useNotification();


    const atualizarTotal = (newContador) => {
        const novoTotal = newContador * preco;
        setTotal(novoTotal);
        atualizarProduto(id, newContador, novoTotal);
    };

    

    const incrementar = async () => {
        try {
            await CarrinhoService.atualizarProduto(id, contador + 1, token);
            const newContador = contador + 1;
            setContador(newContador);
            atualizarTotal(newContador);
        } catch (error) {
            showNotification('Erro ao adicionar produto ao carrinho,', 'danger');
        }
    };

    const decrementar = async () => {
        if (contador > 1) {
            try {
                await CarrinhoService.atualizarProduto(id, contador - 1, token);
                const newContador = contador - 1;
                setContador(newContador);
                atualizarTotal(newContador);
            } catch (error) {
                showNotification('Erro ao remover produto ao carrinho.', 'danger');
            }
        }
    };
    const removerProduto = async (e) => {
        e.preventDefault();
        try {
            await CarrinhoService.removerProduto(id, token);
            removerProdutoDoCarrinho(id);
            setShowModal(false);
        } catch (error) {
            showNotification('Erro ao remover produto ao carrinho.', 'danger');
        }
    };
    return (
        <>
            <tr>
                <td className="product-thumbnail">
                    <img src={`data:image/jpeg;base64,${img}`} className="img-fluid product-thumbnail" alt={nome} />
                </td>
                <td className="product-name">
                    <h2 className="h5 text-black">{nome}</h2>
                </td>
                <td>{preco}</td>
                <td>
                    <div className="input-group mb-3 d-flex align-items-center quantity-container" style={{ maxWidth: 120 }}>
                        <button className="btn btn-outline-black decrease" type="button" onClick={decrementar}>
                            <i className="fa-solid fa-minus"></i>
                        </button>
                        <input type="text" className="form-control text-center quantity-amount" value={contador} readOnly />
                        <button className="btn btn-outline-black increase" type="button" onClick={incrementar}>
                            <i className="fa-solid fa-plus"></i>
                        </button>
                    </div>
                </td>
                <td>{total}</td>
                <td>
                    <button
                        className="btn btn-black btn-sm"
                        onClick={(e) => {
                            e.preventDefault();
                            setShowModal(true);
                        }}
                    >
                        <i className="fa-solid fa-x"></i>
                    </button>
                </td>
            </tr>
            <RemoverProdutoModal
                show={showModal}
                handleClose={() => setShowModal(false)}
                onConfirm={removerProduto}
            />
        </>
    );
};

export default CadaProduto;
