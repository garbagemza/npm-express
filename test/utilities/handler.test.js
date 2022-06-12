//
// handler.test (06/04/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { handler } = require('../../lib/utilities')

describe('utilities.handler', () => {
    test('controllerBehavesNormal_shouldHandleOk', () => { 
        const statusFn = jest.fn((code) => {})
        const sendFn = jest.fn(() => {})
        const doneFn = jest.fn(() => {})
    
        const res = {
            status: statusFn,
            send: sendFn
        }
        const fn = (req, res, logger) => {
            return undefined
        }
        const req = {
            body: 'hello',
            logger: {error: () => {}, info: () => {}}
        }
        handler(fn)(req, res, doneFn)
        expect(statusFn.mock.calls.length).toBe(0)
        expect(sendFn.mock.calls.length).toBe(0)
        expect(doneFn.mock.calls.length).toBe(0)
    })
    
    test('controllerThrowsError_shouldHandle', () => {
        const statusFn = jest.fn((code) => {})
        const sendFn = jest.fn(() => {})
        const doneFn = jest.fn(() => {})
    
        const res = {
            status: statusFn,
            send: sendFn
        }
        const fn = (req, res, logger) => {
            throw {message: 'oops, an error'}
        }
        const req = {
            body: {data: 'some data'},
            logger: {error: () => {}, info: () => {}}
        }

        handler(fn)(req, res, doneFn)
        expect(statusFn.mock.calls.length).toBe(1)
        expect(sendFn.mock.calls.length).toBe(1)
        expect(doneFn.mock.calls.length).toBe(0)
    })
    
})
