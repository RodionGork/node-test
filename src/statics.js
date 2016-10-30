const express = require('express');

function useStatics(app) {
    app.use('/js', express.static(__dirname + '/static/js'));
    app.use('/css', express.static(__dirname + '/static/css'));
    app.use('/img', express.static(__dirname + '/static/img'));
}

module.exports = useStatics;

