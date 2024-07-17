const errorHandler = (err, req, res, next) => {
    let status = 500
    let message = 'Internal Server Error'

    if (err.name == 'SequelizeValidationError') {
        status = 400
        message = err.errors[0].message
    }

    if (err.name == 'Bad Request Body') {
        status = 400
        message = 'Please input your Name, E-mail, Password, and Phase'
    }

    if (err.name == 'Bad Request Phase') {
        status = 400
        message = 'Invalid phase provided'
    }
    if (err.name == 'SequelizeUniqueConstraintError') {
        status = 400
        message = err.errors[0].message
    }

    if (err.name == 'SequelizeDatabaseError' || err.name == 'SequelizeForeignKeyConstraintError') {
        status = 400
        message = 'Invalid input'
    }

    if (err.name == 'InvalidLogin') {
        message = 'Please input email or password'
        status = 401
    }

    if (err.name == 'LoginError') {
        message = 'Invalid email or password'
        status = 401
    }

    if (err.name == 'Unauthorized' || err.name == 'JsonWebTokenError') {
        message = 'Please login first'
        status = 401
    }

    if (err.name == 'Forbidden') {
        message = 'You dont have any access'
        status = 403
    }

    if (err.name == 'NotFound') {
        status = 404
        message = `Data not found`
    }

    res.status(status).json({
        message
    })
}

module.exports = errorHandler