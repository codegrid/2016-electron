const {ipcRenderer} = require('electron');
const {shell} = require('electron');

const webview = document.querySelector('webview');
webview.preload = `file://${__dirname}/webview.js`;
webview.src = `file://${__dirname}/webview.html`;

ipcRenderer.on('updatePreview', (e, html) => {
  document.querySelector('#preview').innerHTML = html;
//  webview.send('updatePreview', html);
});

webview.addEventListener('did-finish-load', (e) => {
  ipcRenderer.send('did-finish-load-webview');

  // webview内での別ページへの遷移を止める
  webview.addEventListener('did-start-loading', (e) => {
    webview.stop();
  });
});

// リンクがクリックされたらデフォルトブラウザで開く
webview.addEventListener('will-navigate', (e) => {
  shell.openExternal(e.url);
});

// target="_blank" なリンクがクリックされたらデフォルトブラウザで開く
webview.addEventListener('new-window', (e) => {
  shell.openExternal(e.url);
});
