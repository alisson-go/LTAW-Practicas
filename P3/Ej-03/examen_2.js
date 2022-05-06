const express = require('express');
const app = express();
const PORT = 8080;

app.get('/xxx', (req, res)=> {
    res.send('holi');
});

app.get('/test', (req, res)=> {
    console.log("Prueba")
});
console.log("saaa")
app.listen(PORT)