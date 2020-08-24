'use strict';

const express = require('express');
const cookieParser = require('cookie-parser');

const handlers = require('./handlers');

const app = express();

app.engine('pug', require('pug').__express);
app.set('view engine', 'pug');
app.use(handlers.logger);
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.get('/', handlers.serveHome);

module.exports = app;
