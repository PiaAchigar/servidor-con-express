const express = require("express");
const Contenedor = require("./app");

const app = express(); // hago una instancia del objeto
const PORT = 8080; // uso const para descentralizar
const cont = new Contenedor();

//donde está el http.createServer acá??
//tengo que usar "peticion.url" ?? donde?

const server = app.listen(PORT, () => {
  console.log(`Servidor http con Express puerto: ${PORT}`);
  //console.log(`Servidor http escuchando en el puerto ${server.address().port}`);
});
server.on("error", (error) => console.log(`Error en servidor ${error}`)); //agarra cualquier error que tire mi servidor
//evento de error

app.get("/productos", (req, res) => {
  (async () => {
    try {
      const arrayData = await cont.getAll();
      res.send(arrayData);
      //arrayData.forEach((e) => res.send(e));
    } catch (e) {
      console.log("Error en getAll", e);
    }
  })();
});

app.get("/productoRandom", (req, res) => {
  (async () => {
    try {
      const arrayData = await cont.getAll();
      //res.send(arrayData);
      let indexRandom = await getRandomArbitrary(0, arrayData.length);
      //res.send(arrayData[indexRandom]);
      let miProducto = Math.floor(indexRandom);
      //res.send(indexRandom);
      res.send(arrayData[miProducto]);
    } catch (e) {
      console.log("Error en getAll", e);
    }
  })();
});
function getRandomArbitrary(min, max) {
  return Math.random() * (max - min) + min;
}
