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

module.exports = router;
