export default function makeGetCar({listCars}) {
    return async function getCars() {
        try {
            const cars = await listCars();
            return cars;
        } catch (e) {
            console.log(e);
            return "Cannot get cars";
        }
    }
}