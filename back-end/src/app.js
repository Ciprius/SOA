const express = require('express');
import bodyParser from 'body-parser';
const cors = require('cors');

const app = express();
app.use(bodyParser.json());
app.use(cors());
app.get('/', (req, res) => {
    res.send('Hello world!!!');
});

app.get('/api/courses', (req, res) => {
   res.send([1, 2, 3]); 
});


// listen for requests
app.listen(3000, () => {
    console.log('Server is listening on port 3000');
})

export default app;
