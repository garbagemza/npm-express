//
// handler (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const createError = require('http-errors')

const handler = (func) => (req, res, done) => {
    const logger = req.logger
    try {
        logger.info('server.handler.begun');
        func(req, res, logger);
    } catch(e){
        logger.error('server.handler.failed');
        logger.error(e.stack)
        res.status(500)
        res.send(new createError(500))
    }
}

module.exports = handler