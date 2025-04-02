import { input, select, confirm, checkbox, search, rawlist, editor, number, password, expand } from '@inquirer/prompts';

const answer = {}

try {
  const inputAnswer = await input({ 
    message: '请输入项目名称',
    default: 'my-project'
  });

  Object.assign(answer, { project_name: inputAnswer })

  const selectAnswer = await select({
    message: '请选择语言类型',
    choices: ['Javascript','Typescript' ],
    default: 'Javascript'
  });

  Object.assign(answer, { project_type: selectAnswer })

  const confirmAnswer = await confirm({
    message: '是否启用git进行版本管理',
    default: true,
  });

  Object.assign(answer, { isGit: confirmAnswer })

} catch (error) { // 捕获异常,防止退出时出现promise失败的异常
  console.log("退出")
}

export default answer