import express from 'express';
import { orderReturnByCustomer } from '../controllers/OrderReturn.js';
const router = express.Router();

router.post('/return', async (req, res, next) => {
    let { id } = req.payload;
    let { note, id_order_purchase, total_price_return, total_quantity_return, id_purchase_item } = req.body;
    let response = await orderReturnByCustomer(id, note, id_order_purchase, total_price_return, total_quantity_return, id_purchase_item);
    next(response);
})

export default router;
