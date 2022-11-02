

import express from 'express';
import { getAllProduct, getDetailsProduct, getProductVarientByOption } from '../controllers/ProductController.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
    let response = await getAllProduct();
    next(response);
})

router.get('/getProductVarient/:id', async (req, res, next) => {
    let { id } = req.params;
    let { op1, op2, op3 } = req.query;
    let response = await getProductVarientByOption( op1, op2, op3, id);
    next(response);
})

router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    let response = await getDetailsProduct(id);
    next(response);
})

export default router;
