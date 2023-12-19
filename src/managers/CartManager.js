const fs = require("fs");

class CartManager {
  constructor(path) {
    this.path = path;
  }

  getCarts = async () => {
    try {
      if (fs.existsSync(this.path)) {
        const data = await fs.promises.readFile(this.path, "utf-8");
        const parseCarts = JSON.parse(data);

        return parseCarts;
      } else {
        return [];
      }
    } catch (error) {
      console.error(error);
      return [];
    }
  };

  createCart = async (newCart = {}) => {
    //Obtener lo carritos que tengamos almacenados hasta el momento
    const carts = await this.getCarts();

    //Estructura de cada carrito
    newCart.id = carts.length === 0 ? 1 : carts[carts.length - 1].id + 1;
    newCart.products = newCart.products || [];

    //Insertamos el carrito
    carts.push(newCart);

    //Reescribimos el archivo para añadir el nuevo carrito
    await fs.promises.writeFile(this.path, JSON.stringify(carts, null, "\t"));

    //Devolver el producto añadido
    return newCart;
  };

  getCartById = async (id) => {
    try {
      const carts = await this.getCarts();
      const foundCart = carts.find((cart) => cart.id === id);

      if (!foundCart) {
        console.log("No hay ningun carrito con el ID proporcionado");
        return;
      }

      return foundCart;
    } catch (error) {
      console.error("Ha ocurrido un error", error);
    }
  };

  updateCart = async (idCart, idProduct) => {
    try {
      //Buscamos el indice del carrito que me pasan por parametro
      const carts = await this.getCarts();
      const foundCart = carts.findIndex((cart) => cart.id === idCart);

      //Si existe el carrito buscamos el indice del producto dentro de el
      if (foundCart !== -1) {
        const foundProduct = carts[foundCart].products.findIndex(
          (product) => product.id === idProduct
        );

        //Si el producto ya existe en el carrito aumento la cantidad
        if (foundProduct !== -1) {
          carts[foundCart].products[foundProduct].quantity++;
        } else {
          carts[foundCart].products.push({ id: idProduct, quantity: 1 });
        }

        //Guardo los cambios en el archivo
        await fs.promises.writeFile(
          this.path,
          JSON.stringify(carts, null, "\t")
        );
      } else {
        //Si el carrito no existe muestro un mensaje de error
        console.log("El carrito que estas tratando de actualizar no existe");
      }
    } catch (error) {
      console.error("Ha ocurrido un error", error);
    }
  };
}

module.exports = CartManager;
