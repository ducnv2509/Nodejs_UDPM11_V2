import express from 'express';
import { addOrderPurchase, addToCart, deleteCartIteam, getAmountPamentV1, getCartItemById, showCart, updateQuantityCart } from '../controllers/CartController.js';
import myLogger from '../winstonLog/winston.js';
const router = express.Router();

router.post('/', async (req, res, next) => {
    let { id } = req.payload;
    myLogger.info("ID User %o", id)
    let { quantity, id_product_varient } = req.body;
    let response = await addToCart(id, id_product_varient, quantity);
    next(response);
})
router.get('/getAmount', async (req, res, next) => {
    let response = await getAmountPamentV1();
    next(response);
})


router.post('/updateQuantityCart/', async (req, res, next) => {
    let { quantity, id_cart_item } = req.body;
    let response = await updateQuantityCart(quantity, id_cart_item);
    next(response);
})

router.post('/deleteCart/', async (req, res, next) => {
    let { id_cart_item } = req.body;
    let response = await deleteCartIteam(id_cart_item);
    next(response);
})


router.post('/addOrderPurchase', async (req, res, next) => {
    let { id } = req.payload
    let { address, note, id_cart_items, money_fee, type } = req.body
    myLogger.info('router %o', id_cart_items)
    let response = await addOrderPurchase(id, address, note, id_cart_items, money_fee, type);
    next(response);
})

router.get('/:id_user', async (req, res, next) => {
    let { id_user } = req.params
    myLogger.info("ID User %o", id_user)
    let response = await showCart(id_user);
    next(response);
})
router.post('/getCartItem', async (req, res, next) => {
    let { id } = req.payload;
    let { id_cart_item } = req.body;
    let response = await getCartItemById(id_cart_item, id);
    next(response);
})

// router.get('/getAmount', async (req, res, next) => {
//     let response = await getAmountPamentV1();
//     next(response);
// })

export default router;
