//3er desafio entregable

const ProductManager = require("./ProductManager.js");

const manager = new ProductManager("./Products.json");

const env = async () => {
  const productos = await manager.getProducts();
  console.log("Productos actuales".toUpperCase(), productos);

  //Datos del nuevo producto a añadir
  const newProduct = {
    title: "Smartphone",
    description:
      "Esta es una description de prueba para el producto 'Smartphone'",
    price: 8000,
    thumbnail:
      "https://m.media-amazon.com/images/I/71ayOdl7MQL.__AC_SX300_SY300_QL70_ML2_.jpg",
    code: "0004",
    stock: 15,
  };
  await manager.addProduct(newProduct);

  // Datos del producto a actualizar
  const updatedProductData = {
    title: "Smartphone Actualizado",
    description: "Descripción actualizada para el producto 'Smartphone'",
    price: 8500,
    thumbnail: "https://nueva-url-imagen.jpg",
    stock: 20,
  };
  const updateResult = await manager.updateProduct(4, updatedProductData);
  console.log(updateResult);

  const productsFinalResult = await manager.getProducts();
  console.log("Productos Actualizados".toUpperCase(), productsFinalResult);

  const productId = await manager.getProductById(2);
  console.log(productId);

  const deletedProduct = await manager.deleteProduct(4);
  console.log(deletedProduct);
};

env();
