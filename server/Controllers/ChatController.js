const { User } = require('../models')

class ChatController {
    static async viewHome(req, res, next) {
        const { id } = req.loginInfo
        // console.log(phase);
        const user = await User.findByPk(id)
        console.log(user);

        try {
            res.status(200).json({
                message: "Welcome to the Chat Home Page",
            });
        } catch (error) {
            console.log(error);
            next(error);
        }
    }
}

module.exports = ChatController;
