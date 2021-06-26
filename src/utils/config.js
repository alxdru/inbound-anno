module.exports = {
    service: process.env.MESSAGING_SERVICE_NAME,
    inboundNewsAPI: process.env.XBEM_INBOUND_NEWS_API,
    reconnectRetryMS: process.env.RECONNECT_RETRY_MS,
    dbCreds: {
        uri: "mongodb+srv://anno-admin:UZ3PHkeeFPxo5dhJ@annocluster.hqufj.mongodb.net/db-annotation-app?retryWrites=true&w=majority"
    }
};