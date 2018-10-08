let Promise = require('promise');
let fs = require('fs');

/**
 * Function that returns Static File as Promise
 * @param {*} context - Azure Function Context
 * @param {string} folderName - name of folder
 * @param {string} fileName - name of file
 * @return {Promise} - Static Question Page for client
 */
exports.getStaticFile = function (context, folderName, fileName) {
    return new Promise(function (fulfill, reject) {
        try {
            // Clearing fileName
            fileName = fileName.replace(/\//g, '\\');
            // Constructing FilePath
            let filePath = __dirname + '\\' + folderName + '\\' + fileName;
            filePath = filePath.replace('\\server', '');
            // Getting File
            fs.readFile(filePath, function (err, data) {
                context.log('GET ' + filePath);
                if (!err) {
                    fulfill(data);
                } else {
                    reject(err);
                }
            });
        } catch (exception) {
            reject(exception);
        }
    });
};
