const express = require('express');
const cors = require('cors');
import bodyParser from 'body-parser';
import {postUser, getUser} from './controllers';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/user', (req, res) => {
    getUser().then(user => {
        if (user.length) {
            res.status(200).json(user);
        } else {
            res.status(400).json({message: "Cars list is empty"});
        }
    });
});

app.post('/user', (req, res) => {
    const userInfo = req.body;
    postUser(userInfo).then(user => {
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(400).json({message: "Cannot add the specified car"});
        }
    });
});

// listen for requests
app.listen(3002, () => {
    console.log('Server is listening on port 3002');
})

export default app;