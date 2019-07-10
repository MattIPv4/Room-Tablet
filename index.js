const {app, BrowserWindow} = require('electron');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        fullscreen: true,
        alwaysOnTop: true,
    });
    mainWindow.loadFile('index.html');
};

app.on('ready', createWindow);
