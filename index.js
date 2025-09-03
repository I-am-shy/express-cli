#!/usr/bin/env node

import answer from './input.js'
import fs from 'node:fs'
import path from 'node:path'

// console.log(process.argv.slice(2)) // 获取命令行携带的参数
// console.log(answer) // 用户输入的结果
// console.log(process.cwd()) // 当前工作目录
// console.log(import.meta.dirname) // 程序所在的目录

if(!answer.project_name && !answer.project_name){
  console.error('缺少必要参数')
  process.exit()
}

// 区分 import.meta.dirname 程序所在的目录 和 process.cwd() 程序执行的目录

const templatePath = path.join(import.meta.dirname, 'template') 
const resultPath = path.join(process.cwd(), answer.project_name)

// 如果目录存在，则退出
if(fs.existsSync(resultPath)){
  console.error('当前目录已存在')
  process.exit(1)
}

// 创建项目
fs.cp(templatePath, resultPath, {recursive: true},(err)=>{
  if(err){
    console.error(err)
    process.exit(1)
  }
  console.log('\n\n项目创建成功！')
  console.log(`cd ${answer.project_name}`)
  console.log('npm install')
  console.log('npm run start')
  process.exit(0)
})

