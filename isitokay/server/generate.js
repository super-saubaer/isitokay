let Promise = require('promise');
let respond = require('./respond.js');

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


            respond.respondWithData(context, encodeURIComponent('https//weirdquestion.io?question=asdhjskdhjs')).then(function () {
                fulfill();
            });
        } catch (exception) {
            respond.respondWithError().then(function () {
                fulfill();
            });
        }
    });
};