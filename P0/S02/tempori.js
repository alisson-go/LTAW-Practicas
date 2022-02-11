//-- Ejemplo de uso de un temporizador

//-- Función a ejecutar tras un tiempo
//-- Función de retrollamada del temporizador
function tarea1() {
    console.log("Tarea 1 completada!");
}


//-- Llamada retardada mediante temporizador
//-- Cuando transcurran 1000 ms se llama a la función tarea 1
setTimeout(tarea1, 1000); //ejecuta la func que le pases como para y solo se ejec una vez

//-- Esta estructura también es muy típica: incluir la función 
//-- de retrollamada directamente en el parémtro, en vez de definirla
//-- fuera
setTimeout( () => {
    console.log("Tarea 2 completada!");
}, 2000);

console.log("Esperando a que terminen las tareas");

//-- Esta función de retrollamada se invoca cada 200ms
//-- Se guarda su identificador en la variable id par
//-- poder quitar el temporizador con ClearInterval 
let id = setInterval( () => { //se ejecuta inf veces 
    console.log("Tic...");
}, 200 ); //cada 200 ms me ejecuta la func

//-- Al cabo de 3 segundos se desactiva el temporizador
setTimeout( ()=> {
  clearInterval(id) //parar el temp
  console.log("Stop!");
}, 3000);