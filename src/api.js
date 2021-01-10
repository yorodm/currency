'use strict';

//
// external modules
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
//
// internal modules
const currencyController = require('./controller');

//
// config express
const server = express();
// for parsing application/json
server.use(bodyParser.json());
// cors
server.use(cors());

//
// routes
server.get('/:market/currency', currencyController.getAllByMarket);
server.get('/currency', currencyController.getAll);
server.get('/currency/:id', currencyController.getOne);
server.post('/currency', currencyController.create);
server.put('/currency/:id', currencyController.update);
server.delete('/currency/:id', currencyController.delete);

//
// exposed server
module.exports = server;
