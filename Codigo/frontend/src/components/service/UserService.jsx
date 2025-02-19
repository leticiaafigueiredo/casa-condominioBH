import axios from "axios";

class UserService{
    static BASE_URL = "http://localhost:8080/user"

    static async login(email, senha){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/login`, {email, senha})
            return response.data;

        }catch(err){
            throw err;
        }
    }

    static async register(userData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/register`, userData)
            return response.data;
        }catch(err){
            throw err;
        }
    }

    
    static async updateUser(userData, token){
         try{
            const response = await axios.patch(`${UserService.BASE_URL}/update`, userData,
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async registerAdmin(token, userData){
        try{
            const response = await axios.post(`${UserService.BASE_URL}/register/admin`, userData, 
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            return response.data;
        }catch(err){
            throw err;
        }
    }

    static async getUser(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/get-user`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async getAllUsers(token){
        try{
            const response = await axios.get(`${UserService.BASE_URL}/get-user`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    static async deleteUser(userId, token){
        try{
            const response = await axios.delete(`${UserService.BASE_URL}/admin/delete/${userId}`, 
            {
                headers: {Authorization: `Bearer ${token}`}
            })
            return response.data;
        }catch(err){
            throw err;
        }
    }


    

    /**AUTHENTICATION CHECKER */
    static logout(){
        localStorage.removeItem('token')
        localStorage.removeItem('role')
    }

    static isAuthenticated(){
        const token = localStorage.getItem('token')
        return !!token
    }

    static isAdmin(){
        const role = localStorage.getItem('role')
        return role === 'ROLE_ADMIN'
    }

    static isUser(){
        const role = localStorage.getItem('role')
        return role === 'ROLE_USER'
    }

    static adminOnly(){
        return this.isAuthenticated() && this.isAdmin();
    }

}

export default UserService;