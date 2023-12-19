const { Router } = require("express");
const router = Router();

router.post("/", async (req, res) => {
  try {
    const { products } = req.body;

    const newCart = {
      products,
    };

    const createdCart = await req.cartManager.createCart(newCart);

    if (!createdCart) {
      return res.status(500).send("Error al crear el carrito");
    }

    res.status(201).json(createdCart);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al procesar la solicitud");
  }
});

router.get("/:cid", async (req, res) => {
  try {
    const id = Number(req.params.cid);
    const products = await req.cartManager.getCartById(id);

    res.send({ status: "success", payload: products.products });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al obtener los productos del carrito");
  }
});

router.post("/:cid/product/:pid", async (req, res) => {
  try {
    const idCart = Number(req.params.cid);
    const idProduct = Number(req.params.pid);

    await req.cartManager.updateCart(idCart, idProduct);

    res.status(200).send({ status: "success" });
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al procesar la solicitud");
  }
});

module.exports = router;
