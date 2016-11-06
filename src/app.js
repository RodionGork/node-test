const express = require('express');
const app = express();
const engine = require('express-dot-engine');
const crypt = require('./crypt');

const statics = require('./statics');
const init = require('./init');
const userModel = require('./models/user');

const HTTP_PORT = process.env.port || 8080;

function rootHandler(req, res) {
    res.render('index.html', {secret: new Date().getTime(), host: req.get('host')});
}

function authHandler(req, res) {
    res.send(req.query);
}

function testHandler(req, res) {
    let name = req.params['name'];
    let age = req.params['age'];
    if (age) {
        new userModel({name: name, age: age, _id: '' + new Date().getTime()}).save(err => {
            res.send('User ' + name + ' saved!\n' + err);
        });
    } else {
        userModel.findOne({name: name}, (err, u) => {
            res.send('User\'s age is ' + u.age);
        });
    }
}

function cryptHandler(req, res) {
    let id = req.params['id'];
    const dir = id.length < 10;
    const cipher = crypt(id, dir);
    res.send(cipher + ' ' + dir);
}

function startWebEngine() {
    app.engine('html', engine.__express);
    app.set('views', __dirname + '/views');
    app.set('view engine', 'html');

    statics(app);

    app.get('/', rootHandler);
    app.get('/auth', authHandler);
    app.get('/test/:name/:age', testHandler);
    app.get('/test/:name', testHandler);
    app.get('/crypt/:id', cryptHandler);

    app.listen(HTTP_PORT, () => {
        console.warn('listening on ' + HTTP_PORT);
    });
}

function startEmergencyWebEngine(err) {
    app.get('/', (req, res) => {
        res.send('Initialization error: ' + err);
    });
    app.listen(HTTP_PORT, () => {});
}

init(err => {
    if (err) {
        console.warn('Initialization error:' + err);
        startEmergencyWebEngine(err);
    } else {
        startWebEngine();
    }
});

