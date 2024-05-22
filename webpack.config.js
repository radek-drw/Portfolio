const path = require("path");

module.exports = (env, argv) => {
  // const isProduction = argv.mode === "production";

  return {
    entry: "./src/js/index.js",
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
          },
        },
      ],
    },
    // mode: isProduction ? "production" : "development",
  };
};
