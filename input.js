import { input, select, confirm, checkbox, search, rawlist, editor, number, password, expand } from '@inquirer/prompts';

// 获取命令行携带的参数
const args = process.argv.slice(2)
const project_name = args[0]

const answer = {}
const prompt = {
  project_name: {
    message: '请输入项目名称',
    default: 'my-project'
  },
  // project_type: {
  //   message: '请选择语言类型',
  //   choices: ['Javascript','Typescript' ],
  //   default: 'Javascript'
  // },
  isGit: {
    message: '是否启用git进行版本管理',
    default: true
  }
}

try {
  if(prompt.project_name && project_name !== ""){ // 有项目名称问题和执行命令没有携带项目名称是
    const inputAnswer = await input(prompt.project_name);
    Object.assign(answer, {project_name:inputAnswer.trim()})
  }else{
    Object.assign(answer, {project_name:project_name.trim()})
  }

  if(prompt.project_type){
    const selectAnswer = await select(prompt.project_type);
    Object.assign(answer, {project_type:selectAnswer})
  }

  if(prompt.isGit){
    const confirmAnswer = await confirm(prompt.isGit);
    Object.assign(answer, {isGit:confirmAnswer})
  }

} catch (error) { // 捕获异常,防止退出时出现promise失败的异常
  console.warn("退出")
}

export default answer