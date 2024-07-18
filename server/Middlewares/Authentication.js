const { verifyToken } = require("../helpers/jwt");
const { Author } = require("../models/index");
// const jwt = require('jsonwebtoken');

async function authentication(req, res, next) {
    try {
        const { authorization } = req.headers;

        if (!authorization) throw { name: "Unauthorized" };

        const access_token = authorization.split(" ")[1];

        const payload = verifyToken(access_token);

        const user = await Author.findOne({
            where: {
                email: payload.email
            }
        });

        if (!user) throw { name: "Unauthorized" };

        req.loginInfo = {
            authorId: user.id,
            phase :user.phase
        };

        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = authentication;

