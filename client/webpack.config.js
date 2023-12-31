const HtmlWebpackPlugin = require('html-webpack-plugin');
const WebpackPwaManifest = require('webpack-pwa-manifest');
const path = require('path');
const { InjectManifest } = require('workbox-webpack-plugin');

module.exports = () => {
  return {
    mode: 'development',
    entry: {
      main: './src/js/index.js',
      install: './src/js/install.js',
    },
    output: {
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
      // HtmlWebpackPlugin for generating HTML files
      new HtmlWebpackPlugin({
        template: './index.html',
        chunks: ['main'],
      }),
      // WebpackPwaManifest for generating the manifest file
      new WebpackPwaManifest({
        name: 'Text-Editor App',
        short_name: 'Text App',
        description: 'My Progressive Text-Editor App',
        background_color: '#ffffff',
        theme_color: '#000000',
        icons: [
          {
            src: path.resolve('favicon.ico'),
            sizes: [96, 128, 192, 256, 384, 512],
          },
        ],
      }),
      // InjectManifest for generating the service worker
      new InjectManifest({
        swSrc: './src-sw.js',
        swDest: 'service-worker.js',
      }),
    ],

    module: {
      rules: [{
        test: /\.css$/,
          use: ['style-loader', 'css-loader'],
    }],
    },
  };
};
