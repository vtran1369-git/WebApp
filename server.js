const express = require('express');
const app = express();
const bodyParser = require('body-parser');
// const db = require('./app/config/db.config.js');
const multer = require('multer');
const upload = multer();
const path = require('path');
//Use to get values from .env file
require('dotenv').config();

// force: true will drop the table if it already exists
/* db.sequelize.sync({force: false}).then(() => {
  console.log('stop drop the tables { force: false }');
});  */

const cors = require('cors');

let router = require('./app/routers/router.js');

/* const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: process.env.CLIENT_ORIGIN,
  optionsSuccessStatus: 200
}; */
const corsOptions = {
  // origin: 'http://localhost:3000',
  origin: '*',
  Credential: true,
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
app.use(cors());

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use('/', router);

//TODO: added to check if Auth.login working or not, NEED TO VERFIY..
/* app.use(function(req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
});

 */

//just added for upload files parsing multipart/form-data
app.use(upload.array());


app.use(function(req, res, next) {
  res.header(
    // "Access-Control-Allow-Origin", process.env.CLIENT_ORIGIN,
    "Access-Control-Allow-Origin", '*',
    "Access-Control-Allow-Headers",
    "x-access-token, Origin, Content-Type, Accept"
  );
  next();
})
//use for production environment
// app.use(express.static(path.join(__dirname, "./clients/build")));

/* app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, './clients/build/index.html'))
}) */
/* app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "./clients/build/index.html"))
}) */


// Create a Server
const PORT = process.env.PORT || 8080

// const server = app.listen(8080, function () {
const server = app.listen(PORT, function () {
  let host = server.address().address
  let port = server.address().port
  console.log(">>>> App listening at http://%s:%s", host, port); 
})