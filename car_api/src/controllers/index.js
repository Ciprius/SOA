import {
    addCar,
    editCar,
    listCars,
    removeCar
} from '../use-cases';
import makeDeleteCar from './delete_car';
import makeGetCar from './get_car';
import makePostCar from './post_car';
import makeUpdateCar from './update_car';

const deleteCar = makeDeleteCar({ removeCar });
const getCars = makeGetCar({ listCars });
const postCar = makePostCar({ addCar });
const updateCar = makeUpdateCar({ editCar });

const CarController = Object.freeze({
    deleteCar,
    getCars,
    postCar,
    updateCar
});

export default CarController;
export { deleteCar, getCars, postCar, updateCar };