const path = require('path');

module.exports = {
    entry: ['./source/popper.js', './source/bootstrap.js', './source/question.js', './source/styles.css'],
    // mode: 'production',
    mode: 'development',
    output: {
        filename: 'weirdquestion.bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [{
            test: /\.css$/,
            use: ['style-loader', 'css-loader', 'postcss-loader'],
        }],
    },
};
