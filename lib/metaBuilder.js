//
// metaBuilder (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const Builder = require('./builder')
const { bodyValidator, paramValidator, handler } = require('./utilities')

class MetaBuilder {
    #app
    #express

    constructor(express) {
        this.express = express
        this.app = express()
    }

    builder() {
        return new Builder()
            .withApp(this.app)
            .withBodyValidator(bodyValidator)
            .withParamValidator(paramValidator)
            .withHandler(handler)
    }

    set express(express) {
        if (typeof express !== 'function') {
            throw new Error('Invalid express object.')
        }
        this.#express = express
    }

    set app(app) {
        this.#app = app
    }

    get app() {
        return this.#app
    }
}

module.exports = MetaBuilder
