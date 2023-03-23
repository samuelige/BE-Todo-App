const client = require("./index");

const connectDB = async () => {
    client.connect(function(err) {
        if(err) {
          return console.error('could not connect to postgres', err);
        }
        client.query('SELECT NOW() AS "theTime"', function(err, result) {
          if(err) {
            return console.error('error running query', err);
          }
          console.log('connected to database');
        });
    });
    
}

module.exports = connectDB;