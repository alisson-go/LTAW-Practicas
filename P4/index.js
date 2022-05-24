const electron = require('electron');

console.log("Hola desde el proceso de la web...");

//-- Obtener elementos de la interfaz
const btn_test = document.getElementById("btn_test");
const display = document.getElementById("display");
const version_node = document.getElementById("info1");
const version_electron = document.getElementById("info2");
const version_chrome = document.getElementById("info3");
const architecture= document.getElementById("info4");
const plataforma= document.getElementById("info5");
const directorio= document.getElementById("info6");
const ip = document.getElementById("ip");
const usuarios = document.getElementById("usuarios");
const print = document.getElementById("print");



btn_test.onclick = () => {
    display.innerHTML += "TEST! ";
    console.log("Botón apretado!");

    //-- Enviar mensaje al proceso principal
    electron.ipcRenderer.invoke('test', "MENSAJE DE PRUEBA: Boton apretado");
}

//-- Mensaje recibido del proceso MAIN
electron.ipcRenderer.on('information', (event, message) => {
    console.log("Recibido: " + message);
    version_node.textContent = message[0];
    version_electron.textContent = message[1];
    version_chrome.textContent = message[2];
    architecture.textContent = message[3];
    plataforma.textContent = message[4];
    directorio.textContent = message[5];
    ip = message[6];
    puerto = message[7];
    url = ("http://"+ ip +":"+puerto+"/"+chat);
    chat = message [8];
    ip.textContent = url

});

electron.ipcRenderer.on('msg',(event,message)=>{
    console.log("Recibido: " + message);
    display.innerHTML += message + "<br>";
});
electron.ipcRenderer.on('usuarios',(event,message)=>{
    console.log("Recibido numero de usuarios: " + message);
    display.innerHTML += message + "<br>";
});