const express = require('express');
const webpack = require('webpack');
const webpackDevMiddleware = require('webpack-dev-middleware');
const webpackHotMiddleware = require('webpack-hot-middleware');
const path = require('path');
const proxyMiddleware = require('http-proxy-middleware');

const app = express();
const config = require('./webpack.config.js');
const compiler = webpack(config);

app.use(webpackDevMiddleware(compiler, {
  publicPath: config.output.publicPath,
  contentBase: 'src',
  stats: {
    colors: true,
    hash: false,
    timings: true,
    chunks: false,
    chunkModules: false,
    modules: false
  }
}));

Object.keys(config.devServer.proxy).forEach(function(context) {
  app.use(proxyMiddleware(context, config.devServer.proxy[context]));
});

app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
  res.sendFile(path.resolve('./dist/index.html'));
});

// Serve the files on port 3000.
app.listen(3000, function () {
  console.log('Example app listening on port 3000!\nOpen in your browser http://localhost:3000/');
});
