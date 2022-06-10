//
// builder (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

class Builder {
    
    #app

    #call

    #validators = []

    #controllers = []

    // global validators and handlers
    #bodyValidator
    #paramValidator
    #handler

    constructor() {}

    withApp(app) {
        this.app = app
        return this
    }

    withBodyValidator(validator) {
        if (typeof validator != 'function') {
            throw new Error('Invalid body validator type. Expected function.')
        }

        this.bodyValidator = validator
        return this
    }

    withParamValidator(validator) {
        if (typeof validator != 'function') {
            throw new Error('Invalid param validator type. Expected function.')
        }
        this.paramValidator = validator
        return this
    }

    withHandler(handler) {
        if (typeof handler != 'function') {
            throw new Error('Invalid handler type. Expected function.')
        }
        this.handler = handler
        return this
    }
    post(endpoint) {
        this.call = {method: 'post', endpoint: endpoint}
        return this
    }

    get(endpoint) {
        this.call = {method:'get', endpoint: endpoint}
        return this
    }

    validateBody(fn) {
        if (typeof fn != 'function') {
            throw new Error('Invalid body validator type. Expected function.')
        }
        this.#validators.push({type: 'body', fn: fn})
        return this
    }

    validateParam(fn) {
        if (typeof fn != 'function') {
            throw new Error('Invalid param validator type. Expected function.')
        }
        this.#validators.push({type: 'param', fn: fn})
        return this
    }

    controller(controller) {
        if (typeof controller != 'function') {
            throw new Error('Invalid controller type.')
        }
        this.#controllers.push(controller)
        return this
    }

    build() {
        if (this.app === undefined) {
            throw new Error('Missing app.')
        }

        if (this.bodyValidator === undefined) {
            throw new Error('Missibg bodyValidator.')
        }

        if (this.paramValidator === undefined) {
            throw new Error('Missing paramValidator.')
        }

        if (this.handler === undefined) {
            throw new Error('Missing handler.')
        }

        if (this.call === undefined) {
            throw new Error('Missing endpoint.')
        }

        this.#validators.forEach(element => {
            const validator = this.getValidator(element.type)
            this.app[this.call.method](this.call.endpoint, validator(element.fn)) 
        })

        this.#controllers.forEach(controller => {
            this.app[this.call.method](this.call.endpoint, this.handler(controller))
        })

        return {}
    }

    get app() {
        return this.#app
    }

    set app(app) {
        this.#app = app
    }

    get call() {
        return this.#call
    }

    set call(endpoint) {
        if (this.#call !== undefined) {
            throw new Error('Endpoint already been set.')
        }
        this.#call = endpoint
    }

    get bodyValidator() {
        return this.#bodyValidator
    }

    set bodyValidator(validator) {
        this.#bodyValidator = validator
    }

    get paramValidator() {
        return this.#paramValidator
    }

    set paramValidator(validator) {
        this.#paramValidator = validator
    }

    getValidator(type, fn) {
        switch (type) {
            case 'body': return this.bodyValidator
            case 'param': return this.paramValidator
            default:
                throw new Error('Unknown validator')
        }
    }
}

module.exports = Builder
