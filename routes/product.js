import express from "express";
import { createProduct, getAllProducts } from "../controller/productControllers.js";

const auth = express.Router();

auth.get('/produk', getUsers);
auth.post('/tambah_produk', registerUser)
auth.post('/produkBy', {id}, loginUser)

export default auth;