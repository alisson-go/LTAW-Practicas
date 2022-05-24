//-- Cargar las dependencias
const socket = require('socket.io');
const http = require('http');
const express = require('express');
const colors = require('colors');

const PUERTO = 8080;
let cont = 0;
let msg_sended;
let message = ("Comandos soportados:<br>"+
              "--- <b>'/help'</b>: Mostrar los comandos de ayuda<br>"+
              "--- <b>'/list'</b>: Mostrar usuarios conectados<br>"+
              "--- <b>'/hello'</b>: El servidor te saluda<br>"+
              "--- <b>'/date'</b>: Mostrar fecha actual<br>"
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
}
//------------------- GESTION SOCKETS IO
//-- Evento: Nueva conexion recibida
io.on('connect', (socket) => {
  
  console.log('** NUEVA CONEXIÓN **'.yellow);
  cont = cont + 1;

  //-- Bienvenida
  socket.send("Bienvenido al Chat.AliG1.0")
  //-- Nuevo usuario
  io.send("Nuevo usuario ha entrado al chat")
  //-- Evento de desconexión
  socket.on('disconnect', function(){
    console.log('** CONEXIÓN TERMINADA **'.yellow);
    cont = cont - 1;
    despedida =  "Hasta luego!"
    io.send(despedida)
  });  

  //-- Mensaje recibido: Reenviarlo a todos los clientes conectados
  socket.on("message", (msg)=> {
    console.log("Mensaje Recibido!: " + msg.blue);
    console.log(msg)
    //-- Reenviarlo a todos los clientes conectados
    io.send(msg);
  });

});

//-- Lanzar el servidor HTTP
//-- ¡Que empiecen los juegos de los WebSockets!
server.listen(PUERTO);
console.log("Escuchando en puerto: " + PUERTO);