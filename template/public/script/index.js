
const computeButton = document.getElementById('btn');
const result = document.getElementById('result');

// 长轮询检测是否有数据更新
function longPolling() {
  fetch('/long-polling', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.ok) {
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
async function sse() {
  const res = await fetch('/sse', {
    method: 'GET',
    headers: {
      'Content-Type': 'text/event-stream',
    },
  })
  if (!res.ok) {
    console.log('请求失败');
    return;
  }

  const decode = new TextDecoder('utf-8');
  const reader = res.body.getReader();
  while (true) {
    const { value, done } = await reader.read();
    if (done) {
      break;
    }
    const data = decode.decode(value,{stream: true});
    result.innerHTML +=`<p>${data}</p>`;
  }
}

longPolling();

setInterval(() => {
  // 5 秒更新一次数据
  fetch('/long-polling/update', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  })
    .then(res => {
      if (res.ok) {
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