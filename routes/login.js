const express = require('express');
const { Pool } = require('pg');
const md5 = require('md5');
const router = express.Router();

const pool = new Pool({
    user: 'hknhljuc',
    host: 'ruby.db.elephantsql.com',
    database: 'hknhljuc',
    password: 'rJxB8_RhTsodD-zJVJ07YAwBAb15RnPB',
    port: 5432,
});

router.get('/', function (req, res) {
    res.send('Pat the POSTman');
});

router.post('/', (req, res) => {
    const { username, password } = req.body;

    pool
        .query(`SELECT * FROM users WHERE username='${username}';`)
        .then((data) => {
            const returnedTable = data.rows; // array of records

            if (returnedTable.length === 0) {
                // this return is here to exit the function if the condition is true
                return res.send({ error: 'No records found' });
            }

            const userFromDb = returnedTable[0];

            const tokenPayload = {
                firstName: userFromDb.first_name,
                lastName: userFromDb.last_name,
            };

            const secretForToken = 'SECRET_FOR_TOKEN';

            const tokenPayloadAsString = JSON.stringify(tokenPayload);
            const buff = new Buffer(tokenPayloadAsString);
            const base64Payload = buff.toString('base64'); // First part of the token
            const signature = md5(base64Payload + secretForToken); // Second part of the token

            const detailedInfoAboutUser = `${base64Payload}.${signature}`;

            // building hash for the password that is received from request
            const salt = 'SOME_SECRET_HERE';
            const receivedHashedPassword = md5(coffee + salt);

            const passwordsHashesMatch = userFromDb.password_hash === receivedHashedPassword;

            if (passwordsHashesMatch) {
                res.send({ error: null, token: detailedInfoAboutUser });
            } else {
                res.send({ error: 'Failed' })
            }
        })
        .catch(err => {
            res.send({ error: err.message });
        })
});

module.exports = router;