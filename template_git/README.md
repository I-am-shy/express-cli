# express js 

## 启动命令

```bash
npm run start
```

## 目录结构

```bash
.
├── app.js // 应用入口
├── bin // 启动脚本
├── package.json // 项目配置
├── public // 静态文件
├── routes // 路由
├── README.md // 项目说明
```

## 项目核心点

**app.js:**

设置 api 的请求路径（已经预设好了各类中间件），如：

```js
app.use('/api', require('./routes/api'));
```

**routes/api.js:**

设置 api 的路由，处理外部请求，如：

```js
app.get('/', (req, res) => {
  res.send('Hello World');
});
```

**bin/www:**

设置启动脚本，开启http服务，同时提供对服务的监听处理。

**public(非必须):**

对外暴露的静态资源文件，如：`html`、`css`、`js`、`image`、`video` 等。
