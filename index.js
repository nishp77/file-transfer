const electron = require('electron');
const {ipcRenderer} = electron;

window.onload = () => {

    document.querySelector('form').addEventListener('submit', (event) => {
        event.preventDefault();
        const files = document.querySelector('input').files;
        for (let i = 0; i < files.length; i++)
        {
            const file = files[i];
            console.log(file.path);
            ipcRenderer.send('file:path', file.path);
        }
    });
}
