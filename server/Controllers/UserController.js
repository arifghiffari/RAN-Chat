const { User } = require('../models');
const { comparePassword, hashPassword } = require('../helpers/bcrypt');
const { signToken } = require('../helpers/jwt');

class UserController {
    static async registerUser(req, res, next) {
        try {
            const { name, email, password, phase } = req.body;
            
            if (!name || !email || !password || !phase) {
                throw { name: 'Bad Request', message: 'Please input your Name, E-mail, Password, and Phase' };
            }
            
            const validPhases = ['Phase 0', 'Phase 1', 'Phase 2', 'Phase 3'];
            if (!validPhases.includes(phase)) {
                throw { name: 'Bad Request', message: 'Invalid phase provided' };
            }
            
            const hashedPassword = await hashPassword(password); // Hash the password before storing
            
            await User.create({ name, email, password: hashedPassword, phase });
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
            
            if (user && comparePassword(password, user.password)) {
                const accessToken = signToken({ id: user.id, email: user.email });

                console.log(accessToken, "<<<<<<<<");
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
