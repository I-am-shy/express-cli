const express = require('express');
const router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.status(200).json({ msg: 'Express is running' });
});


  // 1. req - HTTP 请求对象，包含了客户端发送的所有信息：
  // req.params - 路由参数
  // req.body - 请求体数据（需要 body-parser 中间件）
  // req.headers - 请求头
  // req.cookies - Cookie（需要 cookie-parser 中间件）
  // req.ip - 客户端 IP 地址
  // req.path - 请求路径
  // req.method - HTTP 方法（GET, POST 等）

  // 2. res - HTTP 响应对象，用于发送响应给客户端：
  // res.send() - 发送各种类型的响应
  // res.render() - 渲染视图模板
  // res.redirect() - 重定向请求
  // res.sendFile() - 发送文件
  // res.cookie() - 设置 Cookie
  // res.clearCookie() - 清除 Cookie
  // res.download() - 提示下载文件

  // 3. next - 中间件函数，用于将请求传递给下一个中间件或路由处理程序（即下一个 use），

  
module.exports = router;
