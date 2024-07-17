const { verifyToken } = require("../helpers/jwt");
const { User } = require("../models/index");

async function authentication(req, res, next) {
    try {
        const { authorization } = req.headers;

        if (!authorization) throw { name: "Unauthorized" };

        const access_token = authorization.split(" ")[1];

        const payload = verifyToken(access_token);

        // console.log(payload);

        const user = await User.findOne({
            where: {
                email: payload.email
            }
        });


        if (!user) throw { name: "Unauthorized" };

        req.loginInfo = {
            UserId: user.id,
            name: user.name,
            phase: user.phase
        };

        // console.log(req.loginInfo, data loginInfo di authentication);
        next();
    } catch (error) {
        console.log(error);
        next(error);
    }
}

module.exports = authentication;