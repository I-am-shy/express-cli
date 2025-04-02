const express = require('express');
const router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  const type = req.query.type || "html" // 默认返回 html 类型
  if(type === 'json') // 根据query参数返回不同的数据
    res.status(200).json({ msg: 'users' });
  else if(type === 'html')
    res.status(200).send('<h1>users</h1>');
  else
    res.status(400).json({ msg: 'Bad query type' });
});

module.exports = router;
