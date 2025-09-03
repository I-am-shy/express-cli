const express = require('express');
const router = express.Router();

// 存放请求的数组
let requestList = [];

// 模拟一个耗时任务
function task(num){
  // 每 3 秒计算一次
  return new Promise((resolve,reject)=>{
    setTimeout(()=>{
      resolve(num + Math.floor(Math.random()*10));
    },3000);
  })
}

// 对于一个请求来说，不使用 end 就不会主动断开连接
// 建立长轮询接口（不主动断开链接，不使用res.send响应）
router.get('/', (req, res) => {
  // 每次请求将请求存入数组，并重置30s等待
  const timeout = 30000;// 30s超时

  if(requestList.length >= 10){
    res.json({
      code: 0,
      message: '请求频繁，请稍后再试',
    })
    return;
  }
  requestList.push(res);

  const timer = setTimeout(() => {
    // 30s超时后（30s没有响应本次请求），将本次请求从数组中移除并响应超时消息
    requestList = requestList.filter(item => item !== res);

    res.json({
      code: 0,
      message: '连接超时，没有响应新数据',
    })
  }, timeout);

  // 监听客户端主动断开链接
  res.on("close",()=>{
    clearTimeout(timer);
    // 移除本次请求
    requestList = requestList.filter(item => item !== res);
  })

});

// 处理轮询的请求,真正处理请求的接口。此处触发了数据更新
router.post("/update",(req,res)=>{
  // 遍历数组，响应所有请求（也可以根据具体需求，指定响应某个请求），广播或者单播
  requestList.forEach(async item => {
    const result = await task(1);

    item.json({
      code: 1,
      message: '连接成功，数据已更新',
      data: result,
    })
  })

  res.json({
    code: 1,
    message: '数据更新',
  })
})

module.exports = router;