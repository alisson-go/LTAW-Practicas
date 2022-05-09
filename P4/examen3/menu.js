const boton = document.getElementById("boton_test");
boton.onclick=() => {
    const m = new XMLHttpRequest();
    m.onreadystatechange = () => {
        if(m.readyState==4){
            if(m.status == 200){
                let datos = JSON.parse(m.responseText)
                console.log(datos);
            }
        }
    }
    m.open("GET", "/names" ,true);
    m.send();
}