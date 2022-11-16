import express from 'express';
import { orderReturnByCustomer, showAllOrderReturn, showOrderReturnItem } from '../controllers/OrderReturn.js';
const router = express.Router();

router.post('/return', async (req, res, next) => {
    let { id } = req.payload;
    let { note, id_order_purchase, total_price_return, total_quantity_return, id_purchase_item } = req.body;
    let response = await orderReturnByCustomer(id, note, id_order_purchase, total_price_return, total_quantity_return, id_purchase_item);
    next(response);
})

router.get('/return/getAll', async (req, res, next) => {
    let { id } = req.payload;
    let response = await showAllOrderReturn(id);
    next(response);
})


router.get('/return/detail/:id_return', async (req, res, next) => {
    let { id_return } = req.params
    let response = await showOrderReturnItem(id_return);
    next(response);
})


export default router;
