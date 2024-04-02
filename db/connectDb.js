const mysql2 = require('mysql2');

exports.connectDb = () => {
    const createConnection = mysql2.createPool({
        user: 'root',
        password: 'jaichandar',
        host: 'localhost',
        port: '3306',
        database: 'sakila'
    })
    global.db = createConnection;
    return new Promise((resolve) => { resolve({ success: true, message: 'DB connected Successfully' }) })
}