const express = require('express');
const initWebRoute = require('./router/index.js');
const configViewEngine = require('./config/viewEngine');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;
const cookieParser = require('cookie-parser');

app.use(morgan('combined'));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(cookieParser('asdfsdgfsdr243234'));

//config view engine
configViewEngine(app);

//init web route
initWebRoute(app);
app.use(cors({ origin: true }));
app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
