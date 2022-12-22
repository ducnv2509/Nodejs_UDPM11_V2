

import express from 'express';
import { filterCategory, getAllProduct, getDetailsProduct, getProductVarientByOption, popularProducts, searchProduct, sellingProduct, showCategory } from '../controllers/ProductController.js';
const router = express.Router();

router.get('/', async (req, res, next) => {
    let response = await getAllProduct();
    next(response);
})


router.get('/showCate', async (req, res, next) => {
    let response = await showCategory();
    next(response);
})

router.get('/selling', async (req, res, next) => {
    let response = await sellingProduct();
    next(response);
})


router.get('/popular', async (req, res, next) => {
    let response = await popularProducts();
    next(response);
})

router.get('/search', async (req, res, next) => {
    let { name } = req.query;
    let response = await searchProduct(name);
    next(response);
})

router.post('/cate', async (req, res, next) => {
    let { id } = req.body;
    let response = await filterCategory(id);
    next(response);
})

router.get('/getProductVarient/:id', async (req, res, next) => {
    let { id } = req.params;
    let { op1, op2, op3 } = req.query;
    let response = await getProductVarientByOption(op1, op2, op3, id);
    next(response);
})

router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    let response = await getDetailsProduct(id);
    next(response);
})

export default router;
