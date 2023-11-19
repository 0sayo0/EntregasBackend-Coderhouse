//2do desafio entregable

const fs = require("fs");

class ProductManager {
  constructor(path) {
    // this.products = [];
    this.path = path;
  }

  getProducts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        //En el caso de que exista vamos a leer su contenido
        const data = await fs.promises.readFile(this.path, "utf-8");
        const parseProducts = JSON.parse(data); //El JSON.parse lo voy a ocupar cuando estoy obteniendo el contenido del archivo

        return parseProducts;
      } else {
        return [];
      }
    } catch (error) {
      console.error("Ha ocurrido un error", error);
      return [];
    }
  };

  addProduct = async (producto) => {
    try {
      //Obtener todos los productos que tenga almacenados hasta el momento
      const products = await this.getProducts();

      // Desestructurar las propiedades del objeto 'producto'
      const { title, description, price, thumbnail, code, stock } = producto;

      if (!title || !description || !price || !thumbnail || !code || !stock) {
        console.log(
          "Todos los campos son obligatorios!!! Solo se mostrarán los productos que contengan todos los campos.".toUpperCase()
        );
        return;
      }

      if (products.some((product) => product.code === code)) {
        console.log("Ya existe un producto con este codigo".toUpperCase());
        return;
      }

      if (products.length === 0) {
        producto.id = 1;
      } else {
        producto.id = products[products.length - 1].id + 1;
      }

      //Insertamos el producto
      products.push(producto);

      //Una vez que ya hemos terminado el procesamiento
      await fs.promises.writeFile(
        this.path,
        JSON.stringify(products, null, "\t")
      );
    } catch (error) {
      console.error(error);
    }
  };

  getProductById = async (productId) => {
    //Obtenemos los productos guardados actualmente
    const products = await this.getProducts();

    const foundProduct = products.find((product) => product.id === productId);

    if (foundProduct) {
      console.log("Producto encontrado exitosamente".toUpperCase());
      return foundProduct;
    } else {
      return "No hay algun producto con el ID proporcionado".toUpperCase();
    }
  };
}

module.exports = ProductManager;
