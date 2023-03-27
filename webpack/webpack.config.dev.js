const { merge } = require('webpack-merge');
const common = require('./webpack.config.common');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const ImageMinimizerPlugin = require("image-minimizer-webpack-plugin");
module.exports = merge(common, {
  mode: 'development',
  devtool:'source-map',
  devServer: {
    port: 4000,
    static: {
      directory: path.resolve(__dirname, '../dist')
    },
    devMiddleware: {
      index: 'index.html',
      writeToDisk: true
    },
    client: {
      overlay: true
    }
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        exclude: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.css$/,
        include: /\.module\.css$/,
        use: [MiniCssExtractPlugin.loader, {
          loader: 'css-loader',
          options: {
            modules: {
              localIdentName: '[hash:base64]'
            }
          }
        }]
      },
      {
        test: /\.scss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
      },
      {
        test: /\.(png|svg|jpg)$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 10 * 1024,
          }
        },
        generator: {
          filename: './images/[name][ext]'
        },
        // use: [
        //   {
        //     loader: 'image-webpack-loader',
        //     options: {
        //       mozjpeg: {
        //         quality: 40
        //       },
        //       pngquant: {
        //         quality: [0.65, 0.90],
        //         speed: 4
        //       }
        //     }
        //   }
        // ]
      },
    ]
  },
  optimization: {
    // [...]
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
      new ImageMinimizerPlugin({
        minimizer: {
          implementation: ImageMinimizerPlugin.imageminMinify,
          options: {
            plugins: [
              ['imagemin-mozjpeg', { quality: 40 }],
              ['imagemin-pngquant', { quality: [0.65, 0.90] }],
            ]
          }
        },
        generator: [
          {
            type: 'asset',
            preset: 'webp-custom-name',
            implementation: ImageMinimizerPlugin.imageminGenerate,
            options: {
              plugins: ['imagemin-webp']
            }
          }
        ]
      })
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'css/styles.css'
    })
  ]
})