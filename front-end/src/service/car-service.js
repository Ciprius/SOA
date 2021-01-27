import axios from 'axios';

export default {
    async getCars() {
        return await axios.get('http://localhost/cars');
    },
    async getCarsByOwner(ownerName) {
        return await axios.get('http://localhost/cars/'+ownerName);
    },
    async deleteCar(id) {
        return await axios.delete('http://localhost/cars/'+id);
    },
    async updateCar(id, {...carInfo}) {
        return await axios.patch('http://localhost/cars/'+id, {
            ...carInfo
        });
    }
}