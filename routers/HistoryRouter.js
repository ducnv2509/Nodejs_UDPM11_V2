import express from 'express';
import { getHistoryOrder, getOrderItemByHistory } from '../controllers/HistoryOrder.js';
import myLogger from '../winstonLog/winston.js';
const router = express.Router();


router.get('/', async (req, res, next) => {
    let { id } = req.payload;
    myLogger.info("ID User %o", id)
    let response = await getHistoryOrder(id);
    next(response);
})


router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    let response = await getOrderItemByHistory(id);
    next(response);
})

export default router;
