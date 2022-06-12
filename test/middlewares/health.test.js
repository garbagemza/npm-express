//
// health.test (06/05/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza

const { health } = require('../../lib/middlewares')

test('should send error', () => {
    const statusFn = jest.fn()
    const sendFn = jest.fn()
    const reqFn = jest.fn()
    const res = { status: statusFn, send: sendFn }
    const getFn = jest.fn((_, fn) => { fn(reqFn, res)})
    const app = { get: getFn }
    const t = () => health(app)
    expect(t).not.toThrow()
})
