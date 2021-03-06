let Promise = require('promise');
let randomstring = require('randomstring');
let respond = require('./respond.js');
let tableStorage = require('./tableStorage.js');
// const query = '/';

/**
 * Function that stores client Data on Table Storage and generates Answer Link
 * @param {*} context - Azure Function Context
 * @param {JSON} clientData - name of folder
 * @return {Promise} - Promise
 */
exports.generateAnswerLink = function (context, clientData) {
    return new Promise(function (fulfill, reject) {
        try {
            context.log('trying to generate answer link');
            context.log(clientData);

            let rowKey = randomstring.generate({
                length: 12,
                charset: 'alphabetic',
            });

            tableStorage.storeDataOnTable(context, rowKey, clientData).then(function (data) {
                // Responding with Link to rowKey
                respond.respondWithData(context, encodeURIComponent(rowKey)).then(function () {
                    fulfill();
                });
            }).then(function () {
                // fulfilling...
                fulfill();
            }).catch(function (exception) {
                context.log(exception);
                respond.respondWithError(context).then(function () {
                    fulfill();
                });
            });
        } catch (exception) {
            context.log(exception);
            respond.respondWithError().then(function () {
                fulfill();
            });
        }
    });
};
