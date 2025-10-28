import { Router } from "express";
import { products } from "../constants/index.mjs";

const router = Router();

// ✅ كل المنتجات
router.get("/products", (req, res) => {
  res.send(products);
});

// ✅ منتج واحد
router.get("/products/:id", (req, res) => {
  const productId = req.params.id;
  const product = products.find((item) => item._id == productId);

  if (!product) {
    return res.status(404).json({ message: "Product not found" });
  }

  res.send(product);
});

export default router;
