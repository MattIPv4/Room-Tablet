const {app, BrowserWindow} = require('electron');
const brightness = require('brightness');
const stayAwake = require('stay-awake');

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        fullscreen: true,
        alwaysOnTop: true,
        backgroundColor: "#000"
    });
    mainWindow.loadFile('index.html');

    displayOff();
    setTimeout(() => {
        setStyleAndText(2, "Hello!");
    }, 5000);
};

const displayOn = () => {
    brightness.set(1);
};

const displayOff = () => {
    brightness.set(0);
};

const blockSleep = () => {
    stayAwake.prevent();
};

const allowSleep = () => {
    stayAwake.allow();
};

const setStyleAndText = (style, large, small) => {
    displayOn();
    mainWindow.webContents.executeJavaScript(`applyBoxStyle(${style});`);
    mainWindow.webContents.executeJavaScript(`setText("${large}", "${small || ""}");`);
};

app.on('ready', () => {
    blockSleep();
    createWindow();
});

app.on('before-quit', () => {
    displayOn();
    allowSleep();
});
