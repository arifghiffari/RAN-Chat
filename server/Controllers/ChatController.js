class ChatController {
    static async viewHome(req, res, next) {
        // const { phase } = req.loginInfo
        // console.log(phase);
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
