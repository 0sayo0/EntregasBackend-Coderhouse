const ProductManager = require("./managers/ProductManager.js");

const manager = new ProductManager("./files/Products.json");

const env = async () => {
  const productos = await manager.getProducts();
  console.log(productos);

  const product = {
    title: "Keyboard",
    description:
      "Esta es una description de prueba para el producto 'Keyboard'",
    price: 1500,
    thumbnail:
      "https://m.media-amazon.com/images/I/71ayOdl7MQL.__AC_SX300_SY300_QL70_ML2_.jpg",
    code: "0002",
    stock: 10,
  };

  await manager.addProduct(product);

  const productsFinalResult = await manager.getProducts();
  console.log(productsFinalResult);
};

env();
