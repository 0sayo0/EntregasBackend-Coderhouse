//2do desafio entregable

const ProductManager = require("./managers/ProductManager.js");

const manager = new ProductManager("./files/Products.json");

const env = async () => {
  const productos = await manager.getProducts();
  console.log("Productos actuales".toUpperCase(), productos);

  //Datos del nuevo producto a añadir
  const product = {
    title: "Smartphone",
    description:
      "Esta es una description de prueba para el producto 'Smartphone'",
    price: 8000,
    thumbnail:
      "https://m.media-amazon.com/images/I/71ayOdl7MQL.__AC_SX300_SY300_QL70_ML2_.jpg",
    code: "0004",
    stock: 15,
  };

  await manager.addProduct(product);

  const productsFinalResult = await manager.getProducts();
  console.log("Productos Actualizados".toUpperCase(), productsFinalResult);

  const productId = await manager.getProductById(2);
  console.log(productId);
};

env();
