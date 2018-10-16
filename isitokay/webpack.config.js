const path = require('path');

module.exports = {
    entry: './source/question.js',
    output: {
        filename: 'question.js',
        path: path.resolve(__dirname, 'dist'),
    },
};
