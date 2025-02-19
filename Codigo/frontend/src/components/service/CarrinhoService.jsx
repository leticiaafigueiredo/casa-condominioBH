import axios from "axios";

class CarrinhoService{
    static BASE_URL = "http://localhost:8080/carrinho"
    static BASE_URL_USER = 'http://localhost:8080/user'


    static async adicionarProduto(produtoId, token){
        try{
            const response = await axios.post(`${CarrinhoService.BASE_URL}/cadastrar/${produtoId}`,  {
                quantidade: 1
              }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getCarrinho( token){
        try{
            const response = await axios.get(`${CarrinhoService.BASE_URL_USER}/carrinho/get`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async removerProduto( produtoId, token){
        try{
            const response = await axios.patch(`${CarrinhoService.BASE_URL}/${produtoId}/remover`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async atualizarProduto(produtoId, quant, token){
        try{
            const response = await axios.patch(`${CarrinhoService.BASE_URL}/${produtoId}/atualizar`,  {
                quantidade: quant
              }, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        }catch(err){
            throw err;
        }
    }




}

export default CarrinhoService;
