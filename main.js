const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const Hyperbeam = require('hyperbeam')

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

ipcMain.on('file:path', (event, path) => {

    console.log(path);
    // fs.readFile(path, (error, data) => {
    //     if (error) {
    //         console.log(error)
    //         return;
    //     }
    //     console.log(data.toString())
    // });

    // let readStream = fs.createReadStream(path);
    // readStream.pipe(beam).pipe(process.stdout);
});
