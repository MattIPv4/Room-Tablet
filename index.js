const {app, BrowserWindow} = require('electron');

const createWindow = () => {
    const mainWindow = new BrowserWindow({
        fullscreen: true,
        alwaysOnTop: true,
    });
};

app.on('ready', createWindow);
