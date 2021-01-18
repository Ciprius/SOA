const express = require('express');
const cors = require('cors');
import bodyParser from 'body-parser';
import {deleteCar, getCars, postCar, updateCar} from './controllers';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/car', (req, res) => {
    getCars().then(cars => {
        if (cars.length) {
            res.status(200).json(cars);
        } else {
            res.status(400).json({message: "Cars list is empty"});
        }
    });
});

app.post('/car', (req, res) => {
    const carInfo = req.body;
    postCar(carInfo).then(car => {
        if (car) {
            res.status(201).json(car);
        } else {
            res.status(400).json({message: "Cannot add the specified car"});
        }
    });
});
app.patch('/car/:id', (req, res) => {
    const { id } = req.params;
    const carInfo = { id, ...req.body };
    updateCar(carInfo).then(car => {
        if (car) {
            res.status(200).json(car);
        } else {
            res.status(404).json({message: "Could not find the car the update"});
        }
    });
});
app.delete('/car/:id', (req, res) => {
    const { id } = req.params;
    deleteCar(id).then(deleted => {
        if (deleted) {
            res.status(200).json(deleted);
        } else {
            res.status(404).json({message: 'Car to delete not found'});
        }
    });
});

// listen for requests
app.listen(3001, () => {
    console.log('Server is listening on port 3001');
})

export default app;