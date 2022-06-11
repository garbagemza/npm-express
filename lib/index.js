//
// index (06/10/2022)
//
// MIT License
// Copyright (c) 2022 garbagemza


const express = require('express')
const expressWrapper = require('./wrapper')

module.exports = (options) => expressWrapper(express, options)
