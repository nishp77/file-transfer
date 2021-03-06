const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const Hyperbeam = require('hyperbeam');
const zip = require('cross-zip');
const path = require('path');
const os = require('os');

const beam = new Hyperbeam('some')
let sourceStream = false;

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

ipcMain.on('file:path', (event, file) => {

    for(let x in file)
    {

    }


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

    console.log(sourceStream);
    send(sourceStream);

    process.on('exit', () => {
        fs.unlinkSync(sourceStream);
    })

});

function send() {
    if (sourceStream) {
        fs.createReadStream(sourceStream).pipe(beam).pipe(process.stdout);
    }
}
