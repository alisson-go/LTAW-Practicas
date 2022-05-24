//-- Cargar el módulo de electron
const electron = require('electron');
const express = require('express');
const colors = require('colors');
const socket = require('socket.io');
const http = require('http');
const ip = require('ip');
const process = require('process');

const PUERTO = 8080;


console.log("Arrancando electron...");

//-- Variable para acceder a la ventana principal
//-- Se pone aquí para que sea global al módulo principal
let win = null;
let cont = 0;
let nick_Array = [];
let msg_sended;
let message = ("<b>Comandos soportados:</b><br>"+
              "====================================================<br>"+
              "--- <b>'/help'</b>: Mostrar los comandos de ayuda<br>"+
              "--- <b>'/list'</b>: Mostrar usuarios conectados<br>"+
              "--- <b>'/hello'</b>: El servidor te saluda<br>"+
              "--- <b>'/date'</b>: Mostrar fecha actual<br>"+
              "==================================================<br>"
)

const time = Date.now();
const date_time = new Date(time)

//-- Crear una nueva aplciacion web
const app = express();

//-- Crear un servidor, asosiaco a la App de express
const server = http.Server(app);

//-- Crear el servidor de websockets, asociado al servidor http
const io = socket(server);
//-------- PUNTOS DE ENTRADA DE LA APLICACION WEB
//-- Definir el punto de entrada principal de mi aplicación web
app.get('/', (req, res) => {
  res.send('Bienvenido a mi aplicación Web!!!' + '<p><a href="/chat-web.html">Test</a></p>');
});

//-- Esto es necesario para que el servidor le envíe al cliente la
//-- biblioteca socket.io para el cliente
app.use('/', express.static(__dirname +'/'));

//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));

function welcome_comand(msg){
  
  if(msg == '/help'){
    console.log('--- Comandos soportados');
    msg_sended  = message;

  }else if(msg == '/list'){
    console.log('--- Número de usuarios conectados');
    msg_sended  = "Numero de usuarios conectados" + cont ;

  }else if(msg == '/hello'){
  console.log('--- El servidor te saluda');
  msg_sended  = "HOLA! Bienvenido";

  }else if(msg == '/date'){
    console.log('--- Mostrar la fecha');
    msg_sended  = "Fecha: <b>"+ date_time.toISOString()+"</b>";
  
  }
  return(msg_sended)
}
//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);
  cont = cont + 1;
  win.webContents.send('usuarios', cont);
  //-- Bienvenida
  socket.send("Bienvenido al Chat.AliG 1.0")
  //-- Nuevo usuario
  io.send("Nuevo usuario ha entrado al chat")

  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.red);
    cont = cont - 1;
    win.webContents.send('usuarios', cont);
    despedida =  "Hasta luego!"
    socket.broadcast.emit('message', despedida);
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);
    if(msg.startsWith('/')){
      console.log("Mensaje Especial!: " + msg.blue);
      msg_sended = welcome_comand(msg);
      socket.send(msg_sended)

    }else{
      io.send(msg)
    }
    //-- Reenviarlo a todos los clientes conectados
  });
  socket.on('escribiendo', (msg)=>{
    // Si el usuario esta escribiendo un mensaje 
    if(datos.escribiendo == true){
       io.emit('display',"escribiendo");
    }
    else {
       io.emit('display', "escribiendo");
    }
 });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);
//-- Punto de entrada. En cuanto electron está listo,
//-- ejecuta esta función
electron.app.on('ready', () => {
    console.log("Evento Ready!");

    //-- Crear la ventana principal de nuestra aplicación
    win = new electron.BrowserWindow({
        width: 600,   //-- Anchura 
        height: 600,  //-- Altura

        //-- Permitir que la ventana tenga ACCESO AL SISTEMA
        webPreferences: {
          nodeIntegration: true,
          contextIsolation: false
        }
    });

  //-- En la parte superior se nos ha creado el menu
  //-- por defecto
  //-- Si lo queremos quitar, hay que añadir esta línea
  //win.setMenuBarVisibility(false)

  //-- Cargar contenido web en la ventana
  //-- La ventana es en realidad.... ¡un navegador!
  //win.loadURL('https://www.urjc.es/etsit');

  //-- Cargar interfaz gráfica en HTML
  win.loadFile("index.html");

  //-- Elementos
  version_node = process.versions.node;
  version_electron = process.versions.electron;
  version_chrome = process.versions.chrome;
  architecture = process.arch;
  plataforma = process.plataform;
  direct = process.cwd();
  ip_address = ip.address();
  chat = "chat-web.html";
  let information = [version_node, version_chrome, version_electron, architecture, plataform, direct, ip_address, PUERTO, chat];


  //-- Esperar a que la página se cargue y se muestre
  //-- y luego enviar el mensaje al proceso de renderizado para que 
  //-- lo saque por la interfaz gráfica
  win.on('ready-to-show', () => {
    win.webContents.send('information',  information);
  });

  //-- Enviar un mensaje al proceso de renderizado para que lo saque
  //-- por la interfaz gráfica
  win.webContents.send('print', "MENSAJE ENVIADO DESDE PROCESO MAIN");

});


//-- Esperar a recibir los mensajes de botón apretado (Test) del proceso de 
//-- renderizado. Al recibirlos se escribe una cadena en la consola
electron.ipcMain.handle('test', (event, msg) => {
  console.log("-> Mensaje: " + msg);
  io.send(msg)
});
