//
// wrapper.test (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const wrapper = require('../../lib/wrapper')

describe('express.wrapper', () => {
    test('constructor_missingVerbose_shouldThrow', () => {
        expect.assertions(1)
        try {
            const express = require('express')
            const init = basicInit()
            init.verbose = undefined
            wrapper(express, init)
        } catch (error) {
            expect(error.message).toBe(`Undefined parameter 'verbose'`)
        }
    })

    test('constructor_missingCallback_shouldThrow', () => {
        expect.assertions(1)
        try {
            const express = require('express')
            const init = basicInit()
            init.beforeInitialization = undefined
            wrapper(express, init)
        } catch (error) {
            expect(error.message).toBe(`expected beforeInitialization callback.`)
        }
    })

    test('mockCall_callAfterInitialization_shouldValidate', () => {
        const req = {}
        const res = {
            status: () => {},
            send: () => {}
        }
        const done = () => {}
        const app = {
            use: (fn) => {
                if (typeof fn === 'function')
                    fn(req, res, done, {error: () => {}})
            },
            get: () => undefined
        }
        const express = () => { return app }
        express.json = () => undefined

        wrapper(express, {
            verbose: {
                info: () => {}
            },
            beforeInitialization: () => {},
            afterInitialization: () => {},
            addMiddlewares: () => {}
        })
    })
    const basicInit = () => {
        return {
            verbose: {},
            beforeInitialization: () => {},
            afterInitialization: () => {},
            addMiddlewares: () => {}
        }
    }
})
