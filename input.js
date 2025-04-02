import { input, select, confirm, checkbox, search, rawlist, editor, number, password, expand } from '@inquirer/prompts';

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
  if(prompt.project_name){
    const inputAnswer = await input(prompt.project_name);
    Object.assign(answer, {project_name:inputAnswer})
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