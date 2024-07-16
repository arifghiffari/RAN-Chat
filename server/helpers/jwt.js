const jwt = require('jsonwebtoken');
const secretKey = 'aman'

const signToken = (payload) => {
    return jwt.sign(payload, secretKey);
}

const verifyToken = (payload) => {
    return jwt.verify( payload , secretKey);
}

module.exports = { signToken, verifyToken }