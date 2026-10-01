import { axios } from 'axios';
const URL = 'http://localhost:3000'

class UserService{

    getUsers(){
       return axios.get(URL+'/api/user');
    }
}

export default new UserService();