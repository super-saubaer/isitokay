let Promise = require('promise');
let randomstring = require('randomstring');
let respond = require('./respond.js');
let tableStorage = require('./tableStorage.js');
// const baseUrl = 'https://weirdquestion.io?question=';
const baseUrl = 'http://localhost:7071/api/isitokay?question=';

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

            let rowKey = randomstring.generate({
                length: 12,
                charset: 'alphabetic',
            });

            tableStorage.storeDataOnTable(context, rowKey, JSON.stringify(clientData)).then(function (data) {
                // Responding with Link to rowKey
                respond.respondWithData(context, encodeURIComponent(baseUrl + rowKey)).then(function () {
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
