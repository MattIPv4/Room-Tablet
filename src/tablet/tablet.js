const {app, BrowserWindow} = require('electron');
const brightness = require('brightness');

let mainWindow;
const createWindow = () => {
    mainWindow = new BrowserWindow({
        frame: false,
        fullscreen: true,
        alwaysOnTop: true,
        backgroundColor: "#000"
    });
    mainWindow.loadFile(`${__dirname}/screen.html`);
};

const setDisplay = value => {
    brightness.set(value);
};

const setStyle = style => {
    mainWindow.webContents.executeJavaScript(`applyBoxStyle(${style});`);
};

const setText = (large, small) => {
    mainWindow.webContents.executeJavaScript(`setText("${large}", "${small || ""}");`);
};

const setDataText = (text) => {
    mainWindow.webContents.executeJavaScript(`setDataText("${text}");`);
};

const quit = () => {
    app.quit();
};

app.on('ready', () => {
    createWindow();
});

app.on('before-quit', () => {
    setDisplay(1);
});

module.exports = {app, setDisplay, setStyle, setText, setDataText, quit};
