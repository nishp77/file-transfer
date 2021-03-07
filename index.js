/**
 * This is a renderer process
 */

const electron = require('electron');
const {ipcRenderer} = electron;

window.onload = () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        //Safety measure as by default the listener is false
        event.preventDefault();

        //Selecting files
        const files = document.querySelector('input').files;
        let file = [];

        //Reading file name and path and storing it in temp array
        for (let i = 0; i < files.length; i++) {
            file[i] = new FileInfo(files[i].name, files[i].path);
        }
        // Using IPC to send to main process and read file contents using node modules.
        ipcRenderer.send('file:path', file);
    });
}
