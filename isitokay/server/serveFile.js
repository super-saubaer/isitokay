let Promise = require('promise');
let getStaticFile = require('./staticFileHandler.js');
let respond = require('./respond.js');
let jsdom = require('jsdom');
const {JSDOM} = jsdom;
const folderName = 'dist';

/**
 * Function that returns Question Page for client as Promise
 * @param {*} context Azure Function Context
 * @param {string} fileName - name of File
 * @return {Promise} Static Question Page for client
 */
exports.serveStaticFile = function (context, fileName) {
    return new Promise(function (fulfill, reject) {
        try {
            getStaticFile.getStaticFile(context, folderName, fileName).then(function (data) {
                // Parsing and extracting data
                return respond.respondWithData(context, data);
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
            respond.respondWithError(context).then(function () {
                fulfill();
            });
        }
    });
};

/**
 * Function that returns Question Page for client as Promise
 * @param {*} context Azure Function Context
 * @param {string} fileName - name of File
 * @param {string} questionData - Stringified questiond ata
 * @return {Promise} Static Question Page for client
 */
exports.serveAnswerFile = function (context, fileName, questionData) {
    return new Promise(function (fulfill, reject) {
        try {
            getStaticFile.getStaticFile(context, folderName, fileName).then(function (data) {
                context.log(questionData);
                const dom = new JSDOM(data);
                dom.window.document.querySelector('#question-data').textContent = questionData;
                let respsonse = dom.window.document.documentElement.outerHTML;
                // context.log(respsonse);
                return respond.respondWithData(context, respsonse);
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
            respond.respondWithError(context).then(function () {
                fulfill();
            });
        }
    });
};
