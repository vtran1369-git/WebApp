const mssql = require('mssql');
const sqlConfig = {
  user: "appEWOI",
  password: "mSf!zur@01",
  database: "iERP90_PROD",
  server: "USSC2-ERP-DB-P.amer.thermo.com",
  pool: {
    max: 10,
    min: 0,
    idleTimeoutMillis: 30000
  }
}
console.log("running testConn..")
const TABLE = 'dbo.JM_MFC_CDM_WorkOrders'

// Import the mssql module


// Create a connection pool
const pool = new mssql.ConnectionPool({
  user: 'appEWOI',
  password: 'mSf!zur@01',
  server: 'USSC2-ERP-DB-P.amer.thermo.com',
  database: 'iERP90_PROD',
  options: {
    trustedConnection: true,
    encrypt: true,
    enableArithAbort: true,
    trustServerCertificate: true,

},
});

// Connect to the database
pool.connect().then(() => {
  // Query the database
  const request = new mssql.Request(pool);
  request.query(`SELECT * FROM dbo.JM_MFC_CDM_WorkOrders`, (err, result) => {
    if (err) {
      console.log(err);
      return;
    }

    // Do something with the results
    console.log(result);
  });
});

// Close the connection pool
// pool.close();