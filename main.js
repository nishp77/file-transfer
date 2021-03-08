/**
 * This is the main process
 */

const {app, BrowserWindow, ipcMain} = require('electron');
const fs = require('fs');
const Hyperbeam = require('hyperbeam');
const os = require('os');
const archiver = require('archiver');


const archive = archiver('zip', {
    zlib: {level: 9} // Sets the compression level.
});
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
    makeArchive(file);
});

function makeArchive(files) {
    const output = fs.createWriteStream(os.tmpdir() + '/test.zip');

    // listen for all archive data to be written
    // 'close' event is fired only when a file descriptor is involved
    output.on('close', function () {
        console.log(archive.pointer() + ' total bytes');
        console.log('archiver has been finalized and the output file descriptor has closed.');
    });

    for (let i = 0; i < files.length; i++) {
        archive.append(fs.createReadStream(files[i].filePath), {name: files[i].fileName})
    }

    archive.pipe(output);
    archive.finalize().then(() => {
            fileExists(output.path);
        }
    );

}

function fileExists(filePath) {
    fs.access(filePath, fs.F_OK, err => {
        if (err) {
            console.error(err);
        } else {
            send(filePath);
        }
    });
}

function send(filePath) {
    console.log("**** Creating pipe *****");
    fs.createReadStream(filePath).pipe(beam).pipe(process.stdout);
}
