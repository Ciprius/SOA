const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');
import bodyParser from 'body-parser';
import {postUser, getUser, getUsers, logInUserC} from './controllers';

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

app.post('/user/login', (req, res) => {
    const userInfo = req.body;
    logInUserC(userInfo).then(user => {
        if (user?.length) {
            jwt.sign({user}, 'secretKey', { expiresIn: '10min' } ,(err, token) => {
                user[0].token = token;
                res.status(200).json(user); 
            });
        } else {
            res.status(400).json({message: "Cannot log in, the user might not exist"});
        }
    });
});

app.get('/user/:id', verifyToken, (req, res) => {
    const id = req.params;
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.status(403).json({ message: "The token is invalid or does not exist!" });
        } else {
            getUser(id).then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(400).json({ message: "user list is empty" });
                }
            });
        }
    });
});

app.get('/user', verifyToken, (req, res) => {
    jwt.verify(req.token, 'secretKey', (err, authData) => {
        if (err) {
            res.status(403).json({ message: "The token is invalid or does not exist!" });
        } else {
            getUsers().then(users => {
                if ( users ) {
                    res.status(200).json(users);
                } else {
                    res.status(400).json({ message: "user list is empty" });
                }
            });
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