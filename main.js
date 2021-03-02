const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const Hyperbeam = require('hyperbeam');
const zip = require('cross-zip');

const beam = new Hyperbeam('some')

function createWindow() {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    win.loadFile('index.html')
}

app.whenReady().then(createWindow)

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
        createWindow()
    }
})

ipcMain.on('file:path', (event, filePath) => {

    console.log(filePath[0]);

    let readStream = fs.createReadStream(filePath[0]);

    new Promise((resolve, reject) => {
        zip.zip(filePath[0])
    })


});
