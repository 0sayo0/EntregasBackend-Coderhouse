//3er desafio entregable
const express = require("express");
const ProductManager = require("./ProductManager.js");

const app = express();

const manager = new ProductManager("./src/Products.json");

//Añadir siempre la siguiente linea...
app.use(express.urlencoded({ extended: true })); //Configura Express para analizar cuerpos de solicitud en formato application/x-www-form-urlencoded. Permite objetos anidados.

//Ruta para obtener todos los productos
app.get("/products", async (req, res) => {
  try {
    let products = await manager.getProducts();
    if (req.query.limit) {
      let limit = parseInt(req.query.limit);
      if (!isNaN(limit)) {
        products = products.slice(0, limit);
      }
    }

    res.json({ products: products });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

app.get("/products/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await manager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
});

//Ruta para mostrar solo el producto con el id proporcionado

const env = async () => {
  const productos = await manager.getProducts();
  console.log("Productos actuales".toUpperCase(), productos);

  //Datos del nuevo producto a añadir
  const newProduct = {
    title: "Smartwatch",
    description:
      "Esta es una description de prueba para el producto 'Smartwatch'",
    price: 2000,
    thumbnail:
      "https://m.media-amazon.com/images/I/71ayOdl7MQL.__AC_SX300_SY300_QL70_ML2_.jpg",
    code: "0010",
    stock: 10,
  };
  await manager.addProduct(newProduct);

  // Datos del producto a actualizar
  const updatedProductData = {
    title: "",
    description: "",
    price: "",
    thumbnail: "",
    stock: "",
  };
  const updateResult = await manager.updateProduct(/*4, updatedProductData*/);
  console.log(updateResult);

  const productsFinalResult = await manager.getProducts();
  console.log("Productos Actualizados".toUpperCase(), productsFinalResult);

  const productId = await manager.getProductById();
  console.log(productId);

  const deletedProduct = await manager.deleteProduct();
  console.log(deletedProduct);
};

env();

app.listen(8080, () => console.log("Listening on port 8080"));
