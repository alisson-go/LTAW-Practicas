const http = require('http');
const fs = require('fs');
const url = require('url');
var rute = "";

//-- Definir el puerto a utilizar
const PUERTO = 9000;

//-- HTML página de error
const ERROR = fs.readFileSync('html/error.html', 'utf-8');

//-- Imprimir informacion sobre el mensaje de solicitud
function (req) {
  console.log("");
  console.log("Mensaje de solicitud");
  console.log("====================");
  console.log("Método: " + req.method);
  console.log("Recurso: " + req.url);
  console.log("Version: " + req.httpVersion)
}
