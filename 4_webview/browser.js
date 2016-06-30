const {ipcRenderer} = require('electron');

const webview = document.querySelector('webview');

ipcRenderer.on('updatePreview', (e, html) => {
  webview.send('updatePreview', html);
});

webview.addEventListener('did-finish-load', (e) => {
  ipcRenderer.send('did-finish-load-webview');
});
