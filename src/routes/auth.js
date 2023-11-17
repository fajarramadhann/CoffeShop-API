import express from "express";
import UserController, { getUsers, createUser } from "../../controller/AuthControllers.js";

const router = express.Router();

router.get('/users', getUsers);
router.post('/register', UserController.register)
router.post('/login', UserController.login)

export default router;