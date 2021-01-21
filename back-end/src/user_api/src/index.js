const express = require('express');
const cors = require('cors');
import bodyParser from 'body-parser';
import {postUser, getUser, getUsers, logInUserC} from './controllers';

const app = express();
app.use(bodyParser.json());
app.use(cors());

app.get('/user/login', (req, res) => {
    const userInfo = req.body;
    logInUserC(userInfo).then(user => {
        if (user?.length) {
            res.status(200).json(user);
        } else {
            res.status(400).json({message: "Cannot log in, the user might not exist"});
        }
    });
});

app.get('/user/:id', (req, res) => {
    const id = req.params;
    getUser(id).then(user => {
        if (user) {
            res.status(200).json(user);
        } else {
            res.status(400).json({message: "user list is empty"});
        }
    });
});

app.get('/user', (req, res) => {
    getUsers().then(users => {
        if (users) {
            res.status(200).json(users);
        } else {
            res.status(400).json({message: "user list is empty"});
        }
    });
});

app.post('/user', (req, res) => {
    const userInfo = req.body;
    postUser(userInfo).then(user => {
        if (user) {
            res.status(201).json(user);
        } else {
            res.status(400).json({message: "Cannot add the specified user or the user already exists"});
        }
    });
});

// listen for requests
app.listen(3002, () => {
    console.log('Server is listening on port 3002');
})

export default app;