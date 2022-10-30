

import express from 'express';
import { getAllProduct } from '../controllers/ProductController.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
    let response = await getAllProduct();
    next(response);
})


export default router;
