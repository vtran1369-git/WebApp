const express = require('express');
const app = express();

var bodyParser = require('body-parser');
 
const db = require('./app/config/db.config.js');
  
// force: true will drop the table if it already exists
/* db.sequelize.sync({force: false}).then(() => {
  console.log('stop drop the tables { force: false }');
});  */

let router = require('./app/routers/router.js');

const cors = require('cors')
const corsOptions = {
  origin: 'http://localhost:3000',
  optionsSuccessStatus: 200
}
//app.use(cors(corsOptions));
app.use(cors());
app.use(bodyParser.json());
app.use('/', router);

// Create a Server
const server = app.listen(8080, function () {
  let host = server.address().address
  let port = server.address().port
  console.log("App listening at http://%s:%s", host, port); 
})