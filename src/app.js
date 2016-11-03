const express = require('express');
const app = express();
const engine = require('express-dot-engine');

const statics = require('./statics');

const HTTP_PORT = process.env.port || 8080;

app.engine('html', engine.__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');

function rootHandler(req, res) {
    res.render('index.html', {secret: new Date().getTime(), host: req.get('host')});
}

function authHandler(req, res) {
    res.send(req.query);
}

statics(app);
app.get('/', rootHandler);
app.get('/auth', authHandler);
app.get('/test/:name/:age', (req, res) => {
    res.send('Name is ' + req.params['name'] + ', age is ' + req.params['age']);
});

app.listen(HTTP_PORT, () => {
    console.log('listening on ' + HTTP_PORT);
});

