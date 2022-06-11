//
// wrapper (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { catchAll, health } = require('./middlewares')
const { handler } = require('./utilities')
const MetaBuilder = require('./metaBuilder')

var logger = {}

module.exports = (express, options) => {
    logger = checkRequired(options, 'verbose')
    checkRequiredCallbacks(options)

    const meta = new MetaBuilder(express)
    
    options.beforeInitialization(meta)
    beforeMiddleware(express, meta.app)
    options.addMiddlewares(meta)
    afterMiddleware(meta.app)
    options.afterInitialization(meta.app)
}

const checkRequired = (options, parameter) => {
    if (options[parameter] === undefined) {
        throw new Error(`Undefined parameter '${parameter}'`)
    }
    return options[parameter]
}

const checkRequiredCallbacks = function(callbacks) {
    const names = ['beforeInitialization', 'afterInitialization', 'addMiddlewares']
    names.forEach(name => {
        if (callbacks[name] === undefined) {
            throw Error(`expected ${name} callback.`)
        }
    })
}

const beforeMiddleware = function(express, app) {
    app.use(express.json())

    // this middleware intercepts all calls and log the path
    app.use( (req, _, done) => {
        logger.info(`[${req.method}] ${req.originalUrl}`);
        done();
    })
}

const afterMiddleware = function(app) {
    health(app)
    catchAll(app, handler)
}
