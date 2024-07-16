const { verifyToken } = require('../helpers/jwt')
const { User } = require('../models')

const authentication = async (req, res, next) => {
    try {
        const { authorization } = req.headers
        // console.log(authorization);
        
        if(!authorization) throw { name: "Unauthorized"}

        const access_token = authorization.split(' ')[1]
        // console.log(access_token);

        // di check tokennya sudah benar atau engga
        // 
        const payload = verifyToken(access_token)
        // console.log(payload, `>>> payload di auth`)

        const user = await User.findByPk(payload.id)
        // console.log(user, `>>> user di auth`);

        if(!user) throw { name: "Unauthorized"}

        req.loginInfo = {
            userId : user.id,
            email: user.email,
            role: user.role
        }

        next()

    } catch (err) {
        console.log(err);
        next(err)
    }
}

module.exports = authentication