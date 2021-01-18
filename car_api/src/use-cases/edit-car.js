import makeCar from '../car';

export default function makeEditCar(carsDB) {
    return async function editCar (changes) {
        if (!changes.id) {
            throw new Error('You must supply an id');
        }
        
        const existing = await carsDB.findById({ id: changes.id });
        if (!existing) {
            throw new RangeError('Car not found');
        }
        const car = makeCar({...existing, ...changes});
        const updated = await carsDB.update({
            id: car.getId(),
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
        return {...existing, ...updated};
    }
}
