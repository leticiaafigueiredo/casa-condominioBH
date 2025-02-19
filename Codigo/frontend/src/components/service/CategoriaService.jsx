import axios from "axios";

class CategoriaService {
    static BASE_URL = "http://localhost:8080/produto"
    static async getAllCategorias(token) {
        const response = await axios.get(`${CategoriaService.BASE_URL}/getAllCategorias`,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
        return response.data;
    } 
}

export default CategoriaService;