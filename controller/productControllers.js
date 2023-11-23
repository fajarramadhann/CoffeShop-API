import Products from "../models/product.js";

export const getAllProducts = async (req, res) => {
  try {
    const products = await Products.findAll();
    res.json(products);
  } catch (error) {
    console.error(error)
    res.status(500).json({ error: "Gagal menampilkan produk"});
  }
}

export const createProduct = async (req, res) => {
  try {
    const { name, description, price } = req.body;
    const imageUrl = req.file ? req.file.filename : null;
    const product = await Products.create({ name, description, price, imageUrl })
    res.json(product)
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "gagal menambah produk"})
  }
};

// export const getProductById = async (req, res) => {
//   try {
//     const { name } = req.body;
//   }
// }