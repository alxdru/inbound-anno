"use strict";
const mongoose = require('mongoose');
const { dbCreds } = require('./utils/config');

const port = process.env.PORT || 4003;

function dbConnect(cb) {
    mongoose.connect(dbCreds.uri, { useNewUrlParser: true});

    const db = mongoose.connection;
    // Added check for DB connection
    if(!db) {
        console.log("Error connecting db!");
    } else {
        console.log("Db connected successfully!");
        cb();
    }
}

module.exports.setupDBConnection = dbConnect;