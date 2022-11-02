import express from 'express';
import { addToCart } from '../controllers/CartController.js';
import myLogger from '../winstonLog/winston.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    let { id } = req.payload;
    myLogger.info("ID User %o", id)
    let { quantity, id_product_varient } = req.body;
    let response = await addToCart(id, id_product_varient, quantity);
    next(response);
})

// router.post('/login', async (req, res, next) => {
//     let { username, password } = req.body;
//     let response = await login(username, password);
//     next(response);
// })

export default router;
