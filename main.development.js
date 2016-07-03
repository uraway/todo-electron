import { app, BrowserWindow, Menu, shell, Tray, dialog } from 'electron';
import path from 'path';
import AutoLaunch from 'auto-launch';
import GhReleases from 'electron-gh-releases';

let menu;
let template;
let tray = null;

const iconIdle = path.join(__dirname, 'images', 'tray-idle.png');

// Utilities
const isDevelopment = (process.env.NODE_ENV === 'development');
const isDarwin = (process.platform === 'darwin');
/*
const isLinux = (process.platform === 'linux');
const isWindows = (process.platform === 'win32');
*/

const autoStart = new AutoLaunch({
  name: 'Todo',
  path: process.execPath.match(/.*?\.app/)[0]
});

if (isDevelopment) {
  require('electron-debug')(); // eslint-disable-line global-require
}


app.on('window-all-closed', () => {
  if (isDarwin) app.quit();
});


const installExtensions = async () => {
  if (isDevelopment) {
    const installer = require('electron-devtools-installer'); // eslint-disable-line global-require
    const extensions = [
      'REACT_DEVELOPER_TOOLS',
      'REDUX_DEVTOOLS'
    ];
    for (const name of extensions) {
      try {
        await installer.default(installer[name]); // eslint-disable-line babel/no-await-in-loop
      } catch (e) {} // eslint-disable-line
    }
  }
};

app.on('ready', async () => {
  await installExtensions();

  tray = new Tray(iconIdle);

  function comfirmUpdate(updater) {
    dialog.showMessageBox({
      type: 'question',
      buttons: ['Update & Restart', 'Cancel'],
      title: 'Update available',
      cancelId: 99,
      message: 'There is an update available. Would you like to update and restart now?'
    }, (response) => {
      console.log(`Exit: ${response}`);
      app.dock.hide();
      if (response === 0) {
        updater.install();
      }
    });
  }

  function checkUpdate(showAlert) {
    const updateOptions = {
      repo: 'uraway/todo-electron',
      currentVersion: app.getVersion()
    };

    const updater = new GhReleases(updateOptions);

    updater.on('error', (event, message) => {
      console.log(`Event: ${JSON.stringify(event)}. Message: ${message}`);
    });

    updater.on('update-downloaded', () => {
      comfirmUpdate(updater);
    });

    updater.check((err, status) => {
      if (err || !status) {
        if (showAlert) {
          dialog.showMessageBox({
            type: 'info',
            buttons: ['Close'],
            title: 'No update available',
            message: 'You are currently running the latest version.'
          });
        }
        app.dock.hide();
      }
      if (!err && status) {
        updater.download();
      }
    });
  }

  function initMenu() {
    template = [{
      label: 'Electron',
      submenu: [{
        label: 'About ElectronReact',
        selector: 'orderFrontStandardAboutPanel:'
      }, {
        type: 'separator'
      }, {
        label: 'Services',
        submenu: []
      }, {
        type: 'separator'
      }, {
        label: 'Hide ElectronReact',
        accelerator: 'Command+H',
        selector: 'hide:'
      }, {
        label: 'Hide Others',
        accelerator: 'Command+Shift+H',
        selector: 'hideOtherApplications:'
      }, {
        label: 'Show All',
        selector: 'unhideAllApplications:'
      }]
    }, {
      label: 'Edit',
      submenu: [{
        label: 'Undo',
        accelerator: 'Command+Z',
        selector: 'undo:'
      }, {
        label: 'Redo',
        accelerator: 'Shift+Command+Z',
        selector: 'redo:'
      }, {
        type: 'separator'
      }, {
        label: 'Cut',
        accelerator: 'Command+X',
        selector: 'cut:'
      }, {
        label: 'Copy',
        accelerator: 'Command+C',
        selector: 'copy:'
      }, {
        label: 'Paste',
        accelerator: 'Command+V',
        selector: 'paste:'
      }, {
        label: 'Select All',
        accelerator: 'Command+A',
        selector: 'selectAll:'
      }]
    }, {
      label: 'View',
      submenu: (isDevelopment) ? [{
        label: 'Reload',
        accelerator: 'Command+R',
        click() {
          tray.window.webContents.reload();
        }
      }, {
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          tray.window.setFullScreen(!tray.window.isFullScreen());
        }
      }, {
        label: 'Toggle Developer Tools',
        accelerator: 'Alt+Command+I',
        click() {
          tray.window.toggleDevTools();
        }
      }] : [{
        label: 'Toggle Full Screen',
        accelerator: 'Ctrl+Command+F',
        click() {
          tray.window.setFullScreen(!tray.isFullScreen());
        }
      }]
    }, {
      label: 'Window',
      submenu: [{
        label: 'Minimize',
        accelerator: 'Command+M',
        selector: 'performMiniaturize:'
      }, {
        label: 'Close',
        accelerator: 'Command+W',
        selector: 'performClose:'
      }, {
        type: 'separator'
      }, {
        label: 'Bring All to Front',
        selector: 'arrangeInFront:'
      }]
    }, {
      label: 'Help',
      submenu: [{
        label: 'Learn More',
        click() {
          shell.openExternal('http://electron.atom.io');
        }
      }, {
        label: 'Documentation',
        click() {
          shell.openExternal('https://github.com/atom/electron/tree/master/docs#readme');
        }
      }, {
        label: 'Community Discussions',
        click() {
          shell.openExternal('https://discuss.atom.io/c/electron');
        }
      }, {
        label: 'Search Issues',
        click() {
          shell.openExternal('https://github.com/atom/electron/issues');
        }
      }]
    }];

    menu = Menu.buildFromTemplate(template);
    Menu.setApplicationMenu(menu);
  }

  function hideWindow() {
    if (!tray.window) return;
    tray.window.hide();
  }

  function initWindow() {
    const defaults = {
      width: 500,
      height: 728,
      show: false,
      frame: false
    };

    tray.window = new BrowserWindow(defaults);
    tray.window.loadURL(`file://${__dirname}/app/app.html`);
    tray.window.on('blur', hideWindow);

    initMenu();
    checkUpdate(false);
  }

  function showWindow() {
    tray.window.show();
  }

  initWindow();

  tray.on('click', (e) => {
    if (e.altKey || e.shiftKey || e.ctrlKey || e.metaKey) { return hideWindow(); }
    if (tray.window && tray.window.isVisible()) { return hideWindow(); }
    showWindow();
  });

  tray.window.on('closed', () => {
    hideWindow();
  });

  autoStart.enable();

  tray.setToolTip('Todo notifications');
});
