let Promise = require('promise');
let getStaticFile = require('./staticFileHandler.js');
let respond = require('./respond.js');

/**
 * Function that returns Question Page for client as Promise
 * @param {*} context Azure Function Context
 * @param {string} fileName - name of File
 * @return {Promise} Static Question Page for client
 */
exports.serveStaticFile = function (context, fileName) {
    return new Promise(function (fulfill, reject) {
        try {
            let folderName = 'client';
            getStaticFile.getStaticFile(context, folderName, fileName).then(function (data) {
                // Parsing and extracting data
                return respond.respondWithData(context, data);
            }).then(function () {
                // fulfilling...
                fulfill();
            }).catch(function (exception) {
                context.log(exception);
                respond.respondWithError(context).then(function() {
                    fulfill();
                });
            });
        } catch (exception) {
            context.log(exception);
            respond.respondWithError(context).then(function() {
                fulfill();
            });
        }
    });
};
