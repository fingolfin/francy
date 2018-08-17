const path = require('path');
const del = require('del');
const webpack = require('webpack');
const fPackage = require('./package.json');
const description = `'${fPackage.name}, v${fPackage.version}, ${fPackage.description}, ${fPackage.author}.'`;
const defaultPlugins = [

];

module.exports = (env = {}) => {

  const isProduction = env.production === true;
  const clean = env.clean === true;
  
  console.log(`Running webpack for production environment? ${isProduction}`);
  
  if (clean) {
    console.log('Removing files from output directories...');
    del.sync(['./dist/*']);
  }

  let fileName = '[name].bundle.js';
  let sourceMap = 'source-map';
  
  if (isProduction) {
    fileName = '[name].bundle.min.js';
    sourceMap = undefined;
  }

  let amd = {
    mode: isProduction ? 'production' : 'development',
    entry: { 'francy-renderer-d3': './index.js'},
    output: {
      libraryTarget: 'amd',
      filename: fileName,
      path: path.join(__dirname, './dist/amd'),
    },
    optimization: {
      mergeDuplicateChunks: true
    },
    devtool: sourceMap,
    module: {
      rules: [ {
        loader: 'babel-loader'
      }]
    },
    plugins: defaultPlugins
  };
  
  let browser = JSON.parse(JSON.stringify(amd));
  browser.target = 'web';
  browser.output.libraryTarget = 'umd';
  browser.output.path = path.join(__dirname, './dist/browser');
  browser.plugins = defaultPlugins;
  
  return [ amd, browser ];
};
