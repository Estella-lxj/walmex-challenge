'use strict';
const express = require('express');
const path = require('path')

const app = express();
const registerRoutes = require('./routes');

// configure the server so it serves the static assets from the public folder
const publicPath = path.join(__dirname, '../public');
app.use('/', express.static(publicPath));

// server config
const port = process.env.PORT || 3000;

// register routes
registerRoutes(app);

// create server start method
const start = () => {
    return new Promise((resolve, reject) => {
        // start the server
        app.listen(port, () => {
            console.log(`Connected to Port ${port}`);
            resolve()
        });
    }).catch((error) => {
        console.log(`failed to start server => ${error.message}`)
    });
}

module.exports = start;


