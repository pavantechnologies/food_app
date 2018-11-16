const sql=require('mysql');
const utl=require('util');

const db=require('../applicationconfig').db;

var pool=sql.createPool(db);

pool.getConnection((err, connection) => {
    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
            console.error('Database connection was closed.')
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
            console.error('Database has too many connections.')
        }
        if (err.code === 'ECONNREFUSED') {
            console.error('Database connection was refused.')
        }
    }
    if (connection) {
        console.log("connected to db on 3306")
    }connection.release()
    return
})

pool.query=utl.promisify(pool.query);

module.exports=pool;