import {
    addCar,
    editCar,
    listCars,
    removeCar,
    listOwnerCars
} from '../use-cases';
import makeDeleteCar from './delete_car';
import makeGetCar from './get_car';
import makePostCar from './post_car';
import makeUpdateCar from './update_car';
import makeGetOwnerCars from './get-owner-cars';

const deleteCar = makeDeleteCar({ removeCar });
const getCars = makeGetCar({ listCars });
const postCar = makePostCar({ addCar });
const updateCar = makeUpdateCar({ editCar });
const getOwnerCars = makeGetOwnerCars({ listOwnerCars });

const CarController = Object.freeze({
    deleteCar,
    getCars,
    postCar,
    updateCar,
    getOwnerCars
});

export default CarController;
export { deleteCar, getCars, postCar, updateCar, getOwnerCars };