'use strict'
// Template version: 1.3.1
// see http://vuejs-templates.github.io/webpack for documentation.

const path = require('path')

module.exports = {
	// ===================开发环境配置
  dev: {

    // Paths
	//静态资源文件夹(一般存放css、js、image等文件)
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',//根目录
    proxyTable: {},//配置API代理，可利用该属性解决跨域的问题

    // Various Dev Server settings
    host: 'localhost',  // 可以被 process.env.HOST 覆盖
    port: 8080,  // 可以被 process.env.PORT 覆盖
    autoOpenBrowser: false,//编译后自动打开浏览器页面 http://localhost:3030/("port + host",默认"false"),设置路由重定向自动打开您的默认页面
    errorOverlay: true,    //浏览器错误提示
    notifyOnErrors: true,   //跨平台错误提示
    poll: false, //webpack提供的使用文件系统(file system)获取文件改动的通知   https://webpack.js.org/configuration/dev-server/#devserver-watchoptions-

    // Use Eslint Loader?
    // If true, your code will be linted during bundling and
    // linting errors and warnings will be shown in the console.
    useEslint: true,
    // If true, eslint errors and warnings will also be shown in the error overlay
    // in the browser.
    showEslintErrorsInOverlay: false,

    /**
     * Source Maps
     */

    // https://webpack.js.org/configuration/devtool/#development
    devtool: 'cheap-module-eval-source-map',//webpack提供的用来调试的模式，有多个不同值代表不同的调试模式

    // If you have problems debugging vue-files in devtools,
    // set this to false - it *may* help
    // https://vue-loader.vuejs.org/en/options.html#cachebusting
    cacheBusting: true,// 配合devtool的配置，当给文件名插入新的hash导致清除缓存时是否生成source-map

    cssSourceMap: true//记录代码压缩前的位置信息,当产生错误时直接定位到未压缩前的位置,方便调试
  },
  
  
  // ========================生产环境配置

  build: {
    //编译后"首页面"生成的绝对路径和名字
    index: path.resolve(__dirname, '../dist/index.html'),

    //打包编译的根路径(默认dist，存放打包压缩后的代码)
    assetsRoot: path.resolve(__dirname, '../dist'),
	//静态资源文件夹(一般存放css、js、image等文件)
    assetsSubDirectory: 'static',
	//发布的根目录(dist文件夹所在路径)
    assetsPublicPath: '/',

    /**
     * Source Maps
     */
    //是否开启source-map
    productionSourceMap: true,
    // https://webpack.js.org/configuration/devtool/#production
    devtool: '#source-map',

    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
	//是否压缩  
    productionGzip: false,
    //unit的gzip命令用来压缩文件（gzip模式下需要压缩的文件的扩展名有js和css）
    productionGzipExtensions: ['js', 'css'],

    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
     //是否开启打包后的分析报告
	bundleAnalyzerReport: process.env.npm_config_report
  }
}
