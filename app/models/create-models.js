//with out any
var SequelizeAuto = require('sequelize-auto');
// const { dialect } = require('../config/env');
var auto = new SequelizeAuto('pegasus', 'webapp', 'Webapppassword$1',{
  host: '104.239.245.120',
  port:'3306',
  dialect: 'mysql',
  additional: { timestamps: false},
  tables: ['agitator_etraveler']
});

auto.run(function (err) {
  if (err) throw err;

  console.log(auto.tables); // table list
  console.log(auto.foreignKeys); // foreign key list
});

/* //if you want to use with specified options
var auto = new SequelizeAuto('database', 'user', 'pass', {
    host: 'localhost',
    dialect:  mysql, //'mysql'|'mariadb'|'sqlite'|'postgres'|'mssql', but install perticular dialect
    directory: false, // prevents the program from writing to disk
    port: 'port',
    additional: {
        timestamps: false
        //...
    },
    //tables:['table1', 'table2', 'table3']
    //...
})*/
