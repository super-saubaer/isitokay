let Promise = require('promise');
let serverStaticFile = require('./serveFile.js');
let tableStorage = require('./tableStorage.js');
let respond = require('./respond.js');

/**
 * Function that stores client Data on Table Storage and generates Answer Link
 * @param {*} context - Azure Function Context
 * @param {string} question - name of folder
 * @return {Promise} - Promise
 */
exports.generateAnswerPage = function (context, question) {
    return new Promise(function (fulfill, reject) {
        try {
            context.log(question);
            tableStorage.getDataFromTable(context, question).then(function (data) {
                // Everything defined?
                if (!data || !data._) {
                    context.log('question Data not defined!');
                    throw new Error('question Data not defined!');
                }
                file = 'answer.html';
                serverStaticFile.serveAnswerFile(context, file, data._).then(function () {
                    fulfill();
                });
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
