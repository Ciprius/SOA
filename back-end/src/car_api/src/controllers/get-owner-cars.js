export default function makeGetOwnerCars({listOwnerCars}) {
    return async function getOwnerCars(ownerName) {
        try {
            const cars = await listOwnerCars(ownerName);
            return cars;
        } catch (e) {
            console.log(e);
            return "Cannot get cars";
        }
    }
}