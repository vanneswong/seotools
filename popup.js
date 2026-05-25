document.getElementById('queryBtn').addEventListener('click', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  if (tab.url) {
    try {
      const url = new URL(tab.url);
      const domain = url.hostname;

      // 显示当前域名
      document.getElementById('domain').textContent = '当前域名: ' + domain;

      // 同时跳转到站长工具和爱站网查询页面
      const seoUrl = 'https://seo.chinaz.com/' + domain;
      const aizhanUrl = 'https://www.aizhan.com/cha/' + domain + '/';
      chrome.tabs.create({ url: seoUrl });
      chrome.tabs.create({ url: aizhanUrl });
    } catch (e) {
      document.getElementById('domain').textContent = '无法解析当前页面URL';
    }
  } else {
    document.getElementById('domain').textContent = '无法获取当前页面URL';
  }
});

// 页面加载时显示当前域名
window.addEventListener('DOMContentLoaded', async () => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (tab.url) {
    try {
      const url = new URL(tab.url);
      document.getElementById('domain').textContent = '当前域名: ' + url.hostname;
    } catch (e) {
      // 忽略解析错误
    }
  }
});