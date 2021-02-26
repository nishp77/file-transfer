const electron = require('electron');
const {ipcRenderer} = electron;

window.onload = () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const {path} = document.querySelector('input').files[0];
        ipcRenderer.send('file:path', path);
    });
}
