const express = require('express');
const path = require('path');
const moment = require('moment');
const configViewEngine = (app) => {
  app.use(express.static('./src/public'));
  app.set('view engine', 'ejs');
  app.set('views', path.join(__dirname, '../views'));
  app.use((req, res, next) => {
    res.locals.moment = moment;
    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET, POST, OPTIONS, PUT, PATCH, DELETE'
    );

    // Request headers you wish to allow
    res.setHeader(
      'Access-Control-Allow-Headers',
      'X-Requested-With,content-type'
    );

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });
};

module.exports = configViewEngine;
