const { Pool } = require('pg');

const PG_URI = 'postgres://psberwia:oH3PG7eEXaceCLANWG_wRlDlrR-aFLzP@suleiman.db.elephantsql.com/psberwia';

// create a new pool here using the connection string above
const pool = new Pool({
  connectionString: PG_URI
});

module.exports = {
  query: (text, params, callback) => {
    console.log('executed query', text);
    return pool.query(text, params, callback);
  }
};