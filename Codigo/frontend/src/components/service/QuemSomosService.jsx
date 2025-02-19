import axios from 'axios';

class QuemSomosService {
    static BASE_URL = 'http://127.0.0.1:8080/api/quemsomos';

    static async getQuemSomos(token) {
        try {
            const response = await axios.get(this.BASE_URL, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    static async saveOrUpdateQuemSomos(quemSomosData, token) {
        try {
            const response = await axios.post(this.BASE_URL, quemSomosData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
            return response.data;
        } catch (err) {
            throw err;
        }
    }

    /** MÉTODOS DE AUTENTICAÇÃO E VERIFICAÇÃO DE PERMISSÕES */

    static logout() {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
    }

    static isAuthenticated() {
        const token = localStorage.getItem('token');
        return !!token; 
    }

    static isAdmin() {
        const role = localStorage.getItem('role');
        return role === 'ROLE_ADMIN'; 
    }

    static isUser() {
        const role = localStorage.getItem('role');
        return role === 'ROLE_USER'; 
    }

    static adminOnly() {
        return this.isAuthenticated() && this.isAdmin(); 
        }
}

export default QuemSomosService;
