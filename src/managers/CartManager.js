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
}

module.exports = CartManager;
