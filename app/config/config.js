const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  /* endpoint: process.env.API_URL,
  masterKey: process.env.API_KEY, */
  port: process.env.PORT,
  'secret': 'vientran-super-secret-key',
  CDM_QRY: process.env.CDM_QRY
};

