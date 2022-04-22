const http = require('http');
const fs = require('fs');
const url = require('url');
const PUERTO = 7070;

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
    if (myURL.pathname == '/') {
        page += "tienda.html";
        
    }else{
        page += myURL.pathname.substr(1)
        

    }
    let selection = "";
    console.log('Fichero a devolver: ' + page);
    var findout = page.split(".");
    
    let type = findout[1];
    
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
