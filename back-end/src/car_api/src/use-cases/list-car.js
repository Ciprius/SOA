export default function makeListCar(carsDb) {
    return async function listCars(carId) {
        const  cars = carsDb.findAll();
        return cars;
    } 
}