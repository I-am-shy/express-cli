const express = require('express');

const router = express.Router();

// 存放客户端的数组
let clients = [];

// 模拟一个连续的耗时任务
function task(num){
  return new Promise((resolve,reject)=>{
    let timer = setTimeout(()=>{
      num += Math.floor(Math.random()*10);
      if(num >= 10){ 
        clearTimeout(timer);
        resolve("done")
      }
      resolve(num);
    },1000);
  })
}

// SSE端点
router.get('/', (req, res) => {
  // 设置响应头
  res.setHeader('Content-Type', 'text/event-stream');// 设置 sse 响应头
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive'); // 保持连接
  res.setHeader('Access-Control-Allow-Origin', '*');
  
  // 生成唯一客户端ID
  const clientId = Date.now();
  const newClient = {
    id: clientId,
    res: res
  };
  
  // 添加到客户端列表
  clients.push(newClient);
  console.log(`客户端 ${clientId} 已连接，当前连接数: ${clients.length}`);
  
  // 发送连接成功事件
  res.write(`event: connected\n`);
  res.write(`data: ${JSON.stringify({ message: '连接成功', clientId: clientId })}\n\n`);
  
  setInterval(async()=>{
    const result = await task(0);
    if(result === "done"){ // 如果任务完成，则结束连接
      res.end(`data: ${JSON.stringify({clientId: clientId, result: result })}\n\n`);
    }
    res.write(`data: ${JSON.stringify({clientId: clientId, result: result })}\n\n`);
  },1000)

  // 客户端断开连接时清理
  req.on('close', () => {
    console.log(`客户端 ${clientId} 已断开连接`);
    clients = clients.filter(client => client.id !== clientId);
  });
});

router.listen(9527, () => {
    console.log('Server is running on port 9527, http://localhost:9527');
});

module.exports = router;