const { Router } = require("express");

const router = Router();

router.get("/realtimeproducts", (req, res) => {
  res.render("realTimeProducts", {
    style: "index.css",
  });
});

router.get("/", async (req, res) => {
  try {
    const products = await req.manager.getProducts();
    res.render("home", {
      style: "index.css",
      products,
    });
  } catch (error) {
    res.status(500).send("Error al cargar los productos");
  }
});

module.exports = router;
