//4to desafio entregable
const express = require("express");
const ProductManager = require("./managers/ProductManager.js");
const CartManager = require("./managers/CartManager.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const path = require("path");

const app = express();
app.use("/static-files", express.static(`${__dirname}/public`)); //??? Verificar si esta linea es correcta

//Path absoluto para ProductManager e inicializacion de instancia
const productsFilePath = path.join(__dirname, "./files/Products.json");
const manager = new ProductManager(productsFilePath);

//Path absoluto para CartManager e inicializacion de instancia
const cartsFilePath = path.join(__dirname, "./files/Carts.json");
const cartManager = new CartManager(cartsFilePath);

//Midleware para adjuntar una instancia de los managers a cada solicitud entrante
app.use((req, res, next) => {
  req.manager = manager;
  next();
});

app.use((req, res, next) => {
  req.cartManager = cartManager;
  next();
});

//Añadir siempre las siguientes lineas...
app.use(express.json());
app.use(
  express.urlencoded({ extended: true })
); /* Esto es para poder recibir diferentes tipos de datos, para no recibir
solo cadenas de texto, si no tambien objetos, objetos dentro de objetos o incluso arreglos de objetos. */

//Definimos los middlewares para los conjuntos de rutas que ocuparan cada manager
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const env = async () => {
  const productos = await manager.getProducts();
  console.log("Productos actuales".toUpperCase(), productos);

  //Datos del nuevo producto a añadir
  const newProduct = {
    title: "Smartwatch",
    description:
      "Esta es una description de prueba para el producto 'Smartwatch'",
    price: 2000,
    thumbnails:
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
    thumbnails: "",
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
