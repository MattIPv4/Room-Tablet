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
    mainWindow.loadFile(`${__dirname}/screen.html`);
};

const setDisplay = value => {
    brightness.set(value);
};

const blockSleep = () => {
    stayAwake.prevent();
};

const allowSleep = () => {
    stayAwake.allow();
};

const setStyle = style => {
    mainWindow.webContents.executeJavaScript(`applyBoxStyle(${style});`);
};

const setText = (large, small) => {
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

module.exports = {setDisplay, setStyle, setText};
