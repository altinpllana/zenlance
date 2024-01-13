const mysql = require('mysql')

const connection = mysql.createConnection({
    host: 'localhost',
    user: '',
    password: '',
    database: '',
});

connection.connect((err) => {
    if (err) {
        console.log('Error with mysql connection: ', err);
        throw err;
    }

    console.log('Connected to mysql database!');
})

procces.on('SIGINT', () => {
    connection.end();
    process.exit();
})

module.exports = connection;