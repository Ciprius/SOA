import makeCar from '../car';

export default function makeRemoveCar(carsDb) {
    return async function removeCar(id) {
        if (!id) {
            throw new Error('You must supply a car id');
        }
        
        return carsDb.remove({ id });
    }
}