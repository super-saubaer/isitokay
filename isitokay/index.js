/**
 * WEIRDQUESTION.IO
 * Part of Code is inspired by: https://mystaticsite.azurewebsites.net/
 */

let generate = require('./server/generate.js');
let answer = require('./server/answer.js');
let serverStaticFile = require('./server/serveFile.js');
let respond = require('./server/respond.js');

module.exports = function (context, req) {
    // ?generate
    if (req.query.generate) {
        context.log('Trying to serve Generate Request');
        generate.generateAnswerLink(context, decodeURI(req.query.generate)).then(function () {
            endFunction(context);
        });
    } else if (req.query.question) { // ?question
        context.log('Trying to serve answer');
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
        context.log('Trying to keep alive');
        respond.respondWithKeepAlive(context).then(function () {
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
    context.log('Ending Function');
    context.done();
}
