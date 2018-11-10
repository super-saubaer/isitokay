let Promise = require('promise');
let azure = require('azure-storage');
const tableName = 'weirdQuestionData';
const partitionKey = 'weirdQuestionData';

/**
 * Function that stores client Data on Table Storage
 * @param {*} context - Azure Function Context
 * @param {string} rowKey - RowKey, will be generated question Hash
 * @param {JSON} clientDataString - client Data as string
 * @return {Promise} - Promise
 */
exports.storeDataOnTable = function (context, rowKey, clientDataString) {
    return new Promise(function (fulfill, reject) {
        try {
            context.log('trying to store Data on rowKey: ' + rowKey);

            // Connecting to Table Service -> Connection String is in AppSettings as 'AZURE_STORAGE_CONNECTION_STRING'
            let tableService = azure.createTableService();

            tableService.createTableIfNotExists(tableName, function (error, result, response) {
                if (!error) {
                    // Table exists or created

                    // Creating Table Entity
                    let weirdQuestionEntity = {
                        PartitionKey: {
                            '_': partitionKey,
                        },
                        RowKey: {
                            '_': rowKey,
                        },
                        data: {
                            '_': clientDataString,
                        },
                    };

                    // Inserting Table Entity
                    tableService.insertEntity(tableName, weirdQuestionEntity, function (error, result, response) {
                        if (!error) {
                            fulfill();
                        } else {
                            reject(error);
                        }
                    });
                } else {
                    reject(error);
                }
            });
        } catch (exception) {
            context.log(exception);
            reject(exception);
        }
    });
};

/**
 * Function that stores client Data on Table Storage
 * @param {*} context - Azure Function Context
 * @param {string} rowKey - RowKey, will be generated question Hash
 * @return {Promise} - Promise
 */
exports.getDataFromTable = function (context, rowKey) {
    return new Promise(function (fulfill, reject) {
        try {
            context.log('trying to get Data from rowKey: ' + rowKey);

            // Connecting to Table Service -> Connection String is in AppSettings as 'AZURE_STORAGE_CONNECTION_STRING'
            let tableService = azure.createTableService();

            tableService.retrieveEntity(tableName, partitionKey, rowKey, function (error, result, response) {
                if (!error) {
                    fulfill(result.data);
                } else {
                    context.log(error);
                }
            });
        } catch (exception) {
            context.log(exception);
            reject(exception);
        }
    });
};
