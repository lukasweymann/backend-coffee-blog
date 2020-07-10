const md5 = require('md5');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user-model');

const login = async (req, res) => {
    const { username, password } = req.body;
    const receivedPasswordHash = md5(password + process.env.SALT);

    try {
        const users = await userModel.getUserByUsername(username);

        if (users.rows.length) {
            const user = users.rows[0];

            if (user.password_hash === receivedPasswordHash) {
                const userPayload = {
                    first_name: user.first_name,
                    last_name: user.last_name,
                    username: user.username,
                };

                const token = jwt.sign(userPayload, process.env.JWT_SECRET);

                return res.send({ error: null, token });
            }

            res.send({
                error: 'Wrong password'
            });
        }

        res.send({
            error: 'User not found'
        });
    } catch (error) {
        res.send({
            error: error.message,
        });
    }
}


module.exports = {
    login,
};