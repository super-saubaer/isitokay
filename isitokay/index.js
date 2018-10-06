/**
 * WEIRDQUESTION.IO
 * Part of Code ist inspired by: https://mystaticsite.azurewebsites.net/
 */

let generate = require('./server/generating.js');
let answer = require('./server/answer.js');
let serverStaticFile = require('./server/serveStaticFile.js');


module.exports = function (context, req) {
    // Deciding which query to answer first

    // ?generate
    if (req.query.generate) {
        // context.log('GENERATING');
        // context.res = {
        //     status: 200,
        //     body: 'https//weirdquestion.io/asdhjskdhjs',
        // };
        // context.log(req.body);
        // // context.res = {
        // //     status: 200,
        // //     body: "https//weirdquestion.io/asdhjskdhjs",
        // //     isRaw: true,
        // //     headers: {
        // //         'Content-Type': text,
        // //     },
        // // };
        // // context.done();
    } else if (req.query.answer) { // ?answer
        // file = 'answer.html';
    } else if (req.query.file) { // ?file
        context.log('Trying to serve File');
        file = req.query.file;
        serverStaticFile.serveStaticFile(context, file).then(function() {
            endingFunction(context);
        });
    } else { // Comming in at root
        context.log('Trying to serve Question');
        serverStaticFile.serveStaticFile(context, 'question.html').then(function() {
            endingFunction(context);
        });
    }
};

/**
 * Function that ends Azure Function
 * @param {*} context - Azure Function Context
 */
function endingFunction(context) {
    context.log('Ending Function');
    context.done();
}
