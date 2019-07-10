const {app, BrowserWindow} = require('electron');
const brightness = require('brightness');

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

const setStyleAndText = (style, large, small) => {
    displayOn();
    mainWindow.webContents.executeJavaScript(`applyBoxStyle(${style});`);
    mainWindow.webContents.executeJavaScript(`setText("${large}", "${small || ""}");`);
};

app.on('ready', createWindow);
