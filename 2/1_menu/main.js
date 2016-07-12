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
    }
  ];

  const {Menu} = require('electron');
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);
});
