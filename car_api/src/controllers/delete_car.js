export default function makeDeleteCar({ removeCar }) {
    return async function deleteCar(id) {
        try {
            const deleted = await removeCar(id);
            return deleted;
        } catch (e) {
            console.log(e);
            return 'Cannot delete car!!';
        }
    }
}