const electron = require('electron');
const {ipcRenderer} = electron;


window.onload = () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const files = document.querySelector('input').files;
        let file = [];
        for (let i = 0; i < files.length; i++)
        {
            file[i] = new FileInfo(files[i].name,files[i].path);
        }
        ipcRenderer.send('file:path', file);
    });
}
