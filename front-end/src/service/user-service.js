import axios from 'axios';


export default {
    async getLogin(userName, password) {
        return await axios.post('http://localhost/users/login/', {
            userName,
            password
        });
    },
    async addUser(userName, password) {
        return await axios.post('http://localhost/users', {
            userName,
            password 
        });
    },
}