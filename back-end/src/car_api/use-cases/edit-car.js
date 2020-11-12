import makeCar from '../car';

export default function makeEditCar({carsDB}) {
    return async function editCar ({id, ...changes} = {}) {
        if (!id) {
            throw new Error('You must supply an id');
        }
        
        const existing = await carsDB.findById({ id });
        if (!existing) {
            throw new RangeError('Car not found');
        }
        const car = makeCar({...existing, ...changes});
        const updated = await carsDB.update({
            // update stuff
        });
        return {...existing, ...updated};
    }
}
