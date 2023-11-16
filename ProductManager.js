//1ra entrega

class ProductManager {
  constructor() {
    this.products = [];
  }

  getProducts = () => {
    return this.products;
  };

  addProduct = (title, description, price, thumbnail, code, stock) => {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      console.log(
        "Todos los campos son obligatorios!!! Solo se mostrarán los productos que contengan todos los campos.".toUpperCase()
      );
      return;
    }

    if (this.products.some((product) => product.code === code)) {
      console.log("Ya existe un producto con este codigo".toUpperCase());
      return;
    }

    const product = {
      title,
      description,
      price,
      thumbnail,
      code,
      stock,
    };

    if (this.products.length === 0) {
      product.id = 1;
    } else {
      product.id = this.products[this.products.length - 1].id + 1;
    }

    this.products.push(product);
  };

  getProductById = (productId) => {
    const foundProduct = this.products.find(
      (product) => product.id === productId
    );

    if (!foundProduct) {
      this.products.push(
        "El ID proporcionado no pertenece a ningun producto".toUpperCase()
      );
      return;
    }

    this.products.push(
      "Producto encontrado exitosamente".toUpperCase(),
      foundProduct
    );
  };
}

const newProduct = new ProductManager();

newProduct.addProduct(
  "Screen",
  'Esta es una description de prueba para el producto "Screen"',
  10000,
  "https://m.media-amazon.com/images/I/71ayOdl7MQL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "0001",
  5
);

newProduct.addProduct(
  "Keyboard",
  'Esta es una description de prueba para el producto "Keyboard"',
  1500,
  "https://m.media-amazon.com/images/I/71ayOdl7MQL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "0002",
  20
);

newProduct.addProduct(
  "Headsets",
  'Esta es una description de prueba para el producto "Headsets"',
  3000,
  "https://m.media-amazon.com/images/I/71ayOdl7MQL.__AC_SX300_SY300_QL70_ML2_.jpg",
  "0003",
  15
);

newProduct.getProductById(4);

console.log(newProduct.getProducts());
