'use strict'
//用于检测node和npm的版本，实现版本依赖



const chalk = require('chalk')
//检查版本
const semver = require('semver')
const packageConfig = require('../package.json')
//shelljs 模块重新包装了 child_process，调用系统命令更加方便
const shell = require('shelljs')

//返回通过child_process模块的新建子进程，执行 Unix 系统命令后转成没有空格的字符串
function exec (cmd) {
  return require('child_process').execSync(cmd).toString().trim()
}

const versionRequirements = [
  {
    name: 'node',
	//使用semver格式化版本
    currentVersion: semver.clean(process.version),
	//获取package.json中设置的node版本
    versionRequirement: packageConfig.engines.node
  }
]

if (shell.which('npm')) {
  versionRequirements.push({
    name: 'npm',
	// 自动调用npm --version命令，并且把参数返回给exec函数，从而获取纯净的版本号
    currentVersion: exec('npm --version'),
    versionRequirement: packageConfig.engines.npm
  })
}

module.exports = function () {
  const warnings = []

  for (let i = 0; i < versionRequirements.length; i++) {
    const mod = versionRequirements[i]
//若版本号不符合package.json文件中指定的版本号，就报错
    if (!semver.satisfies(mod.currentVersion, mod.versionRequirement)) {
      warnings.push(mod.name + ': ' +
        chalk.red(mod.currentVersion) + ' should be ' +
        chalk.green(mod.versionRequirement)
      )
    }
  }

  if (warnings.length) {
    console.log('')
    console.log(chalk.yellow('To use this template, you must update following to modules:'))
    console.log()

    for (let i = 0; i < warnings.length; i++) {
      const warning = warnings[i]
      console.log('  ' + warning)
    }

    console.log()
    process.exit(1)
  }
}
