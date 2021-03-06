const http = require('http');
const fs = require('fs');
const url = require('url');
const PUERTO = 7070;

let carrito="";
const fich_json = "tienda.json";

const HOME = fs.readFileSync('tienda.html','utf-8');
const LOGIN = fs.readFileSync('form.html','utf-8');
const LOGIN_OK = fs.readFileSync('form_extra.html','utf-8');
const SALAS = fs.readFileSync('salas.html','utf-8');
const EQUIPOS = fs.readFileSync('instrumentos.html','utf-8');
const ARTS = fs.readFileSync('articulos.html','utf-8');


const tienda_json = fs.readFileSync(fich_json);
const shop = JSON.parse(tienda_json);
let user;
let list_product = [];
//-- navegamos por los productos
shop.productos.forEach((element) => {
    list_product.push(element.nombre);
})

function get_user(req) {

    //-- Leer la Cookie recibida
    const cookie = req.headers.cookie;
    let cookie_buy = " ";
    let producto;

    //-- Hay cookie
    if (cookie) {
      
      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
      //-- Recorrer todos los pares nombre-valor
      pares.forEach((element, index) => {
  
        //-- Obtener los nombres y valores por separado
        let [nombre, valor] = element.split('=');
  
        //-- Leer el usuario
        //-- Solo si el nombre es 'user'
        if (nombre.trim() === 'user') {
          user = valor;
        }else if (nombre.trim()=='carrito'){
            cookie_buy = element;
            producto = valor.split(':')
            producto.pop();
        }
      });
  
      //-- Si la variable user no está asignada
      //-- se devuelve null
      return user || null;
    }
}
function get_prodcuts(req) {

    //-- Leer la Cookie recibida
    const cookie = req.headers.cookie;
  
    //-- Hay cookie
    if (cookie) {
      
      //-- Obtener un array con todos los pares nombre-valor
      let pares = cookie.split(";");
  
      //-- Recorrer todos los pares nombre-valor
      pares.forEach((element, index) => {
  
        //-- Obtener los nombres y valores por separado
        let [nombre, valor] = element.split('=');
  
        //-- Leer el usuario
        //-- Solo si el nombre es 'user'
        if (nombre.trim() === 'prodcutos') {
          //valor.split(":").forEach((element) => {
              //get_prodcuts.push(element);
          //});
          list_product = valor;

        }
      });
  
      //-- Si la variable user no está asignada
      //-- se devuelve null
      return list_product || null;
    }
  }
  

const server = http.createServer((req, res)=>{
    console.log("Petición recibida!");
    //-- Valores de la respuesta por defecto
    //-- Analizar el recurso
    //-- Construir el objeto url con la url de la solicitud
    let myURL = url.parse(req.url, true);
    
    console.log("recurso recibido" + myURL.pathname);
    let page = "";
    
     //-- Cualquier recurso que no sea la página principal
    //-- genera un error
    let content = LOGIN_OK.replace("HTML_EXTRA","");
    let user = get_user(req);
    console.log("User: " + user);
    if (myURL.pathname == '/') {
        page += "tienda.html";
        if (user) {

            //-- Añadir a la página el nombre del usuario
            console.log("user: " + user);
            content = LOGIN_OK.replace("HTML_EXTRA", "<h2>Usuario: " + user + "</h2>");
        } else {
            //-- Mostrar el enlace a la página de login
            content = LOGIN.replace("HTML_EXTRA", `
            <a href="login">[Login]</a>
            `);
        }
    }else{
        page += myURL.pathname.substr(1)
        console.log('ES EL NOMBREEE' + page);

    }
    let selection = "";
    console.log('Fichero a devolver: ' + page);
    var findout = page.split(".");
    console.log('FIND OUT: ' + findout);
    let type = findout[1];
    console.log("tipoooo " + type);
    if (type == "jpg"){
        selection = "image/jpg";
    }else if  (type == "html") {
        selection = "text/html";
    }else if(type == "css") {
        selection = "text/css";
    }else if (type == "jpeg"){
        selection = "image/jpeg";
    }else if (type == "png"){
        selection = "image/png";
    }else if (type == "ico"){
        selection = "image/ico";
    }else if (type == "gif"){
        selection = "image/gif";
    }else if (type == "mp3"){
        selection = "audio/mpeg";
    }else{
        selection = "text/html";
    }
    console.log("LA SELECCION ES  " + selection);
 
    fs.readFile(page, (err, data) => {

        if (err) {  //-- Ha ocurrido algun error
        console.log("Error!!");
        console.log(err.message);
        } 
        else {  //-- Lectura normal
            console.log("Lectura completada...");
            console.log("Contenido del fichero: \n");
            res.writeHead(200, {'Content-Type': selection});
            console.log("200 OK");
            
        }
        res.write(data);
        res.end();
        
        
    });

    

});
server.listen(PUERTO);

console.log("Escuchando en puerto: " + PUERTO);
