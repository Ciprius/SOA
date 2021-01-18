export default function makeUpdateCar({editCar}) {
    return async function updateCar(carInfo) {
        try {
            const updated = await editCar(carInfo);
            return updated;
        } catch (e) {
            console.log(e);
            return "Cannot update the car";
        }
    }
}