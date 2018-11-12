let Promise = require('promise');
let mime = require('mime-types');

/**
 * Function that returns data to client
 * @param {*} context Azure Function Context
 * @param {string} data - data that will be responded to client
 * @return {Promise} Promise
 */
exports.respondWithData = function (context, data) {
    return new Promise(function (fulfill, reject) {
        let contentType = mime.lookup(data);

        context.res = {
            status: 200,
            body: data,
            isRaw: true,
            headers: {
                'Content-Type': contentType,
            },
        };
        context.log('Happily served! :)');
        fulfill();
    });
};

/**
 * Function that returns Error to client
 * @param {*} context Azure Function Context
 * @return {Promise} Promise
 */
exports.respondWithError = function (context) {
    return new Promise(function (fulfill, reject) {
        let errorResponse = 'Sorry, something went wrong on our side... :/';
        let contentType = mime.lookup(errorResponse);
        context.res = {
            status: 404,
            body: errorResponse,
            isRaw: true,
            headers: {
                'Content-Type': contentType,
            },
        };
        context.log('Badly served! :(');
        fulfill();
    });
};

/**
 * Function that returns keep alive data to trigger function
 * @param {*} context Azure Function Context
 * @return {Promise} Promise
 */
exports.respondWithKeepAlive = function (context) {
    return new Promise(function (fulfill, reject) {
        let keepAliveResponse = 'Dancing all night long!';
        let contentType = mime.lookup(keepAliveResponse);
        context.res = {
            status: 200,
            body: keepAliveResponse,
            isRaw: true,
            headers: {
                'Content-Type': contentType,
            },
        };
        context.log('Keep Alively served! :)');
        fulfill();
    });
};
