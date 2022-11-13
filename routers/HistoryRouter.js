import express from 'express';
import { getHistoryOrder, getOrderItemByHistory, updateStatusDelivery } from '../controllers/HistoryOrder.js';
import myLogger from '../winstonLog/winston.js';
const router = express.Router();


router.get('/by/:status_id', async (req, res, next) => {
    let { id } = req.payload;
    let { status_id } = req.params;
    myLogger.info("ID User %o", id)
    let response = await getHistoryOrder(id, status_id);
    next(response);
})


router.get('/:id', async (req, res, next) => {
    let { id } = req.params;
    let response = await getOrderItemByHistory(id);
    next(response);
})

router.get('/update/:idOrder', async (req, res, next) => {
    let { idOrder } = req.params;
    let { status_id } = req.query;
    let response = await updateStatusDelivery(status_id, idOrder);
    next(response);
})

export default router;
