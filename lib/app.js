'use strict';

const express = require('express');

const handlers = require('./handlers');

const app = express();

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.use(handlers.logger);
app.use(express.static('public'));
app.get('/', handlers.serveHome);

module.exports = app;
