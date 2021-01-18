export default function makePostCar({addCar}) {
    return async function postCar(carInfo) {
        try {
            const posted = await addCar(carInfo);
            return posted;
        } catch (e) {
            console.log(e);
            return "Cannot add car";
        }
    }
}