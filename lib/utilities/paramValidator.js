//
// paramValidator (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const createError = require('http-errors')

const validator = (func) => (req, res, done, logger) => {
    try {
        logger.info('utilities.param.validator.begun')
        logger.info(`utilities.param.validator.params ${JSON.stringify(req.params)}`)
        func(req.params)
        done()
    } catch(e){
            logger.warn('utilities.param.validator.failed')
            logger.warn(e.message)
            res.status(400)
            res.send(new createError(400))
    }
}

module.exports = validator