const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMiniMizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const terserPlugin = require('terser-webpack-plugin')
module.exports = (env, argv) => {
  console.log(env, argv);
  return {
    // mode: 'production',
    mode: env.production ? 'production' : 'development',
    entry: {
      index: './src/main.js',
      // another: './src/another.js',
      // index: {
      //   import: './src/main.js',
      //   dependOn: 'shared'
      // },
      // another: {
      //   import: './src/another.js',
      //   dependOn: 'shared'
      // },
      // shared: 'lodash' // 共享模块
    },
    output: {
      path: path.resolve(__dirname, 'dist'),
      // filename: 'js/[name].bundle.js',
      filename: 'js/[name].[contenthash].js', // 文件名会随着内中的内容变化
      clean: true, // 清除dist文件夹
      // 将模块名称添加到资源文件名称中 contenthash 动态生成的文件名 ext生成文件的拓展名
      assetModuleFilename: 'image/[contenthash][ext]',
      publicPath: 'http://localhost:8080/',
    },
    devServer: {
      contentBase: './dist',
      compress: true,
      hot: true,
      // port: 3000,
      // headers: {
      //   'X-Access-Token': 'test'
      // }
    },
    plugins: [
      // 自动生成html入口文件和进入js文件的插件
      new htmlWebpackPlugin({
        template: './index.html', // 模板文件
        filename: 'app.html', // 输出文件
        inject: 'body', // 注入到body标签中
      }),
      new miniCssExtractPlugin({
        filename: 'style/[name].css',
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(css|s[ac]ss)$/,
          // use: ['style-loader', 'css-loader', 'sass-loader'],
          use: [miniCssExtractPlugin.loader, 'css-loader', 'sass-loader'],
        }, // style-loader 将css插入到head标签中
        {
          test: /\.png$/,
          type: 'asset/resource',
          // generator的优先级大于assetModuleFilename
          generator: {
            filename: 'img/[name][ext]',
          },
        },
        { test: /\.svg$/, type: 'asset/inline' }, // 内联
        { test: /\.txt$/, type: 'asset/source' }, // 源文件
        { test: /\.(woff|woff2|eot|ttf|otf)$/i, type: 'asset/resource' }, // 源文件
        {
          test: /\.txt$/,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 4 * 1024, // 大于4kb的文件使用base64编码
            },
          },
        }, // 通用资源类型，在导出一个data-url和发送一个单独的文件之间自动选择
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env'],
              plugins: [['@babel/plugin-transform-runtime']],
            },
          },
        },
      ],
    },
    devtool: 'inline-source-map', // 可以让打包出来的文件更利于查看

    devServer: {
      static: './dist',
      hot: true,
    },
    optimization: {
      minimizer: [
        new cssMiniMizerWebpackPlugin(), // 压缩css这里必须要mode改成production
        new terserPlugin()
      ],
      splitChunks: {
        // chunks: 'all'
        cacheGroups: {
          // 将第三方模块打包到一个单独的文件里面 作为一个缓存组进行缓存
          vendor: {
            test: /[\\/]node_modules[\\/]/,
            name: 'vendors',
            chunks: 'all',
          },
        },
      },
    },
    performance: {
      hints: false 
    }
  }
}
