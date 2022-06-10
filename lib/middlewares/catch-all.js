const createError = require('http-errors')

function catchAll(app, handler) {
    app.use(handler((req, res, logger) => {
        logger.warn('server.handler.unmatched')
        res.status(404)
        res.json(new createError(404, "Not found."))
    }))
}

module.exports = catchAll