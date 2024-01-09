//4to desafio entregable
const express = require("express");
const handlebars = require("express-handlebars");
const ProductManager = require("./managers/ProductManager.js");
const CartManager = require("./managers/CartManager.js");
const productsRouter = require("./routes/products.router.js");
const cartsRouter = require("./routes/carts.router.js");
const viewsRouter = require("./routes/views.router.js");
const { Server } = require("socket.io");
const path = require("path");

const app = express();
app.use(express.static(__dirname + "/public"));

// CONFIGURAMOS NUESTRO MOTOR DE PLANTILLAS HANDLEBARS
// Motor de plantillas a usar
app.engine("handlebars", handlebars.engine());
app.set("views", __dirname + "/views"); //Especificamos donde almacenamos nuestras vistas
app.set("view engine", "handlebars");
// Las tres lineas anteriores aplican para cualquier motor de plantillas

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

//Ruta para las vistas
app.use("/", viewsRouter);
//Definimos los middlewares para los conjuntos de rutas que ocuparan cada manager
app.use("/api/products", productsRouter);
app.use("/api/carts", cartsRouter);

const server = app.listen(8080, () => console.log("Listening on port 8080"));

const io = new Server(server);

app.set("socketio", io);

io.on("connection", (socket) => {
  console.log("Nuevo cliente conectado");

  socket.on("addProduct", async (data) => {
    console.log(data);
    try {
      await manager.addProduct(data);
      io.emit("showProducts", await manager.getProducts());
    } catch (error) {
      console.error(error);
    }
  });

  socket.on("removeproduct", async (data) => {
    try {
      const id = Number(data);
      await manager.deleteProduct(id);
      io.emit("showProducts", await manager.getProducts());
    } catch (error) {
      console.error(error);
    }
  });
});
