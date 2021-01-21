export default function makeListOwnerCars(carsDb) {
    return async function listOwnerCarss(ownerName) {
        const cars = carsDb.findCarsByOwner({...ownerName});
        return cars;
    }
}