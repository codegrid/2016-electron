const electron = require('electron');
const marked = require('marked');
const ipc = require('electron').ipcMain;

electron.app.on('ready', () => {
  const browserWindow = new electron.BrowserWindow();

  ipc.on('did-finish-load-webview', (e) => {
//  browserWindow.webContents.on('did-finish-load', (e) => {
//  browserWindow.webContents.on('ready-to-show', (e) => {
    const md = `
# hoge

* hoge
* fuga

[href](http://qiita.com)
    
\`\`\`javascript 
var hoge = 'hogehoge';
console.log(hoge);
\`\`\`
`;
    const html = marked(md);
    e.sender.send('updatePreview', html);
  });
  browserWindow.loadURL(`file://${__dirname}/browser.html`);
});
