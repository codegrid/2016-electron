const electron = require('electron');
const {app} = require('electron');
var  {ipcMain} = require('electron');
const path = require('path');
const fs = require('fs');
const marked = require('marked');
const highlight = require('highlight.js');
const open = require('open');

app.on('ready', () => {
  const browserWindow = new electron.BrowserWindow();
  const filePath = path.join(__dirname, './browser.html');
  browserWindow.loadURL(`file://${filePath}`);

  browserWindow.webContents.on('did-finish-load', () => {
    const md = fs.readFileSync('./test.md', 'utf8');
    marked.setOptions({
      highlight: (code) => {
        return highlight.highlightAuto(code).value;
      }
    });
    const html = marked(md);
    browserWindow.webContents.send('openMarkdown', html);
  });


  browserWindow.webContents.on('did-get-redirect-request' , (e, url, newURL) => {
    open(newURL);
    e.preventDefault();
  });

  browserWindow.webContents.on('will-navigate', (e, url) => {
    open(url);
    e.preventDefault();
  });
});
