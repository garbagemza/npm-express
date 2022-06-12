//
// bodyValidator (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza


const createError = require('http-errors')

const validator = (func) => (req, res, done) => {
    const logger = req.logger
    try {
        logger.info('server.validator.begun')
        logger.info(`server.validator.data ${JSON.stringify(req.body)}`)
        func(req.body)
        logger.info('server.validator.ok')
        done()
    } catch(e){
            logger.warn('server.validator.failed')
            logger.warn(e.message)
            res.status(400)
            res.send(new createError(400))
    }
}

module.exports = validator