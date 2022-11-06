import express from 'express';
import { finalFee, getInfoH, getInfoTP, getInfoX, getService } from '../controllers/FetchAPiGHN.js';
// import { sendMail } from '../controllers/SendMail.js';
const router = express.Router();

router.post('/getTP', async (req, res, next) => {
    let response = await getInfoTP();
    next(response);
})


router.post('/getH', async (req, res, next) => {
    let { id_TP } = req.body;
    let response = await getInfoH(id_TP);
    next(response);
})


router.post('/getX', async (req, res, next) => {
    let { id_H } = req.body;
    let response = await getInfoX(id_H);
    next(response);
})

router.post('/moneyFee', async (req, res, next) => {
    let { money, to_district, to_ward, weight_main } = req.body;
    let response = await finalFee(money, to_district, to_ward, weight_main);
    next(response);
})

export default router;
