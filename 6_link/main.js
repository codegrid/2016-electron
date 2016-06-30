const electron = require('electron');
const {app} = require('electron');
const {ipcMain} = require('electron');
const marked = require('marked');
const fs = require('fs');

app.on('ready', () => {
  const browserWindow = new electron.BrowserWindow();

  ipcMain.once('did-finish-load-webview', (event) => {
    const md = fs.readFileSync(`${__dirname}/test.md`, 'utf-8');
    const html = marked(md);
    event.sender.send('updatePreview', html);
  });

  browserWindow.loadURL(`file://${__dirname}/browser.html`);
});
