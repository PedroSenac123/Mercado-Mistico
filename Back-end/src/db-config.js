const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database:"mercado",
});

connection.connect((err) => {
    if(err){
        throw err;
    } else {
        console.log("Myswl conectado")
    }
});


module.exports = connection;