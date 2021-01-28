const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
import bodyParser from 'body-parser';
import {deleteCar, getCars, postCar, updateCar, getOwnerCars} from './controllers';

const app = express();
app.use(bodyParser.json());
app.use(cors());

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];
    
    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');
        const token = bearer[1];
        req.token = token;
        next();
    } else {
        res.status(403).json({message: "The token is invalid or does not exist!"});
    }
}

app.get('/car/:ownerName', verifyToken,(req, res) => {
    const ownerName = req.params;
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        console.log(authData);
        if (err && ownerName !== authData?.user[0].userName) {
            res.status(403).json({message: "The token is invalid or does not exist!"});
        } else {
            getOwnerCars(ownerName).then(cars => {
                if (cars?.length) {
                    res.status(200).json(cars);
                } else {
                    res.status(400).json({message: "Cars list is empty"});
                }
            });
        }
    });
});

app.get('/car', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.status(403).json({ message: "The token is invalid or does not exist!" });
        } else {
            getCars().then(cars => {
                if (cars?.length) {
                    res.status(200).json(cars);
                } else {
                    res.status(400).json({ message: "Cars list is empty" });
                }
            });
        }
    });
});

app.post('/car', verifyToken, (req, res) => {
    const carInfo = req.body;
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.status(403).json({ message: "The token is invalid or does not exist!" });
        } else {
            postCar(carInfo).then(car => {
                if (car) {
                    res.status(201).json(car);
                } else {
                    res.status(400).json({ message: "Cannot add the specified car" });
                }
            });
        }
    });
});
app.patch('/car/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    const carInfo = { id, ...req.body };
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.status(403).json({ message: "The token is invalid or does not exist!" });
        } else {
            updateCar(carInfo).then(car => {
                if (car) {
                    res.status(200).json(car);
                } else {
                    res.status(404).json({ message: "Could not find the car the update" });
                }
            });
        }
    });
});
app.delete('/car/:id', verifyToken, (req, res) => {
    const { id } = req.params;
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.status(403).json({ message: "The token is invalid or does not exist!" });
        } else {
            deleteCar(id).then(deleted => {
                if (deleted) {
                    res.status(200).json(deleted);
                } else {
                    res.status(404).json({ message: 'Car to delete not found' });
                }
            });
        }
    });
});

// listen for requests
app.listen(3001, () => {
    console.log('Server is listening on port 3001');
})

export default app;