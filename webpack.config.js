const path = require('path')
const webpack = require('webpack')
const htmlWebpackPlugin = require('html-webpack-plugin')
const miniCssExtractPlugin = require('mini-css-extract-plugin')
const cssMiniMizerWebpackPlugin = require('css-minimizer-webpack-plugin')
module.exports = {
  // mode: 'production',
  mode: 'development',
  entry: './src/main.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.js',
    clean: true, // 清除dist文件夹
    // 将模块名称添加到资源文件名称中 contenthash 动态生成的文件名 ext生成文件的拓展名
    assetModuleFilename: 'image/[contenthash][ext]',
  },
  devServer: {
    contentBase: './dist',
    hot: true,
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
      {
        test: /\.txt$/,
        type: 'asset',
        parser: {
          dataUrlCondition: {
            maxSize: 4 * 1024, // 大于4kb的文件使用base64编码
          },
        },
      }, // 通用资源类型，在导出一个data-url和发送一个单独的文件之间自动选择
    ],
  },
  devtool: 'inline-source-map', // 可以让打包出来的文件更利于查看

  devServer: {
    static: './dist',
    hot: true,
  },
  optimization: {
    minimizer: [
      new cssMiniMizerWebpackPlugin() // 压缩css这里必须要mode改成production
  ]
}
}
