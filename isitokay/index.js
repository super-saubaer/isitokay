/**
 * WEIRDQUESTION.IO
 * Part of Code ist inspired by: https://mystaticsite.azurewebsites.net/
 */

let generate = require('./server/generate.js');
let answer = require('./server/answer.js');
let serverStaticFile = require('./server/serveStaticFile.js');


module.exports = function (context, req) {
    // Deciding which query to serve

    // ?generate
    if (req.query.generate) {
        context.log('Trying to serve Generate Request');
        generate.generateAnswerLink(context, req.body).then(function() {
            endFunction(context);
        });
    } else if (req.query.question) { // ?question
        context.log('Trying to serve answer');
        file = 'answer.html';
        serverStaticFile.serveStaticFile(context, file).then(function() {
            endFunction(context);
        });
    } else if (req.query.file) { // ?file
        context.log('Trying to serve File');
        file = req.query.file;
        serverStaticFile.serveStaticFile(context, file).then(function() {
            endFunction(context);
        });
    } else { // Comming in at root
        context.log('Trying to serve Question');
        serverStaticFile.serveStaticFile(context, 'question.html').then(function() {
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
