const { Router } = require("express");
const router = Router();

//Ruta para obtener todos los productos
router.get("/", async (req, res) => {
  try {
    let products = await req.manager.getProducts();
    if (req.query.limit) {
      let limit = parseInt(req.query.limit);
      if (!isNaN(limit)) {
        products = products.slice(0, limit);
      }
    }

    res.json({ products: products });
  } catch (error) {
    res.status(500).send("Error al obtener los productos");
  }
});

router.get("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const product = await req.manager.getProductById(productId);

    if (product) {
      res.json(product);
    } else {
      res.status(404).send("Producto no encontrado");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el producto");
  }
});

//Ruta para crear un nuevo producto
router.post("/", async (req, res) => {
  try {
    const {
      title,
      description,
      code,
      price,
      status = true,
      stock,
      category,
      thumbnails = [],
    } = req.body;

    //Verificar que los campos obligatorios esten presentes
    if (!title || !description || !code || !price || !stock || !category) {
      return res
        .status(400)
        .send("Todos los campos obligatorios deben de estar presentes");
    }

    //Crear un objeto con los datos del producto
    const newProduct = {
      title,
      description,
      code,
      price,
      stock,
      category,
      thumbnails,
    };

    //Añadir el producto usando ProductManager
    const addedProduct = await req.manager.addProduct(newProduct);

    //Verificar si el producto fue añadido correctamente
    if (!addedProduct) {
      return res.status(500).send("Error al añadir el producto");
    }

    res.status(201).json(addedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la solicitud");
  }
});

//Actualizar un algun campo de un producto proporcionando su ID
router.put("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);
    const updateData = req.body;

    const updatedProduct = await req.manager.updateProduct(
      productId,
      updateData
    );

    if (!updatedProduct) {
      return res.status(500).send("Error al actualizar el producto");
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error(error);
    res.status(500).send("Error al procesar la solicitud");
  }
});

router.delete("/:pid", async (req, res) => {
  try {
    const productId = parseInt(req.params.pid);

    const deletedProduct = await req.manager.deleteProduct(productId);

    if (!deletedProduct) {
      return res.status(500).send("Error al eliminar el producto");
    }

    res.status(200).json(deletedProduct);
  } catch (error) {
    console.error(error);
    return res.status(500).send("Error al procesar la solicitud");
  }
});

module.exports = router;
