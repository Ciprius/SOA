import makeAddCar from './add-car';
import makeEditCar from './edit-car';
import makeRemoveCar from './remove-car';
import makeListCar from './list-car';
import makeListOwnerCars from './list-owner-cars';
import carsDB from '../data-access';

const addCar = makeAddCar(carsDB);
const editCar = makeEditCar(carsDB);
const listCars = makeListCar(carsDB);
const removeCar = makeRemoveCar(carsDB);
const listOwnerCars = makeListOwnerCars(carsDB);

const carService = Object.freeze({
    addCar,
    editCar,
    listCars,
    removeCar,
    listOwnerCars
});

export default carService;
export {addCar, editCar, listCars, removeCar, listOwnerCars};