'use strict'
/**
开发环境中的入口
*/

const utils = require('./utils')
const webpack = require('webpack')
const config = require('../config')
const merge = require('webpack-merge')
const path = require('path')
const baseWebpackConfig = require('./webpack.base.conf')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
//webpack的提示错误和日志信息的插件
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin')
// 查看空闲端口位置，默认情况下搜索8000这个端口
const portfinder = require('portfinder')

const HOST = process.env.HOST
const PORT = process.env.PORT && Number(process.env.PORT)

const devWebpackConfig = merge(baseWebpackConfig, {
  module: {
    rules: utils.styleLoaders({ sourceMap: config.dev.cssSourceMap, usePostCSS: true })
  },
  // cheap-module-eval-source-map is faster for development
  devtool: config.dev.devtool, //调试模式

  // these devServer options should be customized in /config/index.js
  devServer: {
    clientLogLevel: 'warning',
	//使用 HTML5 History API 时， 404 响应替代为 index.html
    historyApiFallback: {
      rewrites: [
        { from: /.*/, to: path.posix.join(config.dev.assetsPublicPath, 'index.html') },
      ],
    },
    hot: true, //热重载
    contentBase: false,  // 提供静态文件访问
    compress: true,//压缩
    host: HOST || config.dev.host,
    port: PORT || config.dev.port,
    open: config.dev.autoOpenBrowser,//npm run dev 时自动打开浏览器
    overlay: config.dev.errorOverlay
      ? { warnings: false, errors: true }
      : false, // 显示warning 和 error 信息
    publicPath: config.dev.assetsPublicPath,
    proxy: config.dev.proxyTable, //api代理
    quiet: true, // necessary for FriendlyErrorsPlugin  //控制台打印警告和错误(用FriendlyErrorsPlugin 为 true)
    watchOptions: {// 检测文件改动
      poll: config.dev.poll,
    }
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': require('../config/dev.env')
    }),
	//模块热替换插件，修改模块时不需要刷新页面
    new webpack.HotModuleReplacementPlugin(),
	// HMR shows correct file names in console on update.
	//webpack编译错误的时候，中断打包进程，防止错误代码打包到文件中
    new webpack.NamedModulesPlugin(), // HMR shows correct file names in console on update.
    new webpack.NoEmitOnErrorsPlugin(),
    // https://github.com/ampedandwired/html-webpack-plugin
    // 将打包编译好的代码插入index.html
	new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.html',
      inject: true
    }),
    // copy custom static assets
	// 提取static assets 中css 复制到dist/static文件
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, '../static'),
        to: config.dev.assetsSubDirectory,
        ignore: ['.*']//忽略.*的文件
      }
    ])
  ]
})

module.exports = new Promise((resolve, reject) => {
  portfinder.basePort = process.env.PORT || config.dev.port
  portfinder.getPort((err, port) => {//查找端口号
    if (err) {
      reject(err)
    } else {
      // publish the new Port, necessary for e2e tests
	  //端口被占用时就重新设置evn和devServer的端口
      process.env.PORT = port
      // add port to devServer config
      devWebpackConfig.devServer.port = port

     // npm run dev成功的友情提示
      devWebpackConfig.plugins.push(new FriendlyErrorsPlugin({
        compilationSuccessInfo: {
          messages: [`Your application is running here: http://${devWebpackConfig.devServer.host}:${port}`],
        },
        onErrors: config.dev.notifyOnErrors
        ? utils.createNotifierCallback()
        : undefined
      }))

      resolve(devWebpackConfig)
    }
  })
})
