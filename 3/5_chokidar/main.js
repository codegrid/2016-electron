const {BrowserWindow} = require('electron');
const {app} = require('electron');
const chokidar = require('chokidar');
var watcher;

app.on('ready', () => {
  const browserWindow = new BrowserWindow();
  browserWindow.loadURL(`file://${__dirname}/browser.html`);

  const menuTemplate = [
    {
      submenu: [
        {
          label: 'Quit',
          accelerator: 'Cmd+Q',
          click() {
            app.quit();
          }
        }
      ]
    }, {
      label: 'Edit',
      submenu: [
        {
          label: 'Copy',
          accelerator: 'CmdOrCtrl+C',
          role: 'copy'
        }, {
          label: 'Select All',
          accelerator: 'CmdOrCtrl+A',
          role: 'selectall'
        }
      ]
    }, {
      label: 'File',
      submenu: [
        {
          label: 'Open File',
          accelerator: 'CmdOrCtrl+O',
          click() {
            const {dialog} = require('electron');
            dialog.showOpenDialog({
              properties: ['openFile'],
              filters: [
                {name: 'markdown', extensions: ['md']}
              ]
            }, (filePaths) => {
              const fs = require('fs');
              const marked = require('marked');
              
              const sendMarkdown = function (filePath) {
                let md = fs.readFileSync(filePath, 'utf-8');
                browserWindow.webContents.send('sendMarkdown', marked(md));
              };

              if (filePaths) {
                // すでに監視しているファイルがある場合はそのファイルの監視を停止する
                if (watcher) {
                  watcher.close();
                }
                sendMarkdown(filePaths[0]);
                watcher = chokidar.watch(filePaths[0])
                  .on('change', sendMarkdown);
              }
            });
          }
        }
      ]
    },  {
      label: 'Debug',
      submenu: [
        {
          label: 'Toggle Developer Tools',
          accelerator: (function() {
            if (process.platform == 'darwin')
              return 'Alt+Command+I';
            else
              return 'Ctrl+Shift+I';
          })(),
          click(item, focusedWindow) {
            if (focusedWindow)
              focusedWindow.webContents.toggleDevTools();
          }
        }
      ]
    }
  ];

  const {Menu} = require('electron');
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
