const path = require('path');

module.exports = {
    entry: {
        question: [
            './source/popper.js',
            './source/bootstrap.js',
            './source/bootstrap.css',
            './source/clockpicker-bootstrap4.css',
            './source/clockpicker-bootstrap4.js',
            './source/styles.css',
            './source/main-question.js',
        ],
        answer: [
            './source/bootstrap.js',
            './source/bootstrap.css',
            './source/styles.css',
            './source/main-answer.js',
        ],
    },

    // mode: 'production',
    mode: 'production',
    output: {
        filename: '[name]-bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        }],
    },
};
