const express = require('express');
const {Contenedor} = require('./contenedor');
const PORT = 8080;

const app = express();
const server = app.listen(8080, () => console.log(" escuchando en puerto 8080..."))
server.on('error', error => console.log(`Error en el servidor: ${error}`));

app.get('/', (req, res) => {
  res.send('<h1 style="color:red;"> Desafío 3 </h1>')
})

app.get('/productos', async (req, res) => {
    try {
      const c = new Contenedor('productos.txt', ['title', 'price', 'thumbnail'], 'id');
      const allProducts = await c.getAll();
      res.json(allProducts);
    } catch (err) {
      console.log(err);
      res.status(500).send("Algo se murio");
    }
});

app.get('/productoRandom', async (req, res) => {
  try {
    const c = new Contenedor('productos.txt', ['title', 'price', 'thumbnail'], 'id');
    const allProducts = await c.getAll();

    if (allProducts.length === 0) {
      res.send("No quedan productos");
    } else {
      const allIds = allProducts.map(item => item.id);
      const index = Math.floor(Math.random() * allIds.length); 
      const oneProduct = await c.getById(allIds[index]);

      // Version simplificada sin getById
      // const index = Math.floor(Math.random() * allProducts.length);
      // const oneProduct = allProducts[index];

      res.json(oneProduct);
    }
  } catch (err) {
    console.log(err);
    res.status(500).send("Algo se murio");
  }
});