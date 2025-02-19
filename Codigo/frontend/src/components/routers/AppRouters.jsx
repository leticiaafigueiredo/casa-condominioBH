import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Home from '../common/Home';
import CadastroCliente from '../cliente/CadastroCliente';
import Login from '../common/Login';
import LoginCliente from '../cliente/LoginCliente';
import Perfil from '../common/Perfil';
import ListagemProduto from '../admin/Produto';
import Carrinho from '../carrinhoDeCompras/Carrinho';
import CadastrarProduto from '../admin/CadastrarProduto';
import { useNavigate, Link } from 'react-router-dom';
import TodosProdutos from '../produto/TodosProdutos';
import ListagemProdutoAdmin from '../common/Listagem';
import EditarProduto from '../admin/EditarProduto';
import CadastrarAboutUs from '../admin/CadastrarAboutUs';
import AboutUs from '../cliente/AboutUs';
import PaymentBrick from '../carrinhoDeCompras/PaymentBrinck';
import CadastroAdmin from '../admin/CadastroAdmin';
import DetalheProduto from '../common/Produto';
import HistoricoCompras from '../cliente/HistoricoCompras';

const AppRouters = () => {
    return (
      <Router>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/cadastrar-cliente" element={<CadastroCliente />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/login" element={<LoginCliente />} />
          <Route path="/home" element={<Home />} />
          <Route path="/perfil" element={<Perfil />} /> 
          <Route path="/produto/listagem" element={<ListagemProduto />} /> 
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path='/cadastrar-produto' element={<CadastrarProduto/>}></Route>
          <Route path='/todos-produtos' element={<TodosProdutos/>}></Route>
          <Route path='/listagem-produtos' element={<ListagemProdutoAdmin/>}></Route>
          <Route path='/editar-produto/:id' element={<EditarProduto/>}></Route>
          <Route path="/quem-somos" element={<AboutUs />} />
          <Route path="/admin/cadastrar-about-us" element={<CadastrarAboutUs />} /> 
          <Route path="/pagamento" element={<PaymentBrick />} />{/* Nova rota */}
          <Route path="/cadastro-admin" element={<CadastroAdmin />} /> 
          <Route path="/produto/:produtoId" element={<DetalheProduto />} /> 
          <Route path="/cadastro-admin" element={<CadastroAdmin />} />
          <Route path="/historico-compras" element={<HistoricoCompras />} />  
        </Routes>
      </Router>
    );
  };
  
  export default AppRouters;
