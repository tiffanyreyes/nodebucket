/**
 * Title: app.js
 * Author: Tiffany Reyes
 * Date: 10/25/2023
 */
'use strict'

// Require statements
const express = require('express')
const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');
// API Routes
const EmployeeAPI = require('./routes/employee-routes');

const mongoose = require('mongoose');
const createServer = require('http-errors')
const path = require('path')

// Create the Express app
const app = express()

// Configure the app
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(express.static(path.join(__dirname, '../dist/nodebucket')))
app.use('/', express.static(path.join(__dirname, '../dist/nodebucket')))

const CONN = 'mongodb+srv://web450_admin:m3an@bellevueuniversity.paicaia.mongodb.net/web450DB'

mongoose.connect(CONN).then(() => {
    console.log('Connection to MongoDB database was successful');
}).catch(err => {
    console.log('MongoDB Error: ' + err.message);
})

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Nodebucket API',
            version: '1.0.0'
        },
    },
    apis: ['./routes/*.js']
}

const openapiSpecification = swaggerJsdoc(options);

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(openapiSpecification));
app.use('/api', EmployeeAPI);

app.get('', function(req, res) {
  res.redirect('/api-docs');
});

// error handler for 404 errors
app.use(function(req, res, next) {
  next(createServer(404)) // forward to error handler
})

// error handler for all other errors
app.use(function(err, req, res, next) {
  res.status(err.status || 500) // set response status code

  // send response to client in JSON format with a message and stack trace
  res.json({
    type: 'error',
    status: err.status,
    message: err.message,
    stack: req.app.get('env') === 'development' ? err.stack : undefined
  })
})

module.exports = app // export the Express application