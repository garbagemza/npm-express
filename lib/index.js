const express = require('express')
const expressWrapper = require('./wrapper')

module.exports = (options) => expressWrapper(express, options)
