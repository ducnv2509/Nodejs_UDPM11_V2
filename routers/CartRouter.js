import express from 'express';
import { addToCart, showCart } from '../controllers/CartController.js';
import myLogger from '../winstonLog/winston.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    let { id } = req.payload;
    myLogger.info("ID User %o", id)
    let { quantity, id_product_varient } = req.body;
    let response = await addToCart(id, id_product_varient, quantity);
    next(response);
})



router.get('/:id_user', async (req, res, next) => {
    let { id_user } = req.params
    myLogger.info("ID User %o", id_user)
    let response = await showCart(id_user);
    next(response);
})
// router.post('/login', async (req, res, next) => {
//     let { username, password } = req.body;
//     let response = await login(username, password);
//     next(response);
// })

export default router;
