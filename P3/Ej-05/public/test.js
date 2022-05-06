//-- El directorio publico contiene ficheros estáticos
app.use(express.static('public'));
const boton = document.getElementById("boton");
const body = document.getElementsByTagName('body')[0];

boton.onclick = () => {
    if (body.style.backgroundColor=="green") {
        body.style.backgroundColor="lightblue";
    } else {
        body.style.backgroundColor="green";
    }
}