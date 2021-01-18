import makeCar from '../car';

export default function makeAddCar(carsDB) {
    return async function addCar (carInfo) {
        const car = makeCar(carInfo);
        
        return carsDB.insert({
            ownerName: car.getOwner(),
            manufactureYear: car.getManufacturedYear(),
            horsePower: car.getHp(),
            torque: car.getTorque(),
            engine: car.getEngine(),
            engineCapacity: car.getEngineCapacity(),
            weight: car.getWeight(),
            brand: car.getBrand(),
            model: car.getModel(),
            spectedFor: car.getSpec(),
        });
    }
}
