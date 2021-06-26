
'use strict';

const { broker } = require('./src/broker');
const dbService = require('./src/dbService');

function start() {
  console.log("Starting up services..");
  console.log("Setup inbound broker.");
  broker.setupConnection(() => {
    console.log("Broker has been set up!");
  });

  console.log("Setup database connection.");
  dbService.setupDBConnection(() => {
    console.log("Connection to database has been established successfully");
  });  
}

start();