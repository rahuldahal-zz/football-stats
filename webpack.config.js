//check if current task is "dev" or "build"
const currentTask = process.env.npm_lifecycle_event;

const path = require("path");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebPackPlugin = require("html-webpack-plugin");
const fse = require("fs-extra");
const Dotenv = require("dotenv-webpack");

class RunAfterCompile {
  apply(compiler) {
    compiler.hooks.done.tap("Copy images", function () {
      fse.copySync("./src/assets/images", "./build/assets/images");
      fse.copySync(
        "./src/manifest.webmanifest",
        "./build/manifest.webmanifest"
      );
      fse.copySync("./src/serviceWorker.js", "./build/serviceWorker.js");
    });
  }
}

//cssLoaders

let cssConfig = {
  test: /\.(sa|sc|c)ss$/i,
  use: ["css-loader?url=false", "sass-loader"],
};

let babelConfig = {
  test: /\.js$/,
  exclude: /node_modules/,
  use: "babel-loader",
};

//common settings
let config = {
  entry: "./src/App.js",
  module: {
    rules: [babelConfig, cssConfig],
  },
  plugins: [],
  output: {
    publicPath: "/",
  },
};

//separate for "development"
if (currentTask === "dev") {
  cssConfig.use.unshift("style-loader");

  config.mode = "development";
  config.plugins.push(
    new Dotenv(),
    new HtmlWebPackPlugin({
      filename: "index.html",
      template: "./src/index.ejs",
      devServer: "http://localhost:5000",
    })
  );
  // config.watch = true;
  config.output = {
    ...config.output,
    filename: "main.js",
    path: path.resolve(__dirname, "src"),
  };
}

//separate for "production"
if (currentTask === "build") {
  cssConfig.use.unshift(MiniCssExtractPlugin.loader);
  config.mode = "production";
  config.output = {
    ...config.output,
    filename: "[name].js",
    chunkFilename: "[name].js",
    path: path.resolve(__dirname, "build"),
  };
  config.optimization = {
    splitChunks: { chunks: "all" },
  }; //separates vendors and custom scripts
  config.plugins.push(
    new HtmlWebPackPlugin({
      filename: "index.html",
      template: "./src/index.ejs",
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
    new RunAfterCompile()
  );
}

module.exports = config;
