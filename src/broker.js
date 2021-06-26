'use strict';

/** Basic setup in respect to modules, messaging settings and getting messaging options */

const msg    = require('@sap/xb-msg');
const msgenv = require('@sap/xb-msg-env');
const { service, inboundNewsAPI, reconnectRetryMS } = require('./utils/config');

const { TaskController } = require('./controller/taskController');

class Broker {
    constructor() {
        const options = msgenv.msgClientOptions(service, [inboundNewsAPI], []);
        this.client = new msg.Client(options);
    }

    initializeControllers() {
        this.taskController = new TaskController();
    }

    setupGenericListeners() {
        /** Messaging client handler methods */
        this.client
            .on('connected', () => {
                console.log('connected to SAP Event Mesh service');
            })
            .on('error', (err) => {
                console.log('error on SAP Event Mesh service occurred ' + err);
            })
            .on('disconnected', (hadError) => {
                console.log('connection to SAP Event Mesh service lost, trying to reconnect in ' + reconnectRetryMS + ' ms');
                setTimeout(()=> client.connect(), reconnectRetryMS);
            });
    } 
    setupInboundHandler() {
        /** Input stream handler methods */

        this.client.istream(inboundNewsAPI)
            .on('subscribed', () => {
                console.log('subscribed to ' + inboundNewsAPI);
            })
            .on('ready', () => {
                console.log('stream ready: ' + inboundNewsAPI);
            })
            .on('data', (message) => {

                let topic = 'dummy';
                if (message.source) {
                    if (typeof message.source === 'string') {
                        topic = message.source;
                    } else if (message.source.topic) {
                        topic = message.source.topic;
                    }
                }

                /** Write the message payload to the log file */

                console.log('message received: ' + message.payload.toString());

                this.taskController.create(message.payload.toString());
                message.done();
            });
    }

    setupConnection(cb) {
        /** Initializing objects, listeners, handlers */
        this.initializeControllers();
        this.setupGenericListeners();
        this.setupInboundHandler();        

        try {
            this.client.connect();
            cb();
        } catch (e) {
            console.log("Error on establishing broker connection " + e.message);
        }
    }
}  

const broker = new Broker();

module.exports.broker = broker;
