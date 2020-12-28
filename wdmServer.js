// webpack-dev-middleware setup(bundle in memory)

const app = require("express")();
const webpack = require("webpack");
const webpackConfigFile = require("./webpack.config");
const webpackDevMiddleware = require("webpack-dev-middleware");
const compiler = webpack(webpackConfigFile);

app.use(
  webpackDevMiddleware(compiler, {
    publicPath: webpackConfigFile.output.publicPath,
    writeToDisk: (filePath) => {
      return /\.html$/.test(filePath);
    },
  })
);

app.listen(5000, () => console.log("server is running"));
