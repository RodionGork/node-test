const express = require('express');
const app = express();

const statics = require('./statics');

const HTTP_PORT = 8080;

function rootHandler(req, res) {
    res.send('<h1>Hi, Peoplez!</h1>');
}

statics(app);
app.get('/', rootHandler);
app.get('/test/:name/:age', (req, res) => {
    res.send('Name is ' + req.params['name'] + ', age is ' + req.params['age']);
});

app.listen(HTTP_PORT, () => {
    console.log('listening on ' + HTTP_PORT);
});

