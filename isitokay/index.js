/**
 * WEIRDQUESTION.IO
 * Part of Code is inspired by: https://mystaticsite.azurewebsites.net/
 */

let generate = require('./server/generate.js');
let answer = require('./server/answer.js');
let serverStaticFile = require('./server/serveFile.js');
let respond = require('./server/respond.js');

module.exports = function (context, req) {
    // if (context.bindingData.question) {
    //     context.log(hallo);

    // }

    // ?generate
    if (req.query.generate) {
        context.log('Trying to serve Generate Request');
        context.log(req.query.generate);
        context.log(req);
        generate.generateAnswerLink(context, req.query.generate).then(function () {
            endFunction(context);
        });
    } else if (req.query.question) { // /questionId
        context.log('Trying to serve answer');
        context.log(req.query.question);
        answer.generateAnswerPage(context, req.query.question).then(function () {
            endFunction(context);
        });
    } else if (req.query.file) { // ?file
        context.log('Trying to serve File');
        file = req.query.file;
        serverStaticFile.serveStaticFile(context, file).then(function () {
            endFunction(context);
        });
    } else if (req.query.keepalive) { // ?file
        // context.log('Trying to keep alive');
        respond.respondWithKeepAlive(context).then(function () {
            endFunction(context);
        });
    } else if (req.query.favicon) {
        respond.respondWithError(context).then(function () {
            endFunction(context);
        });
    } else { // Comming in at root
        context.log('Trying to serve Question');
        serverStaticFile.serveStaticFile(context, 'question.html').then(function () {
            endFunction(context);
        });
    }
};

/**
 * Function that ends Azure Function
 * @param {*} context - Azure Function Context
 */
function endFunction(context) {
    // context.log('Ending Function');
    context.done();
}
