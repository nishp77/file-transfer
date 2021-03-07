/**
 * This is the main process
 */

const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const Hyperbeam = require('hyperbeam');
const zip = require('cross-zip');
const path = require('path');
const os = require('os');

const beam = new Hyperbeam('some')
let sourceStream = false;

function createWindow() {
    //Created browser window
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true
        }
    })

    //load the hmtl within the browser window (render)
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

/**
 * Listening for contents sent by the render process using IPC
 */
ipcMain.on('file:path', (event, file) => {

    sourceStream = path.join(os.tmpdir(), file[0].fileName + '.zip');

    new Promise((resolve, reject) => {
        zip.zip(file[0].filePath, sourceStream, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    });

    fs.access(sourceStream, fs.F_OK, err => {
        if (err) {
            console.error(err);
        } else {
            send(sourceStream);
        }
    });

    process.on('exit', () => {
        fs.unlinkSync(sourceStream);
    });

});

function send() {
    if (sourceStream) {
        console.log("**** Creating pipe *****");
        fs.createReadStream(sourceStream).pipe(beam).pipe(process.stdout);
    }
}
