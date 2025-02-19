import axios from "axios";

class ProdutoService {
    static BASE_URL = "http://localhost:8080/produto"

    static async cadastrar(userData, token) {
        try {
            const response = await axios.post(`${ProdutoService.BASE_URL}/cadastrar`, userData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getProdutoById(produtoId, token) {
        try {
            const response = await axios.get(`${ProdutoService.BASE_URL}/${produtoId}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async getAllProdutos(token) {
        try {
            const response = await axios.get(`${ProdutoService.BASE_URL}/listagem`, 
                {
                    headers: {Authorization: `Bearer ${token}`}
                })
            return response.data;
        } catch (err) {
            throw err;
        }
    }
}

export default ProdutoService;