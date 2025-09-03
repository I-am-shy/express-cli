
const computeButton = document.getElementById('btn');
const result = document.getElementById('result');

// 长轮询检测是否有数据更新
function longPolling(){
  fetch('/long-polling',{
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res =>{
      if(res.ok){
        return res.json();
      }
      throw new Error('请求失败');
    })
    .then(data => {
      console.log(data);
      longPolling();
    })
    .catch(err => {
      // 请求失败
      console.log(err.message);
      setTimeout(() => {
        longPolling();
      }, 3000);
    })
}

// 获取流式数据
function sse(){
  fetch('/sse',{
    method: 'GET',
    headers: {
      'Content-Type': 'text/event-stream',
    },
  })
    .then(res =>{
      if(res.ok){
        const reader = res.body.getReader();
        return reader.read();
      }
      throw new Error('请求失败');
    })
    .then(data => {
      if(data.done){
        return;
      }
      const {value} = data;
      result.innerHTML += value;

    })
    .catch(err => {
      // 请求失败
      console.log(err.message);
    })
}

longPolling();

setInterval(() => {
  // 5 秒更新一次数据
  fetch('/long-polling/update',{
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if(res.ok){
        return res.json();
      }
      throw new Error('请求失败');
    })
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err.message);
    })
}, 5000);

computeButton.addEventListener('click', () => {
  sse();
});