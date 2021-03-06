const http = require('http');

//-- Definir el puerto a utilizar
const PUERTO = 8081;

//-- Función de retrollamada de petición recibida
function atender(req, res) {

    //-- Indicamos que se ha recibido una petición
    console.log("Petición recibida!");
    res.setHeader('Content-Type', 'text/plain');
    res.write("Soy el server\n");
    res.end();

}

//-- Crear el servidor. Se pasa como argumento la 
//-- función de retrollamada. La función createServer()
//-- la conecta con el evento 'request'
const server = http.createServer(atender);

//-- Activar el servidor: ¡Que empiece la fiesta!
server.listen(PUERTO);

console.log("Servidor activado. Escuchando en puerto: " + PUERTO);