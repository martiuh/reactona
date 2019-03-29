const path = require('path');
const webpack = require('webpack');
const slash = require('slash');
const WriteFilePlugin = require('write-file-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const webpackMerge = require('webpack-merge');
const ExtractCssChunks = require('extract-css-chunks-webpack-plugin');
const { InjectManifest } = require('workbox-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const { StatsWriterPlugin } = require('webpack-stats-plugin');

const siteConfig = require('./site-config');
const base = require('./webpack.base');
const mode = process.env.NODE_ENV || 'development';
const isDev = mode === 'development';
let devEntry = [];

if (isDev) {
  devEntry = [
    'webpack/hot/only-dev-server',
    'webpack-hot-middleware/client?__webpack_hmr&reload=true&overlay=true'
  ];
}
const webpackConfig = {
  mode,
  devtool: isDev ? 'eval' : 'source-map',
  name: 'client',
  target: 'web',
  context: __dirname,
  entry: [...devEntry, slash(path.join(__dirname, 'src'))],
  output: {
    path: siteConfig.output.path,
    publicPath: siteConfig.output.publicPath,
    filename: `[name]${isDev ? '' : '.[hash]'}.js`
  },
  module: {
    rules: [
      {
        test: /\.(css|scss|sass)$/,
        use: [
          {
            loader: ExtractCssChunks.loader,
            options: {
              hot: true,
              modules: true,
              reloadAll: true
            }
          },
          {
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[name]__[local]--[hash:base64:5]'
            }
          },
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new HtmlPlugin({
      template: `!!raw-loader!${path.join(
        __dirname,
        'server-renderer/template.ejs'
      )}`,
      filename: 'render.ejs',
      chunks: []
    }),
    new WriteFilePlugin(),
    new ExtractCssChunks({
      filename: `[name]${isDev ? '' : '.[hash]'}.css`,
      chunkFilename: '[id].css'
    }),
    new StatsWriterPlugin({
      fields: [
        'assetsByChunkName',
        'namedChunkGroups',
        'chunks',
        'modules',
        'publicPath'
      ]
    }),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      IS_SERVER: JSON.stringify(false),
      'process.env': {
        NODE_ENV: JSON.stringify(mode || 'development')
      }
    })
  ]
};

if (isDev) {
  webpackConfig.performance = {
    hints: false
  };
} else {
  webpackConfig.plugins.push(
    new InjectManifest({
      swDest: 'unstatic/service-worker.js', // It helps me get the worker in / instead of /static directory
      swSrc: path.join(__dirname, 'src', 'service-worker.js'),
      include: [
        /vendor.*/,
        /bootstrap.*/,
        /main.*/,
        /Home.*/,
        /App.*/,
        /logo\.*/,
        /Offline.*/,
        /\**\/*.ico/
      ]
    })
  );

  webpackConfig.optimization = {
    runtimeChunk: {
      name: 'bootstrap'
    },
    splitChunks: {
      chunks: 'initial',
      cacheGroups: {
        vendors: {
          chunks: 'all',
          test: /[\\/]node_modules[\\/]/,
          name: 'vendor'
        }
      }
    },
    minimizer: [
      new TerserPlugin({
        terserOptions: {
          output: {
            comments: false,
            ascii_only: true
          },
          compress: {
            comparisons: false
          }
        }
      })
    ]
  };
}

module.exports = webpackMerge.smart(base, webpackConfig);
