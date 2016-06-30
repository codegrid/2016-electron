const {ipcRenderer} = require('electron');

ipcRenderer.on('openMarkdown', (e, html) => {
  document.querySelector('#preview').innerHTML = sanitize(html);
});
