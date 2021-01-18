export default function makeListCar(carsDb) {
    return async function listCars(carId) {
        const  cars = await carsDb.findAll();
        return cars;
    } 
}