const path = require('path');

module.exports = {
    entry: './src/fjcanvas.js',
    output: {
      filename: 'bundle.js',
      path: path.resolve(__dirname, 'dist')
    }
  };