import React from 'react';
import Header from '../common/Header';

const HistoricoCompras = () => {
  const historico = [
    {
      valor: 150.00,
      produtos: [
        {
          produtoId: 101,
          preco: 50.00,
          descricao: "Camiseta básica",
          nome: "Camiseta",
          quantidade: 2,
          isDestaque: false
        },
        {
          produtoId: 102,
          preco: 100.00,
          descricao: "Calça jeans",
          nome: "Calça",
          quantidade: 1,
          isDestaque: true
        }
      ],
      avaliacao: {
        nota: 5,
        comentario: "Ótima experiência de compra."
      }
    }
  ];

  return (
    <>
    <Header />
    <div className="container mt-4">
      <h2>Histórico de Compras</h2>
      {historico.length > 0 ? (
        historico.map((compra, index) => (
          <div key={index} className="mb-4 border p-3 rounded">
            <h4>Compra #{index + 1}</h4>
            <table className="table table-bordered">
              <thead className="table-light">
                <tr>
                  <th>Produto</th>
                  <th>Descrição</th>
                  <th>Quantidade</th>
                  <th>Preço Unitário</th>
                  <th>Preço Total</th>
                  <th>Destaque</th>
                </tr>
              </thead>
              <tbody>
                {compra.produtos.map((produto) => (
                  <tr key={produto.produtoId}>
                    <td>{produto.nome}</td>
                    <td>{produto.descricao}</td>
                    <td>{produto.quantidade}</td>
                    <td>R${produto.preco.toFixed(2)}</td>
                    <td>R${(produto.preco * produto.quantidade).toFixed(2)}</td>
                    <td>
                      {produto.isDestaque ? (
                        <span className="badge bg-success">Destaque</span>
                      ) : (
                        <span className="badge bg-secondary">Normal</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div>
              <strong>Valor Total:</strong> R${compra.valor.toFixed(2)}
            </div>
            <div className="mt-2">
              <strong>Avaliação:</strong>
              <div>
                <span className="text-warning">
                  {'★'.repeat(compra.avaliacao.nota)}{'☆'.repeat(5 - compra.avaliacao.nota)}
                </span>
                <span className="ms-2">{compra.avaliacao.comentario}</span>
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>Não há compras registradas.</p>
      )}
    </div></>
  );
};

export default HistoricoCompras;
