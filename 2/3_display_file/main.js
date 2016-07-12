const {BrowserWindow} = require('electron');
const {app} = require('electron');

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
              // ファイルが選択されたらファイルのパスが引数に渡される
              const fs = require('fs');
              if (filePaths) {
                // ファイルの読み込み
                const md = fs.readFileSync(filePaths[0], 'utf-8');
                console.log(md);
              }
            });
          }
        }
      ]
    }
  ];

  const {Menu} = require('electron');
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
