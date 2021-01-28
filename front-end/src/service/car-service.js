import axios from 'axios';

export default {
    async getCars() {
        return await axios.get('http://localhost/cars', {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    },
    async getCarsByOwner(ownerName) {
        return await axios.get('http://localhost/cars/'+ownerName, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    },
    async deleteCar(id) {
        return await axios.delete('http://localhost/cars/'+id, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    },
    async updateCar(id, {...carInfo}) {
        return await axios.patch('http://localhost/cars/'+id, {
            ...carInfo
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    },
    async addCar({...carInfo}) {
        return await axios.post('http://localhost/cars', {
            ...carInfo
        }, {
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
        });
    }
}