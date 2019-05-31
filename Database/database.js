var mysql = require('mysql');



var connection = mysql.createPool({
    connectionLimit: 100,
    host : "localhost",
    user: "root",
    // password: process.env.DB_PASS,
    database: "ruledatabase",
    port: 3306
});


module.exports.connection = connection;