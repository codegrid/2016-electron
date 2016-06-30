const {ipcRenderer} = require('electron');

ipcRenderer.on('updatePreview', (e, html) => {
  document.querySelector('#preview').innerHTML = html;
});
