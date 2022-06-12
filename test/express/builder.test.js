//
// builder.test (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const Builder = require('../../lib/builder')


describe('express.builder', () => {
    test('callAllInitializers_shouldValidate', () => { 
        const bodyValidator = () => {}
        const paramValidator = () => {}
        const handler = () => {}
        const controller = () => {}
        const app = {
            post: () => {}
        }
        const builder = new Builder()
        const object = builder.withApp(app)
            .withBodyValidator(bodyValidator)
            .withParamValidator(paramValidator)
            .withHandler(handler)
            .post('/ticket')
            .validateBody(bodyValidator)
            .validateParam(paramValidator)
            .controller(controller)
            .build()
        expect(object).toStrictEqual({})
    })

    test('getValidator_invalidType_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder.getValidator('invalid')
        } catch (error) {
            expect(error.message).toBe(`Unknown validator`)
        }
    })

    test('set_callTwice_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder
                .post('')
                .post('')
        } catch (error) {
            expect(error.message).toBe(`Endpoint already been set.`)
        }
    })

    test('builder_missingEndpoint_shouldThrow', () => {
        expect.assertions(1)
        try {
            const app = {post: () => {}}
            const bodyValidator = () => {}
            const paramValidator = () => {}
            const handler = () => {}
            const builder = new Builder()
            builder
                .withApp(app)
                .withBodyValidator(bodyValidator)
                .withParamValidator(paramValidator)
                .withHandler(handler)
                .build()
        } catch (error) {
            expect(error.message).toBe(`Missing endpoint.`)
        }
    })

    test('builder_missingHandler_shouldThrow', () => {
        expect.assertions(1)
        try {
            const app = {post: () => {}}
            const bodyValidator = () => {}
            const paramValidator = () => {}
            const builder = new Builder()
            builder
                .withApp(app)
                .withBodyValidator(bodyValidator)
                .withParamValidator(paramValidator)
                .build()
        } catch (error) {
            expect(error.message).toBe(`Missing handler.`)
        }
    })

    test('builder_missingParamValidator_shouldThrow', () => {
        expect.assertions(1)
        try {
            const app = {post: () => {}}
            const bodyValidator = () => {}
            const builder = new Builder()
            builder
                .withApp(app)
                .withBodyValidator(bodyValidator)
                .build()
        } catch (error) {
            expect(error.message).toBe(`Missing paramValidator.`)
        }
    })

    test('builder_missingBodyValidator_shouldThrow', () => {
        expect.assertions(1)
        try {
            const app = {post: () => {}}
            const builder = new Builder()
            builder
                .withApp(app)
                .build()
        } catch (error) {
            expect(error.message).toBe(`Missibg bodyValidator.`)
        }
    })

    test('builder_missingApp_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder.build()
        } catch (error) {
            expect(error.message).toBe(`Missing app.`)
        }
    })

    test('set_controllerInvalid_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder.controller('')
        } catch (error) {
            expect(error.message).toBe(`Invalid controller type.`)
        }
    })

    test('set_validateParamInvalid_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder.validateParam(4)
        } catch (error) {
            expect(error.message).toBe(`Invalid param validator type. Expected function.`)
        }
    })

    test('set_validateBodyInvalid_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder.validateBody({})
        } catch (error) {
            expect(error.message).toBe(`Invalid body validator type. Expected function.`)
        }
    })

    test('set_get_shouldValidate', () => {
        const builder = new Builder()
        builder.get('')
    })

    test('set_withHandlerInvalid_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder.withHandler([])
        } catch (error) {
            expect(error.message).toBe(`Invalid handler type. Expected function.`)
        }
    })

    test('set_withBodyValidatorInvalid_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder.withBodyValidator('p')
        } catch (error) {
            expect(error.message).toBe(`Invalid body validator type. Expected function.`)
        }
    })

    test('set_withParamValidator_shouldThrow', () => {
        expect.assertions(1)
        try {
            const builder = new Builder()
            builder.withParamValidator(7)
        } catch (error) {
            expect(error.message).toBe(`Invalid param validator type. Expected function.`)
        }
    })

    test('set_withLogger_shouldValidate', () => {
        const builder = new Builder()
        builder.withLogger({})
    })

    test('constructor_validateSomething_shouldHandleOk', () => {
        const req = {
            body: {data: 'some data'},
            logger: {error: () => {}, info: () => {}, warn: () => {}}
        }
        const validator = (req, res, done) => (req, res, done)
        const controller = (req, res, done) => undefined
        const bodyValidator = require('../../lib/utilities/bodyValidator')
        const paramValidator = require('../../lib/utilities/paramValidator')
        const handler = require('../../lib/utilities/handler')

        const app = {
            post: (endpoint, fn) => fn(req, {}, () => {})
        }
        const builder = new Builder()
        const object = builder.withApp(app)
            .withLogger(req.logger)
            .withBodyValidator(bodyValidator)
            .withParamValidator(paramValidator)
            .withHandler(handler)
            .post('/ticket')
            .validateBody(validator)
            .controller(controller)
            .build()
        expect(object).toStrictEqual({})
    })

})
