const mysql = require("mysql");

// Creating a connection to the database:
const connection = mysql.createPool({

    // machine:
    host: config.mysql.host,

    // username:
    user: config.mysql.user,

    // password: 
    password: config.mysql.password,

    // database name: 
    database: config.mysql.name

});

function executeAsync(sql,values) {
    return new Promise((resolve, reject) => {
        connection.query(sql,values, (err, result) => {
            if(err) return reject(err);
            resolve(result);
        });
    });
}

module.exports = {
    executeAsync
};