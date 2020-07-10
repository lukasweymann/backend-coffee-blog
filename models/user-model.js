const { pool } = require('./db-connector');


const getUserByUsername = (username) => {
    return (
        pool.query(`
            SELECT * FROM users WHERE username=$1;
        `, [username])
    )
};


module.exports = {
    getUserByUsername,
};