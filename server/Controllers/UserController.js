const { User } = require('../models');
const { comparePassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class UserController {
    static async registerUser(req, res, next) {
        try {
            const { name, email, password, phase } = req.body;

            if (!name || !email || !password || !phase) {
                throw { name: 'Bad Request Body' };
            }

            const validPhases = ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3'];
            if (!validPhases.includes(phase)) {
                throw { name: 'Bad Request Phase' };
            }


            await User.create({ name, email, password, phase });
            res.status(201).json({
                message: "Success Create New User"
            });

        } catch (error) {
            console.log(error);
            next(error);
        }
    }

    static async loginUser(req, res, next) {
        try {
            const { email, password } = req.body;

            // console.log(req.body, `data req body`);

            const user = await User.findOne({ where: { email } }); // Correct model is 'User'

            // const { name, phase } = req.loginInfo

            console.log(user);

            if (user && comparePassword(password, user.password)) {
                const accessToken = signToken({ id: user.id, name: user.name, email: user.email, phase: user.phase });

                // console.log(accessToken, "<<<<<<<<");
                res.status(200).json({ accessToken });
            } else {
                throw { name: "Login Error", message: "Invalid email or password" };
            }
        } catch (error) {
            console.error('Error during login:', error); // Debug log
            next(error);
        }
    }
}

module.exports = UserController;
