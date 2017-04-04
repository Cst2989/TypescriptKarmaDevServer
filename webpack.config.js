var path = require("path");

module.exports = {
    entry: {
        app: ["./src/standard-deviation"]
    },
    output: {
        path: path.resolve(__dirname, "build"),
        publicPath: "/dist/",
        filename: "bundle.js"
    },
    module: {
    rules: [{
      test: /\.ts(x?)$/,
      exclude: /node_modules/,
      use: [
        {
          loader: 'ts-loader'
        }
      ]
    }]
  },
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
};
