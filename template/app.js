const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const longPollingRouter = require('./routes/long-polling');
const sseRouter = require('./routes/sse');

const app = express();

// 预处理中间件
app.use(logger('dev'));// 开发环境下的日志记录
app.use(express.json());// 解析json请求体
app.use(cors());// 跨域处理
app.use(express.urlencoded({ extended: false }));// 解析url编码请求体
app.use(cookieParser());// 解析cookie
app.use("/public",express.static(path.join(__dirname, 'public'),{
  maxAge: 1000 * 60 * 60 * 24 * 30, // 30天,为 http 缓存提供 max-age（以毫秒为单位），默认为 0。这也可以是 ms 模块接受的字符串。
  setHeaders: (res, path) => { //在响应上设置自定义标头的函数
    if (path.endsWith('.html')) {
      res.setHeader('Cache-Control', 'no-cache');
    }
  },
  index: "index.html", // 设置默认文件,默认为 index.html
}));// 静态文件服务,


// 路由 ，按照路由定义的顺序（挂载顺序）进行匹配，即 “先到先得”
app.use('/', indexRouter); 
app.use('/users', usersRouter);
app.use('/long-polling', longPollingRouter);
app.use('/sse', sseRouter);

module.exports = app;
