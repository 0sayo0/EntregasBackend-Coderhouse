//2do desafio entregable

const { triggerAsyncId } = require("async_hooks");
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

  addProduct = async (newProduct) => {
    try {
      //Obtener todos los productos que tenga almacenados hasta el momento
      const products = await this.getProducts();

      // Desestructurar las propiedades del objeto 'producto'
      const { title, description, price, thumbnail, code, stock } = newProduct;

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
        newProduct.id = 1;
      } else {
        newProduct.id = products[products.length - 1].id + 1;
      }

      //Insertamos el producto
      products.push(newProduct);

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
    try {
      //Obtenemos los productos guardados actualmente
      const products = await this.getProducts();

      const foundProduct = products.find((product) => product.id === productId);

      if (foundProduct) {
        console.log("Producto encontrado exitosamente".toUpperCase());
        return foundProduct;
      } else {
        return "No existe el producto con el ID proporcionado".toUpperCase();
      }
    } catch (error) {
      console.error(error);
    }
  };

  updateProduct = async (productId, updatedProductData) => {
    try {
      //Obtenemos los productos guardados actualmente
      const products = await this.getProducts();

      //Busamos el producto por su id
      const foundProduct = products.findIndex(
        (product) => product.id === productId
      );

      if (foundProduct === -1) {
        return "Producto no encontrado".toUpperCase();
      }

      // Actualizar el producto. Mantenemos el ID original y actualizamos el resto de los datos.
      products[foundProduct] = {
        ...products[foundProduct],
        ...updatedProductData,
        id: products[foundProduct].id,
      };

      // Guardar los cambios en el archivo
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

      return "Producto actualizado con éxito.".toUpperCase();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      return "Error al actualizar el producto.";
    }
  };

  deleteProduct = async (productId) => {
    try {
      //Obtenemos los productos guardados actualmente
      const products = await this.getProducts();

      //Busamos el producto por su id
      const foundProduct = products.findIndex(
        (product) => product.id === productId
      );

      if (foundProduct === -1) {
        return "No existe el producto con el ID proporcionado".toUpperCase();
      }

      // Eliminar el producto del arreglo
      products.splice(foundProduct, 1);

      // Guardar los cambios en el archivo
      await fs.promises.writeFile(this.path, JSON.stringify(products, null, 2));

      return "Producto eliminado con éxito.".toUpperCase();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      return "Error al eliminar el producto.";
    }
  };
}

module.exports = ProductManager;
