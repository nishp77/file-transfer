const electron = require('electron');
const {ipcRenderer} = electron;

window.onload = () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const files = document.querySelector('input').files;
        let filePath = [];
        for (let i = 0; i < files.length; i++)
        {
            filePath[i] = files[i].path;
        }
        ipcRenderer.send('file:path', filePath);
    });
}
