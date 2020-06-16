'use strict'
/**开发环境*/

//webpack-merge用于实现合并 类似于ES6的Object.assign()
const merge = require('webpack-merge')
const prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
