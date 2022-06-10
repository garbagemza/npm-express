//
// metaBuilder.test (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza
const MetaBuilder = require('../../lib/metaBuilder')

describe('express.metaBuilder', () => {
    test('init', () => {
        const express = require('express')
        const meta = new MetaBuilder(express)
        meta.builder()
            .post('/')
            .build()
    })

    test('constructor_missingParam_shouldThrow', () => {
        expect.assertions(1)
        try {
            new MetaBuilder()
        } catch (error) {
            expect(error.message).toBe('Invalid express object.')
        }
    })
})
